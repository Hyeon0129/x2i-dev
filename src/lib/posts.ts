//src/lib/posts.ts

import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type PostFrontMatter = {
  title: string;
  date: string;
  dateFormatted?: string;
  excerpt?: string;
  category?: string;
  slug?: string;
  thumbnail?: string;
  
  
  description?: string;
  keywords?: string[];
  author?: string;
};

const POSTS_DIR = path.join(process.cwd(), "content/blog");

export function getAllPosts(): PostFrontMatter[] {
  const files = fs.readdirSync(POSTS_DIR);

  const posts = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
      const { data, content } = matter(raw);

      const meta = data as PostFrontMatter;

      return {
        ...meta,
        slug: meta.slug ?? file.replace(/\.mdx$/, ""),
        excerpt: meta.excerpt || createExcerpt(content),
        dateFormatted: formatDate(meta.date),
      };
    });

  return posts.sort((a, b) => {
    const aTime = a.date ? new Date(a.date).getTime() : 0;
    const bTime = b.date ? new Date(b.date).getTime() : 0;
    return bTime - aTime;
  });
}

export function getPostBySlug(slug: string) {
  const fullPath = path.join(POSTS_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  return {
    frontMatter: data as PostFrontMatter,
    content,
  };
}

export function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

export function createExcerpt(content: string, wordCount = 26) {
  const words = content.split(/\s+/);
  return words.slice(0, wordCount).join(" ") + (words.length > wordCount ? "…" : "");
}