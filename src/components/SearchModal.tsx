// src/components/SearchModal.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import Fuse from 'fuse.js';

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

/**
 * 검색에서 사용할 포스트 타입
 */
type SearchPost = {
  slug: string;
  title: string;
  excerpt?: string;
  category?: string;
  date?: string;
  dateFormatted?: string;
};

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [posts, setPosts] = useState<SearchPost[]>([]);
  const [fuse, setFuse] = useState<Fuse<SearchPost> | null>(null);
  const [activePost, setActivePost] = useState<SearchPost | null>(null);

  // --- 1) 전체 포스트 로드 + Fuse 인덱스 생성 ---
  useEffect(() => {
    fetch('/api/search')
      .then((r) => r.json())
      .then((data: SearchPost[]) => {
        setPosts(data);
        setFuse(
          new Fuse(data, {
            keys: ['title', 'excerpt'],
            threshold: 0.3,
          })
        );
      })
      .catch((err) => {
        console.error('Failed to init search:', err);
      });
  }, []);

  // --- 2) 검색 결과 ---
  const results: SearchPost[] = useMemo(() => {
    if (!fuse) return [];
    if (!query.trim()) return [];
    return fuse.search(query).map((x) => x.item);
  }, [query, fuse]);

  // --- 3) 카테고리별 그룹화 ---
  const groupedResults: [string, SearchPost[]][] = useMemo(() => {
    if (!results.length) return [];

    const groups = new Map<string, SearchPost[]>();

    for (const post of results) {
      const key = post.category || 'Uncategorized';
      const arr = groups.get(key) ?? [];
      arr.push(post);
      groups.set(key, arr);
    }

    return Array.from(groups.entries()); // [ [category, posts[]], ... ]
  }, [results]);

  // --- 4) 프리뷰에 사용할 포스트 (hover한 것 없으면 첫 번째) ---
  const previewPost: SearchPost | null = useMemo(() => {
    if (!results.length) return null;
    if (activePost && results.some((p) => p.slug === activePost.slug)) {
      return activePost;
    }
    return results[0];
  }, [results, activePost]);

  // 모달이 닫혀 있으면 렌더링 안 함
  if (!open) return null;

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        {/* 상단 검색 인풋 (테두리 없는 형태) */}
        <input
          autoFocus
          type="text"
          placeholder="Search documentation..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />

        {/* 본문: 왼쪽 리스트 / 오른쪽 프리뷰 */}
        <div className="search-body">
          {/* LEFT: 결과 리스트 */}
          <div className="search-results-pane">
            {!query.trim() ? (
              <div className="search-empty">
                Type a keyword to search your posts.
              </div>
            ) : !results.length ? (
              <div className="search-empty">No results found.</div>
            ) : (
              groupedResults.map(([category, posts]) => (
                <div key={category} className="search-group">
                  <div className="search-group-label">{category}</div>

                  {posts.map((post) => {
                    const categoryPath = (
                      post.category || 'uncategorized'
                    ).toLowerCase();
                    const href = `/blog/${categoryPath}/${post.slug}`;

                    return (
                      <Link
                        key={post.slug}
                        href={href}
                        className={
                          'search-result-item' +
                          (previewPost?.slug === post.slug ? ' active' : '')
                        }
                        onClick={onClose}
                        onMouseEnter={() => setActivePost(post)}
                      >
                        <div className="search-result-title">
                          {post.title}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ))
            )}
          </div>

          {/* RIGHT: 프리뷰 */}
          <div className="search-preview-pane">
            {!query.trim() ? (
              <div className="search-preview-empty">
                Start typing on the left to search your posts.
              </div>
            ) : !previewPost ? (
              <div className="search-preview-empty">
                Hover a result on the left to see details here.
              </div>
            ) : (
              <>
                {(previewPost.dateFormatted || previewPost.date) && (
                  <div className="search-preview-date">
                    {previewPost.dateFormatted || previewPost.date}
                  </div>
                )}

                <h2 className="search-preview-title">
                  {previewPost.title}
                </h2>

                {previewPost.excerpt && (
                  <p className="search-preview-excerpt">
                    {previewPost.excerpt.length > 50
                      ? previewPost.excerpt.slice(0, 50) + '…'
                      : previewPost.excerpt}
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        {/* 하단 바: 좌측 로고만 */}
        <div className="search-footer">
          <div className="search-footer-left">
            <Image
              src="/images/logo.png"
              alt="x2i.dev"
              width={25}
              height={25}
              className="search-footer-logo"
            />
            
          </div>
        </div>
      </div>
    </div>
  );
}