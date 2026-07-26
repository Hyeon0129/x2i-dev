import { getAllPosts } from "@/lib/posts";
import { NextResponse } from "next/server";
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

function todayKST(): string {
  return new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

export async function GET() {
  const posts = getAllPosts();
  const latest = posts[0];

  const today = todayKST();
  const [totalVisitors, todayVisitors] = await Promise.all([
    redis.get<number>('visitors:total'),
    redis.get<number>(`visitors:day:${today}`),
  ]).catch(() => [null, null]) as [number | null, number | null];

  return NextResponse.json({
    count: posts.length,
    lastUpdated: latest?.dateFormatted ?? null,
    totalVisitors: totalVisitors ?? 0,
    todayVisitors: todayVisitors ?? 0,
  });
}
