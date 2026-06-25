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


type SearchPost = {
  slug: string;
  title: string;
  excerpt?: string;
  category?: string;
  date?: string;
  dateFormatted?: string;
};

export default function SearchModal({ open, onClose }: SearchModalProps) {

  function stripHtml(html: string) {
    return html.replace(/<[^>]*>/g, '');
  }

  const [query, setQuery] = useState('');
  const [posts, setPosts] = useState<SearchPost[]>([]);
  const [fuse, setFuse] = useState<Fuse<SearchPost> | null>(null);
  const [activePost, setActivePost] = useState<SearchPost | null>(null);

  
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

   
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  
  const results: SearchPost[] = useMemo(() => {
    if (!fuse) return [];
    if (!query.trim()) return [];
    return fuse.search(query).map((x) => x.item);
  }, [query, fuse]);

  
  const groupedResults: [string, SearchPost[]][] = useMemo(() => {
    if (!results.length) return [];

    const groups = new Map<string, SearchPost[]>();

    for (const post of results) {
      const key = post.category || 'Uncategorized';
      const arr = groups.get(key) ?? [];
      arr.push(post);
      groups.set(key, arr);
    }

    return Array.from(groups.entries()); 
  }, [results]);

  
  const previewPost: SearchPost | null = useMemo(() => {
    if (!results.length) return null;
    if (activePost && results.some((p) => p.slug === activePost.slug)) {
      return activePost;
    }
    return results[0];
  }, [results, activePost]);

  if (!open) return null;

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        {/*  */}
        <input
          autoFocus
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />

        {/* */}
        <div className="search-body">
          {/**/}
          <div className="search-results-pane">
            {!query.trim() ? (
              <div className="search-empty">
                
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="search-result-icon"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9"
                        />
                      </svg>

                      <div className="search-result-title">{post.title}</div>
                    </Link>
                    );
                  })}
                </div>
              ))
            )}
          </div>

          { }
          <div className="search-preview-pane">
            {!query.trim() ? (
              <div className="search-preview-empty">
                
              </div>
            ) : !previewPost ? (
              <div className="search-preview-empty">
                
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
                    {(() => {
                      const plain = stripHtml(previewPost.excerpt || '');
                      const MAX_CHARS = 400;
                      if (plain.length <= MAX_CHARS) {
                        return plain;
                      }
                      return plain.slice(0, MAX_CHARS) + '…';
                  })()}
                  </p>
                )}
              </>
            )}
          </div>
        </div>

         {/*  */}
        <div className="search-footer">
          <div className="search-footer-left">
            <Image
              src="/images/logo.png"
              alt="pyron.dev"
              width={25}
              height={25}
              className="search-footer-logo"
            />
          </div>
          <div className="search-footer-right">
            <div className="search-footer-shortcut">
              <span className="shortcut-label">Close</span>
              <kbd className="shortcut-key">ESC</kbd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}