import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { notifySubscribersNewBlog } from '@/lib/email-notifications'

export async function GET() {
  try {
    const blogs = await prisma.blogPost.findMany({
      orderBy: { date: 'desc' },
    })
    return NextResponse.json(blogs || [])
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    // Return empty array instead of error to prevent UI crashes
    return NextResponse.json([])
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const blogPost = await prisma.blogPost.create({
      data: body,
    })

    // Send notification to all newsletter subscribers
    // This runs in the background and doesn't block the response
    notifySubscribersNewBlog({
      title: blogPost.title,
      excerpt: blogPost.excerpt || '',
      image: blogPost.image || undefined,
      url: blogPost.url || undefined,
      author: blogPost.author || 'Rise for Impact Team',
    }).catch(error => {
      console.error('Failed to send blog notifications:', error)
      // Don't fail the blog creation if notification fails
    })

    return NextResponse.json(blogPost, { status: 201 })
  } catch (error) {
    console.error('Error creating blog post:', error)
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}
