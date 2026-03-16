// TODO: Uncomment and configure when MongoDB Atlas is connected.
// Run `bunx prisma generate` after adding DATABASE_URL to .env

// import { PrismaClient } from '@prisma/client';
//
// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };
//
// export const prisma =
//   globalForPrisma.prisma ??
//   new PrismaClient({
//     log: process.env.NODE_ENV === 'development' ? ['query'] : [],
//   });
//
// if (process.env.NODE_ENV !== 'production') {
//   globalForPrisma.prisma = prisma;
// }

// Stub — replaced when Prisma schema is generated
export const prisma = null;
