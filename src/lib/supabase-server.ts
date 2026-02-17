import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  console.warn(
    "Supabase storage: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set for uploads."
  );
}

export const supabaseServer =
  url && serviceRoleKey
    ? createClient(url, serviceRoleKey, {
        auth: { persistSession: false },
      })
    : null;

export const BLOG_BUCKET = "blog";
