export function slugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9а-яё\-]/gi, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "";
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
