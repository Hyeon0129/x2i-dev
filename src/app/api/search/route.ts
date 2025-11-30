// /src/app/api/search/route.ts

import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/getAllPosts';

export async function GET() {
  const posts = getAllPosts();
  return NextResponse.json(posts);
}