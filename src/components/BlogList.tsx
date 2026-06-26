// src/components/BlogList.tsx
'use client'

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/app/blog/blog.module.css";
import type { PostFrontMatter } from "@/lib/posts";

const INITIAL_COUNT = 10;
const LOAD_MORE_STEP = 6;

export default function BlogList({ posts }: { posts: PostFrontMatter[] }) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const visiblePosts = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;

  return (
    <div className={styles.blogList}>
      <div className={styles.postsWrap}>
        <div className={styles.timelineLine}></div>

        {visiblePosts.map((post) => (
          <div key={post.slug} className={styles.postItem}>

            <div className={styles.postGrid}>

              {/* LEFT */}
              <div className={styles.left}>
                <div className={styles.dot}></div>
                <p className={styles.date}>{post.dateFormatted}</p>

                <Link href={`/blog/${post.category?.toLowerCase()}/${post.slug}`} className={styles.title}>
                  {post.title}
                </Link>

                <span className={styles.category}>{post.category}</span>

                <p className={styles.excerpt}>{post.description || post.excerpt}</p>

                <Link href={`/blog/${post.category?.toLowerCase()}/${post.slug}`} className={styles.readBtn}>
                  READ
                </Link>
              </div>

              {/* RIGHT - thumbnail */}
              <div className={styles.right}>
                <Link href={`/blog/${post.category?.toLowerCase()}/${post.slug}`}>
                  <Image
                    src={post.thumbnail!}
                    alt={post.title}
                    width={3840}
                    height={2160}
                    className={styles.thumb}
                  />
                </Link>
              </div>

            </div>
          </div>

        ))}
      </div>

      {hasMore && (
        <div className={styles.loadMoreWrap}>
          <button
            type="button"
            className={styles.loadMoreBtn}
            onClick={() => setVisibleCount((n) => Math.min(n + LOAD_MORE_STEP, posts.length))}
          >
            Load More
          </button>
        </div>
      )}

    </div>
  );
}
