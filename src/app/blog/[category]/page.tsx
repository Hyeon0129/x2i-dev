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

export async function generateStaticParams() {
  const posts = getAllPosts();
  const categories = Array.from(
    new Set(posts.map((post) => (post.category || "uncategorized").toLowerCase()))
  );
  return categories.map((category) => ({ category }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  
  const { category } = await params;

  const normalizedCategory = category.toLowerCase();

  const catClass = (slug: string) =>
    slug === normalizedCategory
      ? `${styles.categoryItemActive} ${styles.categoryItem}`
      : styles.categoryItem;


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
        <p>Notes on infrastructure, engineering, and life along the way.</p>

        <div className={styles.categories}>
          <Link href="/blog" className={styles.categoryItem}>All</Link>
          <Link href="/blog/insights" className={catClass('insights')}>Insights</Link>
          <Link href="/blog/guides" className={catClass('guides')}>Guides</Link>
          <Link href="/blog/projects" className={catClass('projects')}>Projects</Link>
          <Link href="/blog/life" className={catClass('life')}>Life</Link>
        </div>
      </div>

      <div style={{ height: "125px" }} />
      

      
      <BlogList posts={filteredPosts} />
    </div>
    </>
  );
}