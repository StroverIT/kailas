import { prisma } from "@/lib/db";

export const POSTS_PER_PAGE = 10;

function getBlogPostDelegate() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const delegate = (prisma as any).blogPost;
  if (!delegate) {
    throw new Error(
      "Prisma client missing BlogPost model. Run: npx prisma generate. Then restart the dev server."
    );
  }
  return delegate;
}

export type BlogPostDisplay = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  /** HTML string for rich content display */
  content: string;
  date: string;
  updatedDate?: string;
  categories: string[];
  tags: string[];
  featured?: boolean;
  image?: string;
};

/** Normalize stored content to HTML string for display. Legacy JSON array -> HTML. */
function contentToDisplayHtml(content: string): string {
  if (!content || typeof content !== "string") return "";
  const t = content.trim();
  if (t.startsWith("<")) return t;
  try {
    const parsed = JSON.parse(content);
    if (!Array.isArray(parsed)) return t;
    return parsed
      .filter((p): p is string => typeof p === "string")
      .map((p) => `<p>${p.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")}</p>`)
      .join("");
  } catch {
    return content;
  }
}

function rowToDisplay(row: {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  updatedDate: string | null;
  categories: string[];
  tags: string[];
  featured: boolean;
  image: string | null;
}): BlogPostDisplay {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: contentToDisplayHtml(row.content),
    date: row.date,
    updatedDate: row.updatedDate ?? undefined,
    categories: row.categories,
    tags: row.tags,
    featured: row.featured,
    image: row.image ?? undefined,
  };
}

export async function getBlogPostsByPage(
  page: number
): Promise<BlogPostDisplay[]> {
  const blogPost = getBlogPostDelegate();
  const skip = (page - 1) * POSTS_PER_PAGE;
  const rows = await blogPost.findMany({
    orderBy: { createdAt: "desc" },
    skip,
    take: POSTS_PER_PAGE,
  });
  return rows.map(rowToDisplay);
}

export async function getTotalPages(): Promise<number> {
  const blogPost = getBlogPostDelegate();
  const count = await blogPost.count();
  return Math.ceil(count / POSTS_PER_PAGE) || 1;
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPostDisplay | null> {
  const blogPost = getBlogPostDelegate();
  const row = await blogPost.findUnique({
    where: { slug },
  });
  return row ? rowToDisplay(row) : null;
}
