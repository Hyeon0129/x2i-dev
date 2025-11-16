// src/components/BlogSection.tsx
'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Post {
  title: string;
  date: string;
  dateFormatted?: string;
  excerpt?: string;
  category?: string;
  slug?: string;
  thumbnail?: string;
}

export default function BlogSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch posts:', err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="blog" className="section fade-in">
      <div className="container">
        <div className="blog-header">
          <div className="mono-tag">
            <span>[</span>
            <span>BLOG</span>
            <span>]</span>
          </div>
          <div className="blog-header-row">
            <h3 className="section-title">Latest news</h3>
            <Link href="/blog" className="blog-explore">
              EXPLORE MORE
            </Link>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255,255,255,0.5)' }}>
            Loading...
          </div>
        ) : (
          <div className="blog-list">
            {posts.map((post, index) => (
              <article key={post.slug || index} className="blog-card">
                <Link href={`/blog/${post.slug}`} className="blog-card-link">
                  <div className="blog-left">
                    <div className="blog-meta">
                      <span className="blog-date">{post.dateFormatted || post.date}</span>
                    </div>
                    <h4 className="blog-title">{post.title}</h4>
                    <p className="blog-description">{post.excerpt}</p>
                    <div className="blog-footer">
                      <span className="blog-category">{post.category || 'ARTICLE'}</span>
                      <button className="blog-read-btn">READ</button>
                    </div>
                  </div>
                  <div className="blog-right">
                    <div className="blog-image-wrap">
                      <Image 
                        src={post.thumbnail || 'https://x2i.dev/wp-content/uploads/2025/03/intro-1.png'} 
                        alt={post.title}
                        width={400}
                        height={225}
                        className="blog-image"
                      />
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}