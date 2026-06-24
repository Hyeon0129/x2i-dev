// src/app/api/blog-stats/route.ts
import { getAllPosts } from "@/lib/posts";
import { NextResponse } from "next/server";

export async function GET() {
  const posts = getAllPosts();
  const latest = posts[0];

  return NextResponse.json({
    count: posts.length,
    lastUpdated: latest?.dateFormatted ?? null,
  });
}
