import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

// Extend the global object in Node.js to attach the Prisma client (for development mode).
declare global {
  // This is necessary for TypeScript to understand that we're extending the Node.js global object.
  // In production, `global.prisma` will not exist, so it's only used in development mode.
  var prisma: PrismaClient | undefined;
}

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // In development, we attach the Prisma client to the global object to reuse the same instance.
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
