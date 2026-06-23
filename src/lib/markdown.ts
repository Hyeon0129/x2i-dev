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

// Prism's bundled Python grammar doesn't tag keyword-argument names
// (e.g. `api_key=` in `Client(api_key=...)`) as their own token, so they
// fall through as plain text. Add that as a distinct token so it can be
// colored like x.ai's docs (which highlight kwarg names in orange).
Prism.languages.insertBefore("python", "keyword", {
  "kwarg-name": {
    pattern: /(?<=[(,]\s*)[a-zA-Z_]\w*(?=\s*=(?!=))/,
  },
  // Prism's grammar lists `print` as a keyword (legacy Python 2 statement),
  // but x.ai's docs color it like a builtin function (e.g. `len`, `range`).
  "builtin-print": {
    pattern: /\bprint\b/,
    alias: "builtin",
  },
});



const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
  highlight: function (str: string, lang: string, attrs: string) {
    const lineCount = str.replace(/\n$/, "").split("\n").length;
    const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1).join("\n");
    const gutter = `<span class="line-numbers" aria-hidden="true">${lineNumbers}</span>`;

    const titleMatch = attrs && attrs.match(/title="([^"]*)"/);
    const title = titleMatch ? titleMatch[1] : lang;
    const titleAttr = ` data-title="${md.utils.escapeHtml(title)}"`;

    if (lang && Prism.languages[lang]) {
      try {
        return `<pre class="language-${lang}"${titleAttr}>${gutter}<code class="language-${lang}">${Prism.highlight(str, Prism.languages[lang], lang)}</code></pre>`;
      } catch (err) {
        console.error('Prism highlight error:', err);
      }
    }
    return `<pre class="language-none"${titleAttr}>${gutter}<code>${md.utils.escapeHtml(str)}</code></pre>`;
  }
});

md.use(markdownItAnchor);

type Token = {
  nesting: number;
  info: string;
};

// Admonition (note, info, tip, 'danger', warning)
const admonitionTypes = ['note', 'warning'];

admonitionTypes.forEach((type) => {
  md.use(container, type, {
    validate: (name: string) => name === type,
    render: (tokens: Token[], idx: number) => {
      if (tokens[idx].nesting === 1) {
        return `<div class="admonition admonition-${type}">\n<span class="admonition-icon"></span>\n<div class="admonition-body">\n`;
      } else {
        return '</div>\n</div>\n';
      }
    },
  });
});


// Code block design — e1 chosen as final. Wraps a group of fenced blocks
// into a single tabbed code block (see CodeTabs.tsx).
md.use(container, 'e1', {
  validate: (name: string) => name === 'e1',
  render: (tokens: Token[], idx: number) => {
    if (tokens[idx].nesting === 1) {
      return '<div class="code-e1 code-tabs-group">\n';
    } else {
      return '</div>\n';
    }
  },
});

md.use(container, 'e1dark', {
  validate: (name: string) => name === 'e1dark',
  render: (tokens: Token[], idx: number) => {
    if (tokens[idx].nesting === 1) {
      return '<div class="code-e1 code-e1-dark code-tabs-group">\n';
    } else {
      return '</div>\n';
    }
  },
});

export function renderMarkdown(markdown: string) {
  return md.render(markdown);
}