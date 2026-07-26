import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

function todayKST(): string {
  return new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

export async function POST(request: NextRequest) {
  let vid = request.cookies.get('vid')?.value;
  const isNew = !vid;
  if (!vid) vid = crypto.randomUUID();

  const today = todayKST();
  const result = await redis
    .set(`seen:${today}:${vid}`, '1', { nx: true, ex: 172800 })
    .catch(() => null);

  if (result === 'OK') {
    redis.pipeline()
      .incr(`visitors:day:${today}`)
      .expire(`visitors:day:${today}`, 172800)
      .incr('visitors:total')
      .exec()
      .catch(() => {});
  }

  const res = NextResponse.json({ ok: true });
  if (isNew) {
    res.cookies.set('vid', vid, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 365 * 10,
      sameSite: 'lax',
    });
  }
  return res;
}
