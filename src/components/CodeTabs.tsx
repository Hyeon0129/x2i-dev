// src/components/CodeTabs.tsx
'use client';

import { useEffect } from 'react';

export default function CodeTabs() {
  useEffect(() => {
    const groups = document.querySelectorAll('.code-tabs-group');

    groups.forEach((group) => {
      if (group.querySelector('.code-tabs-bar')) return;

      const panels = Array.from(
        group.querySelectorAll('pre[class*="language-"]')
      ) as HTMLElement[];
      if (panels.length === 0) return;

      const bar = document.createElement('div');
      bar.className = 'code-tabs-bar';

      const tabs: HTMLButtonElement[] = [];

      panels.forEach((panel, i) => {
        const title = panel.getAttribute('data-title') || `tab ${i + 1}`;

        const tab = document.createElement('button');
        tab.type = 'button';
        tab.className = 'code-tabs-tab';
        tab.textContent = title;

        const select = () => {
          panels.forEach((p) => p.classList.add('is-hidden'));
          tabs.forEach((t) => t.classList.remove('is-active'));
          panel.classList.remove('is-hidden');
          tab.classList.add('is-active');
        };

        tab.addEventListener('click', select);
        tabs.push(tab);
        bar.appendChild(tab);

        if (i === 0) {
          select();
        } else {
          panel.classList.add('is-hidden');
        }
      });

      const spacer = document.createElement('div');
      spacer.className = 'code-tabs-spacer';
      bar.appendChild(spacer);

      const copyBtn = document.createElement('button');
      copyBtn.type = 'button';
      copyBtn.className = 'code-tabs-copy';
      copyBtn.setAttribute('aria-label', 'Copy code');
      bar.appendChild(copyBtn);

      copyBtn.addEventListener('click', () => {
        const activePanel = panels.find((p) => !p.classList.contains('is-hidden'));
        const code = activePanel?.querySelector('code');
        navigator.clipboard.writeText(code?.textContent || '');
        copyBtn.classList.add('is-copied');
        setTimeout(() => copyBtn.classList.remove('is-copied'), 1500);
      });

      group.insertBefore(bar, group.firstChild);
    });
  }, []);

  return null;
}
