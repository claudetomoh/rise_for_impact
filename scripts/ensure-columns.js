/**
 * ensure-columns.js
 * Run at build time to guarantee the two declaration columns exist.
 * Uses ADD COLUMN IF NOT EXISTS so it's always safe to re-run.
 */
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    await prisma.$executeRaw `
    ALTER TABLE "fellowship_applications"
      ADD COLUMN IF NOT EXISTS "declare_accurate" BOOLEAN NOT NULL DEFAULT false`

    await prisma.$executeRaw `
    ALTER TABLE "fellowship_applications"
      ADD COLUMN IF NOT EXISTS "declare_data_consent" BOOLEAN NOT NULL DEFAULT false`

    console.log('✅ fellowship_applications columns verified.')
}

main()
    .catch(e => {
        console.error('Column check failed:', e.message)
        process.exit(1)
    })
    .finally(() => prisma.$disconnect())