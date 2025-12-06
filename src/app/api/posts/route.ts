// src/app/api/posts/route.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { formatDate, createExcerpt, type PostFrontMatter } from '@/lib/posts';
import { NextResponse } from 'next/server';

const POSTS_DIR = path.join(process.cwd(), 'content/blog');

export async function GET() {
  try {
    const files = fs.readdirSync(POSTS_DIR);

    const posts = files
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => {
        const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
        const { data, content } = matter(raw);
        const meta = data as PostFrontMatter;

        const post = {
          ...meta,
          slug: meta.slug ?? file.replace(/\.mdx$/, ''),
          dateFormatted: formatDate(meta.date),
          excerpt: createExcerpt(content, 26), 
          content, 
        };

        return post;
      })
      .sort((a, b) => {
        const aTime = a.date ? new Date(a.date).getTime() : 0;
        const bTime = b.date ? new Date(b.date).getTime() : 0;
        return bTime - aTime;
      });

  
    return NextResponse.json(posts.slice(0, 3));
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}