/**
 * Sync all Supabase data (Postgres + Storage) from current env (source) to production (target).
 *
 * Source: .env (DATABASE_URL, DIRECT_URL, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
 * Target: .env.production (same var names)
 *
 * Usage:
 *   npx tsx scripts/sync-to-production.ts
 *   # or with explicit target:
 *   TARGET_DATABASE_URL=... TARGET_SUPABASE_URL=... npx tsx scripts/sync-to-production.ts
 *
 * Ensure .env has source (dev) and .env.production has target (prod). The script will:
 * 1. Copy all Prisma-managed tables from source DB to target DB (replacing target data).
 * 2. Copy all files in the "blog" storage bucket from source to target.
 */

import "dotenv/config";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";

const BLOG_BUCKET = "blog";

// ----- Load env -----
function loadProductionEnv(): Record<string, string> {
  const path = resolve(process.cwd(), ".env.production");
  if (!existsSync(path)) {
    throw new Error(".env.production not found. Create it with DATABASE_URL, DIRECT_URL, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY for production.");
  }
  const raw = readFileSync(path, "utf-8");
  const out: Record<string, string> = {};
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    const unquoted = value.replace(/^["']|["']$/g, "");
    out[key] = unquoted;
  }
  return out;
}

const prodEnv = loadProductionEnv();

const sourceDatabaseUrl = process.env.DATABASE_URL;
const sourceDirectUrl = process.env.DIRECT_URL;
const sourceSupabaseUrl = process.env.SUPABASE_URL;
const sourceSupabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const targetDatabaseUrl = process.env.TARGET_DATABASE_URL ?? prodEnv.DATABASE_URL;
const targetDirectUrl = process.env.TARGET_DIRECT_URL ?? prodEnv.DIRECT_URL;
const targetSupabaseUrl = process.env.TARGET_SUPABASE_URL ?? prodEnv.SUPABASE_URL;
const targetSupabaseKey = process.env.TARGET_SUPABASE_SERVICE_ROLE_KEY ?? prodEnv.SUPABASE_SERVICE_ROLE_KEY;

if (!sourceDatabaseUrl || !targetDatabaseUrl) {
  console.error("Missing DATABASE_URL (source) or target (TARGET_DATABASE_URL / .env.production).");
  process.exit(1);
}

const prismaSource = new PrismaClient({
  datasources: { db: { url: sourceDatabaseUrl } },
});

const prismaTarget = new PrismaClient({
  datasources: { db: { url: targetDatabaseUrl } },
});

// Use typed clients for models that exist on PrismaClient; scheduleEntry may not be in generated types yet
const source = prismaSource as typeof prismaSource & { scheduleEntry: typeof prismaSource.event };
const target = prismaTarget as typeof prismaTarget & { scheduleEntry: typeof prismaTarget.event };

const P2021_TABLE_DOES_NOT_EXIST = "P2021";

function isTableMissingError(e: unknown): boolean {
  return typeof e === "object" && e != null && (e as { code?: string }).code === P2021_TABLE_DOES_NOT_EXIST;
}

async function runOnTarget<T>(tableName: string, fn: () => Promise<T>): Promise<{ ok: true; value: T } | { ok: false; tableMissing: true }> {
  try {
    const value = await fn();
    return { ok: true, value };
  } catch (e) {
    if (isTableMissingError(e)) {
      console.warn(`  [skip] Table "${tableName}" does not exist on target. Run: npm run db:migrate:prod (or create the table in production), then re-run sync.`);
      return { ok: false, tableMissing: true };
    }
    throw e;
  }
}

async function syncDatabase() {
  console.log("Syncing database tables (source → production)...\n");

  // Delete order: respect FK (Registration depends on Event). Skip tables that don't exist on target.
  const skipTables = new Set<string>();

  const deleteSteps = [
    { name: "Registration", fn: () => target.registration.deleteMany() },
    { name: "Event", fn: () => target.event.deleteMany() },
    { name: "ScheduleEntry", fn: () => target.scheduleEntry.deleteMany() },
    { name: "BlogPost", fn: () => target.blogPost.deleteMany() },
    { name: "LeadMagnetSignup", fn: () => target.leadMagnetSignup.deleteMany() },
    { name: "BookingInquiry", fn: () => target.bookingInquiry.deleteMany() },
    { name: "AdminUser", fn: () => target.adminUser.deleteMany() },
  ];

  for (const { name, fn } of deleteSteps) {
    const result = await runOnTarget(name, fn);
    if (!result.ok && result.tableMissing) skipTables.add(name);
  }

  // Insert order: independent first, then dependents. Skip tables that were missing on target.
  const adminUsers = await source.adminUser.findMany();
  if (adminUsers.length && !skipTables.has("AdminUser")) {
    await target.adminUser.createMany({ data: adminUsers });
    console.log("  AdminUser:", adminUsers.length);
  }

  const leadMagnetSignups = await source.leadMagnetSignup.findMany();
  if (leadMagnetSignups.length && !skipTables.has("LeadMagnetSignup")) {
    const r = await runOnTarget("LeadMagnetSignup", () => target.leadMagnetSignup.createMany({ data: leadMagnetSignups }));
    if (r.ok) console.log("  LeadMagnetSignup:", leadMagnetSignups.length);
  }

  const bookingInquiries = await source.bookingInquiry.findMany();
  if (bookingInquiries.length && !skipTables.has("BookingInquiry")) {
    const r = await runOnTarget("BookingInquiry", () => target.bookingInquiry.createMany({ data: bookingInquiries }));
    if (r.ok) console.log("  BookingInquiry:", bookingInquiries.length);
  }

  const events = await source.event.findMany();
  if (events.length && !skipTables.has("Event")) {
    const r = await runOnTarget("Event", () =>
      target.event.createMany({
        data: events.map((e) => ({
          id: e.id,
          date: e.date,
          title: e.title,
          type: e.type,
          location: e.location,
          spots: e.spots,
          description: e.description,
          time: e.time,
          duration: e.duration,
          month: e.month,
        })),
      })
    );
    if (r.ok) console.log("  Event:", events.length);
  }

  const registrations = await source.registration.findMany();
  if (registrations.length && !skipTables.has("Registration")) {
    const r = await runOnTarget("Registration", () => target.registration.createMany({ data: registrations }));
    if (r.ok) console.log("  Registration:", registrations.length);
  }

  const blogPosts = await source.blogPost.findMany();
  if (blogPosts.length && !skipTables.has("BlogPost")) {
    const r = await runOnTarget("BlogPost", () =>
      target.blogPost.createMany({
        data: blogPosts.map((p) => ({
          id: p.id,
          slug: p.slug,
          title: p.title,
          excerpt: p.excerpt,
          content: p.content,
          date: p.date,
          updatedDate: p.updatedDate,
          categories: p.categories,
          tags: p.tags,
          featured: p.featured,
          image: p.image,
        })),
      })
    );
    if (r.ok) console.log("  BlogPost:", blogPosts.length);
  }

  const scheduleEntries = await source.scheduleEntry.findMany();
  if (scheduleEntries.length && !skipTables.has("ScheduleEntry")) {
    const r = await runOnTarget("ScheduleEntry", () => target.scheduleEntry.createMany({ data: scheduleEntries }));
    if (r.ok) console.log("  ScheduleEntry:", scheduleEntries.length);
  }

  if (skipTables.size) {
    console.log("\n  Some tables were skipped (missing on target). After running db:migrate:prod, re-run this script to sync them.\n");
  }
  console.log("Database sync done.\n");
}

async function syncStorage() {
  if (!sourceSupabaseUrl || !sourceSupabaseKey || !targetSupabaseUrl || !targetSupabaseKey) {
    console.log("Skipping storage sync: missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY for source or target.\n");
    return;
  }

  const supabaseSource = createClient(sourceSupabaseUrl, sourceSupabaseKey, { auth: { persistSession: false } });
  const supabaseTarget = createClient(targetSupabaseUrl, targetSupabaseKey, { auth: { persistSession: false } });

  // Ensure target has the bucket (create if missing)
  const { data: existingBucket, error: getError } = await supabaseTarget.storage.getBucket(BLOG_BUCKET);
  if (getError || !existingBucket) {
    const { error: createErr } = await supabaseTarget.storage.createBucket(BLOG_BUCKET, { public: true });
    if (createErr) {
      console.warn("  Could not create target bucket:", createErr.message, "- uploads will be skipped.\n");
      return;
    }
    console.log("  Created target bucket:", BLOG_BUCKET);
  }

  console.log("Syncing storage bucket:", BLOG_BUCKET, "\n");

  async function listAllPaths(prefix: string): Promise<string[]> {
    const { data: items, error } = await supabaseSource.storage.from(BLOG_BUCKET).list(prefix || "", { limit: 1000 });
    if (error) return [];
    const paths: string[] = [];
    for (const item of items ?? []) {
      if (!item.name) continue;
      const fullPath = prefix ? `${prefix}/${item.name}` : item.name;
      if (item.id != null || (item.metadata && Object.keys(item.metadata).length > 0)) {
        paths.push(fullPath);
      } else {
        const nested = await listAllPaths(fullPath);
        paths.push(...nested);
      }
    }
    return paths;
  }

  const allPaths = await listAllPaths("");
  if (allPaths.length === 0) {
    console.log("  No files in source bucket.\n");
    return;
  }

  let copied = 0;
  for (const path of allPaths) {
    const { data: blob, error: downError } = await supabaseSource.storage.from(BLOG_BUCKET).download(path);
    if (downError || !blob) {
      console.warn("  Skip", path, downError?.message ?? "no blob");
      continue;
    }
    const buffer = Buffer.from(await blob.arrayBuffer());
    const { error: upError } = await supabaseTarget.storage.from(BLOG_BUCKET).upload(path, buffer, {
      contentType: blob.type || "application/octet-stream",
      upsert: true,
    });
    if (upError) {
      console.warn("  Upload failed", path, upError.message);
      continue;
    }
    copied++;
    console.log("  ", path);
  }

  console.log("\nStorage sync done. Files copied:", copied, "\n");
}

async function main() {
  console.log("=== Sync to production (source = current .env, target = .env.production) ===\n");

  try {
    await syncDatabase();
    await syncStorage();
    console.log("All done.");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prismaSource.$disconnect();
    await prismaTarget.$disconnect();
  }
}

main();
