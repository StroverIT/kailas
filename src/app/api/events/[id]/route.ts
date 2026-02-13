import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const event = await prisma.event.findUnique({
      where: { id },
      include: { registrations: true },
    });
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }
    return NextResponse.json(event);
  } catch (error) {
    console.error("GET /api/events/[id]", error);
    return NextResponse.json(
      { error: "Failed to fetch event" },
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
      date,
      title,
      type,
      location,
      spots,
      description,
      time,
      duration,
      month,
    } = body;

    const event = await prisma.event.update({
      where: { id },
      data: {
        ...(date != null && { date }),
        ...(title != null && { title }),
        ...(type != null && { type }),
        ...(location != null && { location }),
        ...(spots != null && { spots: Number(spots) }),
        ...(description != null && { description }),
        ...(time != null && { time }),
        ...(duration != null && { duration }),
        ...(month != null && { month }),
      },
    });
    return NextResponse.json(event);
  } catch (error) {
    console.error("PUT /api/events/[id]", error);
    return NextResponse.json(
      { error: "Failed to update event" },
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
    await prisma.event.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE /api/events/[id]", error);
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}
