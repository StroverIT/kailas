import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

type TGalleryImageRow = {
  id: string;
  url: string;
  alt: string | null;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

export const GET = async () => {
  try {
    const galleryModel = (
      prisma as unknown as {
        galleryImage?: {
          findMany: (args: {
            orderBy: Array<{ sortOrder: "asc" } | { createdAt: "asc" }>;
          }) => Promise<TGalleryImageRow[]>;
        };
      }
    ).galleryImage;

    const images = galleryModel
      ? await galleryModel.findMany({
          orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
        })
      : await prisma.$queryRaw<TGalleryImageRow[]>`
          SELECT id, url, alt, "sortOrder", "createdAt", "updatedAt"
          FROM "GalleryImage"
          ORDER BY "sortOrder" ASC, "createdAt" ASC
        `;

    return NextResponse.json(images);
  } catch (error) {
    console.error("GET /api/gallery", error);
    return NextResponse.json(
      { error: "Failed to fetch gallery images" },
      { status: 500 },
    );
  }
};

export const POST = async (request: Request) => {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { url, alt } = body as { url?: string; alt?: string };

    if (!url) {
      return NextResponse.json({ error: "Missing required field: url" }, { status: 400 });
    }

    const galleryModel = (
      prisma as unknown as {
        galleryImage?: {
          findFirst: (args: {
            orderBy: { sortOrder: "desc" };
            select: { sortOrder: true };
          }) => Promise<{ sortOrder: number } | null>;
          create: (args: {
            data: { url: string; alt: string | null; sortOrder: number };
          }) => Promise<TGalleryImageRow>;
        };
      }
    ).galleryImage;

    let image: TGalleryImageRow;

    if (galleryModel) {
      const maxOrderImage = await galleryModel.findFirst({
        orderBy: { sortOrder: "desc" },
        select: { sortOrder: true },
      });

      image = await galleryModel.create({
        data: {
          url,
          alt: alt ?? null,
          sortOrder: (maxOrderImage?.sortOrder ?? -1) + 1,
        },
      });
    } else {
      const maxOrderRows = await prisma.$queryRaw<Array<{ sortOrder: number }>>`
        SELECT COALESCE(MAX("sortOrder"), -1)::int AS "sortOrder"
        FROM "GalleryImage"
      `;

      const nextSortOrder = (maxOrderRows[0]?.sortOrder ?? -1) + 1;
      const id = crypto.randomUUID();
      const insertedRows = await prisma.$queryRaw<TGalleryImageRow[]>`
        INSERT INTO "GalleryImage" ("id", "url", "alt", "sortOrder", "createdAt", "updatedAt")
        VALUES (${id}, ${url}, ${alt ?? null}, ${nextSortOrder}, NOW(), NOW())
        RETURNING id, url, alt, "sortOrder", "createdAt", "updatedAt"
      `;

      image = insertedRows[0];
    }

    return NextResponse.json(image);
  } catch (error) {
    console.error("POST /api/gallery", error);
    return NextResponse.json(
      { error: "Failed to create gallery image" },
      { status: 500 },
    );
  }
};
