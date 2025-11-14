//src/lib/markdown.ts

import MarkdownIt from "markdown-it";
import prism from "markdown-it-prism";
import container from "markdown-it-container";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/plugins/toolbar/prism-toolbar.css";


// 필요한 언어 import (기존 유지)
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-python";
import "prismjs/components/prism-json";
import "prismjs/components/prism-yaml";

// 플러그인 import (기존 유지)
import "prismjs/plugins/show-language/prism-show-language";
import "prismjs/plugins/toolbar/prism-toolbar";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard";

const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
});

type Token = {
  nesting: number;
  info: string;
};

// Prism 플러그인 등록 (기존 유지)
md.use(prism, {
  plugins: ["show-language", "toolbar", "copy-to-clipboard"],
});

// Admonition 컨테이너 추가 (note, info, tip, danger, warning)
const admonitionTypes = ['note', 'info', 'tip', 'danger', 'warning'];

admonitionTypes.forEach((type) => {
  md.use(container, type, {
    validate: (name: string) => name === type,
    render: (tokens: Token[], idx: number) => {  // ← tokens: Token[]로 변경
      if (tokens[idx].nesting === 1) {
        // opening tag
        return `<div class="admonition admonition-${type}">\n<p class="admonition-title">${type.toUpperCase()}</p>\n`;
      } else {
        // closing tag
        return '</div>\n';
      }
    },
  });
});

export function renderMarkdown(markdown: string) {
  return md.render(markdown);
}