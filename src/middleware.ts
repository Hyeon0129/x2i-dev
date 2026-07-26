import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

function todayKST(): string {
  return new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPage =
    !pathname.startsWith('/api') &&
    !pathname.startsWith('/_next') &&
    !pathname.startsWith('/images') &&
    !pathname.includes('.');

  if (!isPage) return NextResponse.next();

  let vid = request.cookies.get('vid')?.value;
  const isNewVisitor = !vid;
  if (!vid) vid = crypto.randomUUID();

  const today = todayKST();
  const seenKey = `seen:${today}:${vid}`;

  // SET NX: returns 'OK' only if key didn't exist (= first visit today)
  const result = await redis.set(seenKey, '1', { nx: true, ex: 172800 }).catch(() => null);

  if (result === 'OK') {
    redis.pipeline()
      .incr(`visitors:day:${today}`)
      .expire(`visitors:day:${today}`, 172800)
      .incr('visitors:total')
      .exec()
      .catch(() => {});
  }

  const res = NextResponse.next();
  if (isNewVisitor) {
    res.cookies.set('vid', vid, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 365 * 10,
      sameSite: 'lax',
    });
  }
  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
