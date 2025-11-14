//src/app/blog/[slug]/page.tsx
import { getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";
import { renderMarkdown } from "@/lib/markdown";
import styles from "./blogDetail.module.css";
import Image from "next/image";
import { formatDate } from "@/lib/posts";

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
    <div className={styles.container}>
      
      {/* 날짜 */}
      <p className={styles.date}>{formatDate(fm.date)}</p>

      {/* 제목 */}
      <h1 className={styles.title}>{fm.title}</h1>

      {/* 썸네일 */}
      {fm.thumbnail && (
        <div className={styles.thumbWrapper}>
          <Image
            src={fm.thumbnail}
            alt={fm.title}
            width={1080}
            height={600}
            className={styles.thumb}
            priority
          />
        </div>
      )}

      {/* 본문 */}
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}