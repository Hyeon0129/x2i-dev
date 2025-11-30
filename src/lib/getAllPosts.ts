/// /src/lib/getAllPosts.ts

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BLOG_DIR = path.join(process.cwd(), '/content/blog');

export function getAllPosts() {
  const files = fs.readdirSync(BLOG_DIR);

  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const fullPath = path.join(BLOG_DIR, file);
      const raw = fs.readFileSync(fullPath, 'utf-8');
      const { data } = matter(raw);

      return {
        title: data.title,
        slug: file.replace('.mdx', ''),
        excerpt: data.excerpt || '',
      };
    });
}