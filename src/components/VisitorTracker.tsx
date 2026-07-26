'use client';
import { useEffect } from 'react';

export default function VisitorTracker() {
  useEffect(() => {
    // Load Pretendard font non-blocking after page renders
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css';
    document.head.appendChild(link);

    fetch('/api/track', { method: 'POST', credentials: 'include' }).catch(() => {});
  }, []);
  return null;
}
