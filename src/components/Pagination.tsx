import Link from "next/link";
import styles from "@/app/blog/blog.module.css";

type Props = {
  currentPage: number;
  totalPages: number;
  basePath: string;
};

function pageHref(base: string, page: number) {
  return page === 1 ? base : `${base}?page=${page}`;
}

function buildRange(current: number, total: number): (number | "…")[] {
  const result: (number | "…")[] = [];
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || Math.abs(i - current) <= 1) {
      result.push(i);
    } else if (result[result.length - 1] !== "…") {
      result.push("…");
    }
  }
  return result;
}

export default function Pagination({ currentPage, totalPages, basePath }: Props) {
  if (totalPages <= 1) return null;

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;
  const range = buildRange(currentPage, totalPages);

  return (
    <div className={styles.paginationWrap}>
      <nav className={styles.pagination} aria-label="페이지 내비게이션">

        {/* 이전 화살표 */}
        {isFirst ? (
          <span className={`${styles.pageArrow} ${styles.pageArrowDisabled}`} aria-hidden="true">←</span>
        ) : (
          <Link href={pageHref(basePath, currentPage - 1)} className={styles.pageArrow} aria-label="이전 페이지">←</Link>
        )}

        {/* 페이지 번호 */}
        {range.map((item, i) =>
          item === "…" ? (
            <span key={`ellipsis-${i}`} className={styles.pageEllipsis} aria-hidden="true">···</span>
          ) : (
            <Link
              key={item}
              href={pageHref(basePath, item)}
              className={`${styles.pageNum}${item === currentPage ? ` ${styles.pageNumActive}` : ""}`}
              aria-current={item === currentPage ? "page" : undefined}
            >
              {item}
            </Link>
          )
        )}

        {/* 다음 화살표 */}
        {isLast ? (
          <span className={`${styles.pageArrow} ${styles.pageArrowDisabled}`} aria-hidden="true">→</span>
        ) : (
          <Link href={pageHref(basePath, currentPage + 1)} className={styles.pageArrow} aria-label="다음 페이지">→</Link>
        )}

      </nav>
    </div>
  );
}
