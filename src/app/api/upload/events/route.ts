import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { supabaseServer, GALLERY_BUCKET } from "@/lib/supabase-server";

export const POST = async (request: Request) => {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!supabaseServer) {
    return NextResponse.json(
      {
        error:
          "Storage not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
      },
      { status: 503 },
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    if (!file || !file.size) {
      return NextResponse.json(
        { error: "Missing or empty file" },
        { status: 400 },
      );
    }

    const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const ext = sanitizedName.split(".").pop() || "jpg";
    const path = `events/${Date.now()}-${sanitizedName}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { data, error } = await supabaseServer.storage
      .from(GALLERY_BUCKET)
      .upload(path, buffer, {
        contentType: file.type || `image/${ext}`,
        upsert: false,
      });

    if (error) {
      console.error("Supabase events upload error:", error);
      return NextResponse.json(
        { error: error.message || "Upload failed" },
        { status: 500 },
      );
    }

    const { data: urlData } = supabaseServer.storage
      .from(GALLERY_BUCKET)
      .getPublicUrl(data.path);

    return NextResponse.json({ url: urlData.publicUrl });
  } catch (error) {
    console.error("POST /api/upload/events", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
};
