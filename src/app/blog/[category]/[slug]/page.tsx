//src/app/blog/[category]/[slug]/page.tsx
import { getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";
import { renderMarkdown } from "@/lib/markdown";
import styles from "./blogDetail.module.css";
import Image from "next/image";
import { formatDate } from "@/lib/posts";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found – Pyron",
    };
  }

  const fm = post.frontMatter;

  return {
    title: `${fm.title} | Pyron`,
    description: fm.description || fm.excerpt || "",
    keywords: fm.keywords || [],
    authors: fm.author ? [{ name: fm.author }] : undefined,
    
    
    openGraph: {
      title: fm.title,
      description: fm.description || fm.excerpt || "",
      images: fm.thumbnail ? [
        {
          url: fm.thumbnail,
          width: 1200,
          height: 630,
          alt: fm.title,
        }
      ] : [],
      type: "article",
      publishedTime: fm.date,
      authors: fm.author ? [fm.author] : undefined,
    },
    
    
    twitter: {
      card: "summary_large_image",
      title: fm.title,
      description: fm.description || fm.excerpt || "",
      images: fm.thumbnail ? [fm.thumbnail] : [],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return notFound();

  const html = renderMarkdown(post.content);
  const fm = post.frontMatter;

  return (
    <>
      <div className={styles.container}>
        <p className={styles.date}>{formatDate(fm.date)}</p>
        <h1 className={styles.title}>{fm.title}</h1>

        {fm.thumbnail && (
          <div className={styles.thumbWrapper}>
            <Image
              src={fm.thumbnail}
              alt={fm.title}
              width={3840}
              height={2160}
              className={styles.thumb}
              priority
            />
          </div>
        )}

        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
      
      <div style={{ height: "165px" }} />
      <div className="divider" />
    </>
  );
}