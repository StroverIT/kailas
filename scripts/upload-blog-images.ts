/**
 * Uploads all blog images from public/images/ to Supabase Storage (bucket "blog"),
 * then updates BlogPost records in the database to use the new URLs.
 * Deletes each file from public/images/ after a successful upload.
 *
 * Requires: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, DATABASE_URL in .env
 * Run: npm run blog:upload-images
 */
import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { readdirSync, readFileSync, unlinkSync } from "node:fs";
import { join } from "node:path";
import { PrismaClient } from "@prisma/client";

const BLOG_BUCKET = "blog";
const IMAGE_EXT = /\.(png|jpg|jpeg|webp|gif)$/i;

async function main() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env");
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  const { error: bucketError } = await supabase.storage.createBucket(
    BLOG_BUCKET,
    { public: true }
  );
  if (bucketError) {
    const msg = bucketError.message?.toLowerCase() ?? "";
    if (msg.includes("already exists") || msg.includes("duplicate")) {
      // Bucket exists, continue
    } else {
      console.error("Failed to create storage bucket:", bucketError.message);
      process.exit(1);
    }
  }

  const imagesDir = join(process.cwd(), "public", "images");
  let files: string[];
  try {
    files = readdirSync(imagesDir).filter((f) => IMAGE_EXT.test(f));
  } catch (err) {
    console.error("Could not read public/images:", err);
    process.exit(1);
  }

  if (files.length === 0) {
    console.log("No image files found in public/images/");
    return;
  }

  const oldPathToNewUrl: Record<string, string> = {};

  for (const file of files) {
    const filePath = join(imagesDir, file);
    const buffer = readFileSync(filePath);
    const ext = file.split(".").pop()?.toLowerCase() || "png";
    const contentType = `image/${ext === "jpg" ? "jpeg" : ext}`;

    const { data, error } = await supabase.storage
      .from(BLOG_BUCKET)
      .upload(file, buffer, { contentType, upsert: true });

    if (error) {
      console.error(`Upload failed for ${file}:`, error.message);
      continue;
    }

    const { data: urlData } = supabase.storage
      .from(BLOG_BUCKET)
      .getPublicUrl(data.path);

    const oldPath = `/images/${file}`;
    oldPathToNewUrl[oldPath] = urlData.publicUrl;
    console.log(`Uploaded ${file} -> ${urlData.publicUrl}`);

    try {
      unlinkSync(filePath);
    } catch (err) {
      console.warn(`Could not remove ${filePath}:`, err);
    }
  }

  const prisma = new PrismaClient() as PrismaClient & {
    blogPost: { updateMany: (args: { where: { image: string }; data: { image: string } }) => Promise<{ count: number }> };
  };
  let updated = 0;
  for (const [oldPath, newUrl] of Object.entries(oldPathToNewUrl)) {
    const result = await prisma.blogPost.updateMany({
      where: { image: oldPath },
      data: { image: newUrl },
    });
    updated += result.count;
  }
  await prisma.$disconnect();

  console.log(`\nDone. Updated ${updated} blog post(s) with new image URLs.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
