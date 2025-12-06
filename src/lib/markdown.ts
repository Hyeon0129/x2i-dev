//src/lib/markdown.ts

import MarkdownIt from "markdown-it";
import container from "markdown-it-container";
import Prism from "prismjs";
import markdownItAnchor from "markdown-it-anchor";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/plugins/toolbar/prism-toolbar.css";

import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-python";
import "prismjs/components/prism-json";
import "prismjs/components/prism-yaml";


import "prismjs/plugins/show-language/prism-show-language";
import "prismjs/plugins/toolbar/prism-toolbar";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard";



const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
  highlight: function (str: string, lang: string) {
    if (lang && Prism.languages[lang]) {
      try {
        return `<pre class="language-${lang}"><code class="language-${lang}">${Prism.highlight(str, Prism.languages[lang], lang)}</code></pre>`;
      } catch (err) {
        console.error('Prism highlight error:', err);
      }
    }
    return `<pre class="language-none"><code>${md.utils.escapeHtml(str)}</code></pre>`;
  }
});

md.use(markdownItAnchor);

type Token = {
  nesting: number;
  info: string;
};

// Admonition (note, info, tip, 'danger', warning)
const admonitionTypes = ['note', 'imfortant', 'tip', 'danger', 'warning'];

admonitionTypes.forEach((type) => {
  md.use(container, type, {
    validate: (name: string) => name === type,
    render: (tokens: Token[], idx: number) => {
      if (tokens[idx].nesting === 1) {
        return `<div class="admonition admonition-${type}">\n<p class="admonition-title">${type.toUpperCase()}</p>\n`;
      } else {
        return '</div>\n';
      }
    },
  });
});

export function renderMarkdown(markdown: string) {
  return md.render(markdown);
}