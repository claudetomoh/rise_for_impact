const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function addLikesColumn() {
    try {
        // Add likes column using raw SQL
        await prisma.$executeRaw `
      ALTER TABLE blog_posts 
      ADD COLUMN IF NOT EXISTS likes INTEGER DEFAULT 0
    `

        console.log('✅ Successfully added likes column!')

        // Update existing rows
        await prisma.$executeRaw `
      UPDATE blog_posts SET likes = 0 WHERE likes IS NULL
    `

        console.log('✅ Updated existing blog posts with 0 likes')

        // Add updatedAt column if it doesn't exist
        await prisma.$executeRaw `
      ALTER TABLE blog_posts 
      ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
    `

        console.log('✅ Added updated_at column')

    } catch (error) {
        console.error('Error:', error)
    } finally {
        await prisma.$disconnect()
    }
}

addLikesColumn()