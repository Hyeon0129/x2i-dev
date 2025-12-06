// src/components/BlogList.tsx
import Link from "next/link";
import Image from "next/image";
import styles from "@/app/blog/blog.module.css";
import type { PostFrontMatter } from "@/lib/posts";

export default function BlogList({ posts }: { posts: PostFrontMatter[] }) {
  return (
    <div className={styles.blogList}>
      <div className={styles.timelineLine}></div>

      {posts.map((post) => (
        <div key={post.slug} className={styles.postItem}>
          
          <div className={styles.postGrid}>

            {/* LEFT */}
            <div className={styles.left}>
              <div className={styles.dot}></div>
              <p className={styles.date}>{post.dateFormatted}</p>

              <Link href={`/blog/${post.category}/${post.slug}`} className={styles.title}>
                {post.title}
              </Link>

              <span className={styles.category}>{post.category}</span>

              <p className={styles.excerpt}>{post.excerpt}</p>

              <Link href={`/blog/${post.category}/${post.slug}`} className={styles.readBtn}>
                READ
              </Link>
            </div>

            {/* RIGHT - thumbnail */}
            <div className={styles.right}>
              <Link href={`/blog/${post.category}/${post.slug}`}>
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
  );
}