import { prisma } from "@/lib/db";

export const POSTS_PER_PAGE = 10;

function getBlogPostDelegate() {
  const delegate = (prisma as { blogPost?: typeof prisma.event }).blogPost;
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
  content: string[];
  date: string;
  updatedDate?: string;
  categories: string[];
  tags: string[];
  featured?: boolean;
  image?: string;
};

function parseContent(content: string): string[] {
  try {
    const parsed = JSON.parse(content);
    return Array.isArray(parsed) ? parsed : [String(parsed)];
  } catch {
    return [content];
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
    content: parseContent(row.content),
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
