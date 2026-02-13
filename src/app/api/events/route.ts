import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: [{ month: "asc" }, { date: "asc" }],
    });
    return NextResponse.json(events);
  } catch (error) {
    console.error("GET /api/events", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
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
      date,
      title,
      type,
      location = "Кайлас база",
      spots = 16,
      description,
      time,
      duration,
      month,
    } = body;

    if (!date || !title || !type || !description || !month) {
      return NextResponse.json(
        { error: "Missing required fields: date, title, type, description, month" },
        { status: 400 }
      );
    }

    const event = await prisma.event.create({
      data: {
        date,
        title,
        type,
        location: location ?? "Кайлас база",
        spots: Number(spots) ?? 16,
        description,
        time: time ?? null,
        duration: duration ?? null,
        month,
      },
    });
    return NextResponse.json(event);
  } catch (error) {
    console.error("POST /api/events", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
