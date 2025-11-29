// src/app/blog/[category]/page.tsx
import Link from "next/link";
import { getAllPosts, type PostFrontMatter } from "@/lib/posts";
import BlogList from "@/components/BlogList";
import styles from "../blog.module.css";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

export const metadata = {
  title: "Blog – Pyron",
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  
  const { category } = await params;

  const normalizedCategory = category.toLowerCase();

  
  const filteredPosts: PostFrontMatter[] = getAllPosts().filter((post) => {
    if (!post) return false;
    if (!post.category) return false;
    return post.category.toLowerCase() === normalizedCategory;
  });

  return (
    <>
    <div className="container" style={{ paddingTop: "120px" }}>
      {/* Header */}
      <div className={styles.blogHeader}>
        <h1>Blog</h1>
        <p>Read the latest insights from our journey.</p>

        <div className={styles.categories}>
          <Link href="/blog" className={styles.categoryItem}>All</Link>
          <Link href="/blog/insights" className={styles.categoryItem}>Insights</Link>
          <Link href="/blog/guides" className={styles.categoryItem}>Guides</Link>
          <Link href="/blog/projects" className={styles.categoryItem}>Projects</Link>
          <Link href="/blog/life" className={styles.categoryItem}>Life</Link>
        </div>
      </div>

      <div style={{ height: "125px" }} />
      

      
      <BlogList posts={filteredPosts} />
    </div>
    
    <div className="divider" />
    </>
  );
}