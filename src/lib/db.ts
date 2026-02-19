import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function getPrisma(): PrismaClient {
  const existing = globalForPrisma.prisma;
  if (existing != null && typeof (existing as { scheduleEntry?: unknown }).scheduleEntry !== "undefined") {
    return existing;
  }
  const client = new PrismaClient();
  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = client;
  return client;
}

export const prisma = getPrisma();
