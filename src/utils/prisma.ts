import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

declare const global: {
  prisma?: PrismaClient;
};

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
  prisma = prisma.$extends(withAccelerate()) as unknown as PrismaClient;
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
    global.prisma = global.prisma.$extends(
      withAccelerate()
    ) as unknown as PrismaClient;
  }
  prisma = global.prisma;
}

export default prisma;
