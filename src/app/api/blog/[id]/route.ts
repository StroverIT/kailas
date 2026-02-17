import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const post = await prisma.blogPost.findUnique({
      where: { id },
    });
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error) {
    console.error("GET /api/blog/[id]", error);
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    const body = await request.json();
    const {
      slug,
      title,
      excerpt,
      content,
      date,
      updatedDate,
      categories,
      tags,
      featured,
      image,
    } = body;

    const data: Record<string, unknown> = {};
    if (slug != null) data.slug = slug;
    if (title != null) data.title = title;
    if (excerpt != null) data.excerpt = excerpt;
    if (content != null) {
      data.content =
        typeof content === "string"
          ? content
          : Array.isArray(content)
            ? JSON.stringify(content)
            : undefined;
    }
    if (date != null) data.date = date;
    if (updatedDate !== undefined) data.updatedDate = updatedDate ?? null;
    if (categories != null) data.categories = Array.isArray(categories) ? categories : undefined;
    if (tags != null) data.tags = Array.isArray(tags) ? tags : undefined;
    if (featured !== undefined) data.featured = Boolean(featured);
    if (image !== undefined) data.image = image ?? null;

    const post = await prisma.blogPost.update({
      where: { id },
      data,
    });
    return NextResponse.json(post);
  } catch (error) {
    console.error("PUT /api/blog/[id]", error);
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    await prisma.blogPost.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE /api/blog/[id]", error);
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}
