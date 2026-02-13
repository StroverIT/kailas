import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const eventId = searchParams.get("eventId");

  try {
    if (eventId) {
      const registrations = await prisma.registration.findMany({
        where: { eventId },
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json(registrations);
    }
    const registrations = await prisma.registration.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(registrations);
  } catch (error) {
    console.error("GET /api/registrations", error);
    return NextResponse.json(
      { error: "Failed to fetch registrations" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { eventId, name, email, phone, note } = body;

    if (!eventId || !name || !email) {
      return NextResponse.json(
        { error: "Missing required fields: eventId, name, email" },
        { status: 400 }
      );
    }

    const registration = await prisma.registration.create({
      data: {
        eventId,
        name,
        email,
        phone: phone ?? null,
        note: note ?? null,
      },
    });
    return NextResponse.json(registration);
  } catch (error) {
    console.error("POST /api/registrations", error);
    return NextResponse.json(
      { error: "Failed to create registration" },
      { status: 500 }
    );
  }
}
