import { PrismaClient } from "@prisma/client";
declare global {
  // eslint-disable-next-line no-var
  var prismaVar: PrismaClient | undefined;
}
const prisma = globalThis.prismaVar || new PrismaClient();
if (process.env.NODE_ENV !== "production") {
  globalThis.prismaVar = prisma;
}

export default prisma;
