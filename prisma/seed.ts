import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { blogPosts } from "../src/data/blogData";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@kailas.local";
  const password = process.env.ADMIN_PASSWORD ?? "changeme";
  const hash = await bcrypt.hash(password, 10);

  await prisma.adminUser.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password: hash,
      name: "Admin",
    },
  });

  console.log("Seeded admin user:", email);

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: JSON.stringify(post.content),
        date: post.date,
        updatedDate: post.updatedDate ?? null,
        categories: post.categories,
        tags: post.tags,
        featured: post.featured ?? false,
        image: post.image ?? null,
      },
    });
  }
  console.log("Seeded blog posts:", blogPosts.length);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
