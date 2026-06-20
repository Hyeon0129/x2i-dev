// src/app/blog/page.tsx
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";
import Pagination from "@/components/Pagination";
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

const POSTS_PER_PAGE = 10;

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function BlogPage({ searchParams }: Props) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page ?? "1") || 1);

  const allPosts = getAllPosts();
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const safeCurrentPage = Math.min(currentPage, totalPages || 1);
  const posts = allPosts.slice(
    (safeCurrentPage - 1) * POSTS_PER_PAGE,
    safeCurrentPage * POSTS_PER_PAGE
  );

  return (
    <>
      <div className="container" style={{ paddingTop: "120px" }}>
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

        <div className={styles.blogList}>
          <div className={styles.timelineLine} />

          {posts.map((post) => (
            <div key={post.slug} className={styles.postItem}>
              <div className={styles.postGrid}>
                <div className={styles.left}>
                  <div className={styles.dot} />
                  <p className={styles.date}>{post.dateFormatted}</p>
                  <Link
                    href={`/blog/${post.category?.toLowerCase()}/${post.slug}`}
                    className={styles.title}
                  >
                    {post.title}
                  </Link>
                  <span className={styles.category}>{post.category}</span>
                  <p className={styles.excerpt}>{post.description || post.excerpt}</p>
                  <Link
                    href={`/blog/${post.category?.toLowerCase()}/${post.slug}`}
                    className={styles.readBtn}
                  >
                    READ
                  </Link>
                </div>

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

        <Pagination
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          basePath="/blog"
        />
      </div>
      <div className="divider" />
    </>
  );
}
