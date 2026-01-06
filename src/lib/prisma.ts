/**
 * Prisma Client Singleton
 * 
 * ⚠️ IMPORTANT: Always import from this file, never instantiate PrismaClient directly
 * 
 * This ensures a single database connection pool is shared across the application,
 * preventing connection exhaustion in development (hot reload) and production.
 * 
 * @example
 * ```ts
 * // ✅ Correct
 * import { prisma } from '@/lib/prisma'
 * const users = await prisma.user.findMany()
 * 
 * // ❌ Wrong - creates multiple connections
 * import { PrismaClient } from '@prisma/client'
 * const prisma = new PrismaClient()
 * ```
 * 
 * @see https://www.prisma.io/docs/guides/performance-and-optimization/connection-management
 */

import { PrismaClient } from '@prisma/client'

/**
 * Global type for Prisma instance to prevent re-initialization in development
 */
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

/**
 * Shared Prisma Client instance
 * 
 * - In development: Reuses the same instance across hot reloads
 * - In production: Creates a single instance for the application lifetime
 * - Logs queries in development for debugging
 * - Logs only errors in production for performance
 */
export const prisma = global.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' 
    ? ['query', 'error', 'warn'] 
    : ['error'],
})

// Store instance globally in development to survive hot reloads
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}

/**
 * Disconnect helper for cleanup in tests or serverless functions
 * 
 * @example
 * ```ts
 * afterAll(async () => {
 *   await disconnectPrisma()
 * })
 * ```
 */
export async function disconnectPrisma(): Promise<void> {
  await prisma.$disconnect()
}
