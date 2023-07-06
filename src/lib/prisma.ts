import { Prisma, PrismaClient } from "@prisma/client";
import { extension } from "prisma-paginate";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

const extendedPrisma = prisma.$extends(extension);

export { prisma, extendedPrisma };

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
