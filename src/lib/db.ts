import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function getPrisma(): PrismaClient {
  const existing = globalForPrisma.prisma;
  const hasScheduleEntry =
    existing != null &&
    typeof (existing as { scheduleEntry?: unknown }).scheduleEntry !==
      "undefined";
  const hasScheduleSignup =
    existing != null &&
    typeof (existing as { scheduleSignup?: unknown }).scheduleSignup !==
      "undefined";
  const hasGalleryImage =
    existing != null &&
    typeof (existing as { galleryImage?: unknown }).galleryImage !==
      "undefined";
  const hasEventImageField =
    existing != null &&
    Array.isArray(
      (
        existing as {
          _runtimeDataModel?: {
            models?: {
              Event?: { fields?: Array<{ name?: string }> };
            };
          };
        }
      )._runtimeDataModel?.models?.Event?.fields,
    ) &&
    (
      existing as {
        _runtimeDataModel?: {
          models?: {
            Event?: { fields?: Array<{ name?: string }> };
          };
        };
      }
    )._runtimeDataModel?.models?.Event?.fields?.some(
      (field) => field.name === "image",
    ) === true;
  if (
    hasScheduleEntry &&
    hasScheduleSignup &&
    hasGalleryImage &&
    hasEventImageField
  ) {
    return existing;
  }
  const client = new PrismaClient();
  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = client;
  return client;
}

export const prisma = getPrisma();
