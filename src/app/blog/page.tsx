// src/app/blog/page.tsx
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import BlogList from "@/components/BlogList";
import styles from "./blog.module.css";

export const metadata = {
  title: "Blog – Pyron",
  description:
    "Server engineering, infrastructure automation, NPU/GPU setups, and personal life stories from a Korean engineer building things that matter.",
  alternates: {
    canonical: "https://pyron.dev/blog",
  },
  openGraph: {
    title: "Blog – Pyron",
    description:
      "Server engineering, infrastructure automation, NPU/GPU setups, and personal life stories from a Korean engineer building things that matter.",
    url: "https://pyron.dev/blog",
    siteName: "Pyron",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Blog – Pyron",
    description:
      "Server engineering, infrastructure automation, NPU/GPU setups, and personal stories.",
  },
};

export default async function BlogPage() {
  const allPosts = getAllPosts();

  return (
    <>
      <div className="container" style={{ paddingTop: "120px" }}>
        <div className={styles.blogHeader}>
          <h1>Blog</h1>
          <p>A journal of thoughts I&apos;ve jotted down along the way.</p>

          <div className={styles.categories}>
            <Link href="/blog" className={`${styles.categoryItemActive} ${styles.categoryItem}`}>All</Link>
            <Link href="/blog/insights" className={styles.categoryItem}>Insights</Link>
            <Link href="/blog/guides" className={styles.categoryItem}>Guides</Link>
            <Link href="/blog/projects" className={styles.categoryItem}>Projects</Link>
            <Link href="/blog/life" className={styles.categoryItem}>Life</Link>
          </div>
        </div>

        <div style={{ height: "125px" }} />

        <BlogList posts={allPosts} />
      </div>
    </>
  );
}
