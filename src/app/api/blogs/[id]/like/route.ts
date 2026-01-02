import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const blog = await prisma.blogPost.update({
      where: { id: parseInt(id) },
      data: {
        likes: {
          increment: 1
        }
      }
    })

    return NextResponse.json({ likes: blog.likes })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to like blog post' },
      { status: 500 }
    )
  }
}
