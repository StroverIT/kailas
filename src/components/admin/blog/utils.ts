export function slugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9а-яё\-]/gi, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "";
}

/** Converts stored content (legacy JSON array or HTML) to HTML for the rich editor. */
export function contentToHtml(content: string): string {
  if (!content || typeof content !== "string") return "<p></p>";
  const t = content.trim();
  if (t.startsWith("<")) return t;
  try {
    const arr = JSON.parse(content);
    if (!Array.isArray(arr)) return "<p></p>";
    return arr
      .filter((p): p is string => typeof p === "string")
      .map((p) => `<p>${escapeHtml(p)}</p>`)
      .join("") || "<p></p>";
  } catch {
    return `<p>${escapeHtml(content)}</p>`;
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function contentToEditable(content: string): string {
  try {
    const arr = JSON.parse(content);
    return Array.isArray(arr) ? arr.join("\n\n") : content;
  } catch {
    return content;
  }
}

export function editableToContent(text: string): string {
  const paragraphs = text
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
  return JSON.stringify(paragraphs.length ? paragraphs : [""]);
}
