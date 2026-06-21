// src/components/CodeCopyButtons.tsx
'use client';

import { useEffect } from 'react';

export default function CodeCopyButtons() {
  useEffect(() => {
    const blocks = document.querySelectorAll('pre[class*="language-"]');

    blocks.forEach((pre) => {
      if (pre.querySelector('.code-copy-btn')) return;
      const code = pre.querySelector('code');
      if (!code) return;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'code-copy-btn';
      btn.textContent = 'Copy';

      btn.addEventListener('click', () => {
        navigator.clipboard.writeText(code.textContent || '');
        btn.textContent = 'Copied';
        setTimeout(() => {
          btn.textContent = 'Copy';
        }, 1500);
      });

      pre.appendChild(btn);
    });
  }, []);

  return null;
}
