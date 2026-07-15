import { PrismaClient } from "@prisma/client";
import { env } from "./env";

// Add prisma to the NodeJS global type
interface CustomNodeJsGlobal {
  prisma: PrismaClient;
}

declare const global: CustomNodeJsGlobal;

const prisma = global.prisma || new PrismaClient({ log: ["query"] });

if (env.NODE_ENV === "development") global.prisma = prisma;

export { prisma };
