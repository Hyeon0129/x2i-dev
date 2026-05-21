//src/app/blog/[category]/[slug]/page.tsx
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import { renderMarkdown } from "@/lib/markdown";
import styles from "./blogDetail.module.css";
import Image from "next/image";
import { formatDate } from "@/lib/posts";
import type { Metadata } from "next";

const BASE_URL = "https://pyron.dev";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    category: (post.category || "uncategorized").toLowerCase(),
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { slug, category } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found – Pyron" };
  }

  const fm = post.frontMatter;
  const canonicalUrl = `${BASE_URL}/blog/${category}/${slug}`;
  const imageUrl = fm.thumbnail
    ? fm.thumbnail.startsWith("http")
      ? fm.thumbnail
      : `${BASE_URL}${fm.thumbnail}`
    : undefined;

  return {
    title: `${fm.title} | Pyron`,
    description: fm.description || fm.excerpt || "",
    keywords: fm.keywords || [],
    authors: fm.author ? [{ name: fm.author }] : undefined,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fm.title,
      description: fm.description || fm.excerpt || "",
      url: canonicalUrl,
      siteName: "Pyron",
      images: imageUrl
        ? [{ url: imageUrl, width: 1200, height: 630, alt: fm.title }]
        : [],
      type: "article",
      publishedTime: fm.date,
      authors: fm.author ? [fm.author] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: fm.title,
      description: fm.description || fm.excerpt || "",
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { slug, category } = await params;
  const post = getPostBySlug(slug);
  if (!post) return notFound();

  const html = renderMarkdown(post.content);
  const fm = post.frontMatter;

  const canonicalUrl = `${BASE_URL}/blog/${category}/${slug}`;
  const imageUrl = fm.thumbnail
    ? fm.thumbnail.startsWith("http")
      ? fm.thumbnail
      : `${BASE_URL}${fm.thumbnail}`
    : undefined;

  // JSON-LD 구조화 데이터
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: fm.title,
    description: fm.description || fm.excerpt || "",
    image: imageUrl,
    datePublished: fm.date,
    dateModified: fm.date,
    author: {
      "@type": "Person",
      name: fm.author || "KIM TAE HYEON",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Pyron",
      url: BASE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    url: canonicalUrl,
    keywords: fm.keywords?.join(", ") || "",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
