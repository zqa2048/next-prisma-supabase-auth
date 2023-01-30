import { PrismaClient } from "@prisma/client";

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "prodection") {
  global.prisma = prisma;
}
