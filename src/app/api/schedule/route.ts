import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const entries = await prisma.scheduleEntry.findMany({
      orderBy: [{ day: "asc" }, { startTime: "asc" }],
    });
    return NextResponse.json(entries);
  } catch (error) {
    console.error("GET /api/schedule", error);
    return NextResponse.json(
      { error: "Failed to fetch schedule" },
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
    const { day, startTime, endTime, title, description } = body ?? {};

    if (!day || !startTime || !endTime || !title) {
      return NextResponse.json(
        { error: "Missing required fields: day, startTime, endTime, title" },
        { status: 400 }
      );
    }

    const entry = await prisma.scheduleEntry.create({
      data: {
        day,
        startTime,
        endTime,
        title,
        description: description ?? null,
      },
    });

    return NextResponse.json(entry);
  } catch (error) {
    console.error("POST /api/schedule", error);
    return NextResponse.json(
      { error: "Failed to create schedule entry" },
      { status: 500 }
    );
  }
}

