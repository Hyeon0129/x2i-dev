// src/app/api/posts/route.ts
import { getAllPosts } from '@/lib/posts';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const posts = getAllPosts();
    return NextResponse.json(posts.slice(0, 3)); // 최신 3개만
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}