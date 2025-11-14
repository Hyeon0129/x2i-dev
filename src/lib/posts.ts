//src/lib/posts.ts

import fs from "fs";
import path from "path";
import matter from "gray-matter";

// 글 메타데이터 타입 (frontmatter)

export type PostFrontMatter = {
  title: string;
  date: string;
  dateFormatted?: string;
  excerpt?: string;
  category?: string;
  slug?: string;
  thumbnail?: string;
};


const POSTS_DIR = path.join(process.cwd(), "content/blog");

export function getAllPosts(): PostFrontMatter[] {
  const files = fs.readdirSync(POSTS_DIR);

  const posts = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");

      // ⬅ 여기서 content 포함해서 가져와야 excerpt를 만들 수 있음
      const { data, content } = matter(raw);

      const meta = data as PostFrontMatter;

      return {
        ...meta,
        slug: meta.slug ?? file.replace(/\.mdx$/, ""),
        excerpt: createExcerpt(content), // ⬅ 이제 정상적으로 동작함
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
  }).toUpperCase();
}


export function createExcerpt(content: string, wordCount = 26) {
  const words = content.split(/\s+/);
  return words.slice(0, wordCount).join(" ") + (words.length > wordCount ? "…" : "");
}