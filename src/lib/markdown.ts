import MarkdownIt from "markdown-it";
import prism from "markdown-it-prism";
import "prismjs";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-python";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-css";
import "prismjs/components/prism-yaml";
// 필요한 언어 더 추가 가능

const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
}).use(prism);

export function renderMarkdown(markdown: string) {
  return md.render(markdown);
}