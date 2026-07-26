'use client';
import { useEffect } from 'react';

export default function VisitorTracker() {
  useEffect(() => {
    fetch('/api/track', { method: 'POST', credentials: 'include' }).catch(() => {});
  }, []);
  return null;
}
