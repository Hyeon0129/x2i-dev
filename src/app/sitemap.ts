// src/app/sitemap.ts

import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts'; 

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pyron.dev';

  const posts = getAllPosts();

  // 카테고리 목록 (중복 제거)
  const categories = Array.from(
    new Set(posts.map((p) => (p.category || 'uncategorized').toLowerCase()))
  );

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    // 카테고리 페이지
    ...categories.map((cat) => ({
      url: `${baseUrl}/blog/${cat}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];


  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => {
    const category = (post.category || 'uncategorized').toLowerCase();

    return {
      url: `${baseUrl}/blog/${category}/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    };
  });

  return [...staticRoutes, ...postRoutes];
}