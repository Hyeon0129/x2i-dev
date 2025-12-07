// src/app/sitemap.ts

import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts'; 

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pyron.dev';

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/#records`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];


  const posts = getAllPosts(); // [{ slug, category, date, ... }]
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