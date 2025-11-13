// src/lib/markdown.ts
import MarkdownIt from "markdown-it";

const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
});

export function renderMarkdown(markdown: string) {
  return md.render(markdown);
}