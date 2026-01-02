const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function updateBlogPhoneNumbers() {
    try {
        // Find the blog post by Claude Tomoh about background
        const blog = await prisma.blogPost.findFirst({
            where: {
                author: 'Claude Tomoh',
                title: {
                    contains: 'Never Let Your Background'
                }
            }
        })

        if (!blog) {
            console.log('Blog post not found')
            return
        }

        console.log('Found blog:', blog.title)

        // Replace old phone numbers with new ones
        let updatedContent = blog.content

        // Replace various formats of old phone numbers
        updatedContent = updatedContent.replace(/\+?\s?233\s?5[0-9\s]{8,}/g, '+233 538 034 157')
        updatedContent = updatedContent.replace(/\+?\s?237\s?6[0-9\s]{8,}/g, '+237 673 031 205')

        // Update the blog post
        await prisma.blogPost.update({
            where: { id: blog.id },
            data: { content: updatedContent }
        })

        console.log('✅ Phone numbers updated successfully!')
        console.log('New numbers:')
        console.log('+233 538 034 157')
        console.log('+237 673 031 205')

    } catch (error) {
        console.error('Error updating blog:', error)
    } finally {
        await prisma.$disconnect()
    }
}

updateBlogPhoneNumbers()