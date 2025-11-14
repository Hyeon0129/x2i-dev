// src/app/blog/page.tsx
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import styles from "./blog.module.css";
import Image from "next/image";
export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="container" style={{ paddingTop: "120px" }}>

      {/* 🔥 Blog Header Section */}
      <div className={styles.blogHeader}>
        <h1>Blog</h1>
        <p>Read the latest insights from our journey.</p>

        <div className={styles.categories}>
          <Link href="/blog" className={styles.categoryItem}>All</Link>
          <Link href="/blog/category/insights" className={styles.categoryItem}>Insights</Link>
          <Link href="/blog/category/guides" className={styles.categoryItem}>Guides</Link>
          <Link href="/blog/category/projects" className={styles.categoryItem}>Projects</Link>
          <Link href="/blog/category/life" className={styles.categoryItem}>Life</Link>
        </div>
      </div>

      {/* 🔥 리스트와 헤더 사이 여백 */}
      <div style={{ height: "125px" }} />

   
  {/* 🔥 post 카드 리스트 */}
      <div className={styles.blogList}>
      <div className={styles.timelineLine}></div>

        {posts.map((post) => (
          <div key={post.slug} className={styles.postItem}>
            
           

            <div className={styles.postGrid}>
              <div className={styles.left}>
                <div className={styles.dot}></div>      {/* ← dot 위치 이동 */}
                <p className={styles.date}>{post.dateFormatted}</p>

                <Link href={`/blog/${post.slug}`} className={styles.title}>
                  {post.title}
                </Link>

                <span className={styles.category}>{post.category}</span>

                <p className={styles.excerpt}>{post.excerpt}</p>

                <Link href={`/blog/${post.slug}`} className={styles.readBtn}>
                  READ
                </Link>
              </div>

              {/* RIGHT AREA (썸네일) */}
              <div className={styles.right}>
                <Link href={`/blog/${post.slug}`}>
               <Image
                src={post.thumbnail!}
                alt={post.title}
                width={800}   
                height={500}  
                className={styles.thumb}
              />
                </Link>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}