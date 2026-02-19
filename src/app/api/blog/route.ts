import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

/** Slugs for the 4 yoga practices shown on the homepage, in display order */
const YOGA_PRACTICE_SLUGS = [
  "yoga-v-delnika",
  "yoga-nidra",
  "purvi-stapki-yoga",
  "yoga-za-vichki",
] as const;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const yogaPractices = searchParams.get("yogaPractices") === "1";

  try {
    if (yogaPractices) {
      const posts = await prisma.blogPost.findMany({
        where: { slug: { in: [...YOGA_PRACTICE_SLUGS] } },
      });
      const bySlug = new Map(posts.map((p) => [p.slug, p]));
      const ordered = YOGA_PRACTICE_SLUGS.map((s) => bySlug.get(s)).filter(
        (p): p is NonNullable<typeof p> => p != null
      );
      return NextResponse.json(ordered);
    }

    if (slug) {
      const post = await prisma.blogPost.findUnique({
        where: { slug },
      });
      if (!post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
      }
      return NextResponse.json(post);
    }

    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error("GET /api/blog", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      slug,
      title,
      excerpt,
      content,
      date,
      updatedDate,
      categories = [],
      tags = [],
      featured = false,
      image,
    } = body;

    if (!slug || !title || !excerpt || !date) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: slug, title, excerpt, date",
        },
        { status: 400 }
      );
    }

    const contentStr =
      typeof content === "string"
        ? content
        : Array.isArray(content)
          ? JSON.stringify(content)
          : "[]";

    const post = await prisma.blogPost.create({
      data: {
        slug,
        title,
        excerpt,
        content: contentStr,
        date,
        updatedDate: updatedDate ?? null,
        categories: Array.isArray(categories) ? categories : [],
        tags: Array.isArray(tags) ? tags : [],
        featured: Boolean(featured),
        image: image ?? null,
      },
    });
    return NextResponse.json(post);
  } catch (error) {
    console.error("POST /api/blog", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}
