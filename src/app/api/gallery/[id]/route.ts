import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { GALLERY_BUCKET, supabaseServer } from "@/lib/supabase-server";

type TGalleryImageRow = {
  id: string;
  url: string;
};

const getStorageObjectPathFromPublicUrl = (
  fileUrl: string,
  bucketName: string,
): string | null => {
  try {
    const parsedUrl = new URL(fileUrl);
    const marker = `/storage/v1/object/public/${bucketName}/`;
    const markerSigned = `/storage/v1/object/sign/${bucketName}/`;
    const markerIndex = parsedUrl.pathname.indexOf(marker);
    const markerSignedIndex = parsedUrl.pathname.indexOf(markerSigned);

    if (markerIndex >= 0) {
      return decodeURIComponent(
        parsedUrl.pathname.slice(markerIndex + marker.length),
      );
    }

    if (markerSignedIndex >= 0) {
      return decodeURIComponent(
        parsedUrl.pathname.slice(markerSignedIndex + markerSigned.length),
      );
    }

    return null;
  } catch {
    return null;
  }
};

export const DELETE = async (
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const galleryModel = (
      prisma as unknown as {
        galleryImage?: {
          findUnique: (args: {
            where: { id: string };
            select: { id: true; url: true };
          }) => Promise<TGalleryImageRow | null>;
          delete: (args: { where: { id: string } }) => Promise<unknown>;
        };
      }
    ).galleryImage;

    const imageRow = galleryModel
      ? await galleryModel.findUnique({
          where: { id },
          select: { id: true, url: true },
        })
      : (
          await prisma.$queryRaw<TGalleryImageRow[]>`
            SELECT id, url
            FROM "GalleryImage"
            WHERE id = ${id}
            LIMIT 1
          `
        )[0] ?? null;

    if (!imageRow) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    if (supabaseServer) {
      const storagePath = getStorageObjectPathFromPublicUrl(
        imageRow.url,
        GALLERY_BUCKET,
      );

      if (storagePath) {
        const { error: removeError } = await supabaseServer.storage
          .from(GALLERY_BUCKET)
          .remove([storagePath]);

        if (removeError) {
          console.error("DELETE /api/gallery/[id] storage remove error", removeError);
          return NextResponse.json(
            { error: "Failed to delete image from storage" },
            { status: 500 },
          );
        }
      }
    }

    if (galleryModel) {
      await galleryModel.delete({ where: { id } });
    } else {
      await prisma.$executeRaw`DELETE FROM "GalleryImage" WHERE "id" = ${id}`;
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE /api/gallery/[id]", error);
    return NextResponse.json(
      { error: "Failed to delete gallery image" },
      { status: 500 },
    );
  }
};
