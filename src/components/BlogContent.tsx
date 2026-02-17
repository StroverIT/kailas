import DOMPurify from "isomorphic-dompurify";

type BlogContentProps = {
  html: string;
  className?: string;
};

export function BlogContent({ html, className }: BlogContentProps) {
  const sanitized = DOMPurify.sanitize(html, {
    ADD_ATTR: ["target"],
    ALLOWED_TAGS: [
      "p", "br", "strong", "em", "u", "s", "code", "a",
      "h1", "h2", "h3", "h4", "ul", "ol", "li", "blockquote",
      "img",
    ],
    ALLOWED_ATTR: ["href", "src", "alt", "title", "target", "rel"],
  });

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}
