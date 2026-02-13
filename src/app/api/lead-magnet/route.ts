import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json(
        { error: "Missing or invalid email" },
        { status: 400 }
      );
    }

    await prisma.leadMagnetSignup.upsert({
      where: { email: email.trim() },
      update: {},
      create: { email: email.trim() },
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("POST /api/lead-magnet", error);
    return NextResponse.json(
      { error: "Failed to save signup" },
      { status: 500 }
    );
  }
}
