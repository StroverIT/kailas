-- Run this in production Supabase SQL Editor if the BlogPost table is missing.
-- Then run: npm run sync:prod

CREATE TABLE IF NOT EXISTS "BlogPost" (
  "id" text PRIMARY KEY,
  "slug" text NOT NULL UNIQUE,
  "title" text NOT NULL,
  "excerpt" text NOT NULL,
  "content" text NOT NULL,
  "date" text NOT NULL,
  "updatedDate" text,
  "categories" text[] NOT NULL,
  "tags" text[] NOT NULL,
  "featured" boolean NOT NULL DEFAULT false,
  "image" text,
  "createdAt" timestamp(3) NOT NULL DEFAULT now(),
  "updatedAt" timestamp(3) NOT NULL DEFAULT now()
);
