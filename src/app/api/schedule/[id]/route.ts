import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const entry = await prisma.scheduleEntry.findUnique({
      where: { id },
    });

    if (!entry) {
      return NextResponse.json(
        { error: "Schedule entry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(entry);
  } catch (error) {
    console.error("GET /api/schedule/[id]", error);
    return NextResponse.json(
      { error: "Failed to fetch schedule entry" },
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
    const { day, startTime, endTime, title, description } = body ?? {};

    const entry = await prisma.scheduleEntry.update({
      where: { id },
      data: {
        ...(day != null && { day }),
        ...(startTime != null && { startTime }),
        ...(endTime != null && { endTime }),
        ...(title != null && { title }),
        ...(description !== undefined && { description }),
      },
    });

    return NextResponse.json(entry);
  } catch (error) {
    console.error("PUT /api/schedule/[id]", error);
    return NextResponse.json(
      { error: "Failed to update schedule entry" },
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
    await prisma.scheduleEntry.delete({
      where: { id },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE /api/schedule/[id]", error);
    return NextResponse.json(
      { error: "Failed to delete schedule entry" },
      { status: 500 }
    );
  }
}

