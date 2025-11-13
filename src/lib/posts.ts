//src/lib/posts.ts

import fs from "fs";
import path from "path";
import matter from "gray-matter";

// 글 메타데이터 타입 (frontmatter)
export type PostFrontMatter = {
  title: string;
  date: string;          // YYYY-MM-DD 형식 추천
  category?: string;
  summary?: string;
  slug?: string;
};

const POSTS_DIR = path.join(process.cwd(), "content/blog");

export function getAllPosts(): PostFrontMatter[] {
  const files = fs.readdirSync(POSTS_DIR);

  const posts = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
      const { data } = matter(raw);

      const meta = data as PostFrontMatter;

      return {
        ...meta,
        slug: meta.slug ?? file.replace(/\.mdx$/, ""),
      };
    });

  // 날짜 기준 내림차순 정렬 (최신 글이 먼저)
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