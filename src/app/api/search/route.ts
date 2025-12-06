// src/app/api/search/route.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {
  formatDate,
  createExcerpt,
  type PostFrontMatter,
} from '@/lib/posts';
import { NextResponse } from 'next/server';

const POSTS_DIR = path.join(process.cwd(), 'content/blog');

type SearchPost = {
  slug: string;
  title: string;
  category?: string;
  excerpt?: string;
  date?: string;
  dateFormatted?: string;
};

export async function GET() {
  try {
    const files = fs.readdirSync(POSTS_DIR);

    const posts: SearchPost[] = files
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => {
        const fullPath = path.join(POSTS_DIR, file);
        const raw = fs.readFileSync(fullPath, 'utf-8');

        const { data, content } = matter(raw);
        const meta = data as PostFrontMatter;

        const slug = file.replace('.mdx', '');

        const excerpt =
          meta.excerpt && meta.excerpt.length > 0
            ? meta.excerpt
            : createExcerpt(content, 80);

        const dateFormatted =
          meta.dateFormatted ||
          (meta.date ? formatDate(meta.date) : undefined);

        return {
          slug,
          title: meta.title,
          category: meta.category,
          excerpt,
          date: meta.date,
          dateFormatted,
        };
      })
      .sort((a, b) => {
        const aTime = a.date ? new Date(a.date).getTime() : 0;
        const bTime = b.date ? new Date(b.date).getTime() : 0;
        return bTime - aTime;
      });

    return NextResponse.json(posts);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to build search index' },
      { status: 500 },
    );
  }
}