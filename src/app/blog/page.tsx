// src/app/blog/page.tsx
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function BlogPage() {
  const posts = getAllPosts();
  console.log("📌 getAllPosts() result:", posts);
  return (
    
    <div className="container" style={{ paddingTop: "120px" }}>
      <div className="mono-tag">
        <span>[</span>
        <span>BLOG</span>
        <span>]</span>
      </div>

      <h1 className="section-title" style={{ marginBottom: "40px" }}>
        Latest Posts
      </h1>

      <div className="blog-list">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="blog-card"
          >
            <h3 className="blog-title">{post.title}</h3>
            <p className="blog-summary">{post.summary}</p>

            <div className="blog-meta">
              <span>{post.date}</span>
              {post.category && <span>· {post.category}</span>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
