// src/app/blog/[slug]/page.tsx
import { getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";
import { renderMarkdown } from "@/lib/markdown";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const awaitedParams = await params;  // params await
  const { slug } = awaitedParams;

  // MDX 파일 + frontmatter 불러오기
  const post = getPostBySlug(slug);
  if (!post) return notFound();

  // 본문 markdown → HTML 변환
  const html = renderMarkdown(post.content);

  return (
    <div className="container" style={{ padding: "60px 0" }}>
      {/* 카테고리 */}
      <div className="mono-tag">
        <span>[</span>
        <span>{post.frontMatter.category || "BLOG"}</span>
        <span>]</span>
      </div>

      {/* 제목 */}
      <h1 className="section-title" style={{ marginTop: "10px" }}>
        {post.frontMatter.title}
      </h1>

      {/* 날짜 */}
      <p className="section-sub" style={{ marginTop: "10px", color: "#888" }}>
        {post.frontMatter.date}
      </p>

      {/* 본문 */}
      <div
        className="blog-content"
        style={{ marginTop: "40px" }}
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    </div>
  );
}