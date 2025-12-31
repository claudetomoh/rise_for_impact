import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const media = await prisma.mediaAsset.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(media)
  } catch (error) {
    console.error('Error fetching media assets:', error)
    return NextResponse.json(
      { error: 'Failed to fetch media assets' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const mediaAsset = await prisma.mediaAsset.create({
      data: body,
    })
    return NextResponse.json(mediaAsset, { status: 201 })
  } catch (error) {
    console.error('Error creating media asset:', error)
    return NextResponse.json(
      { error: 'Failed to create media asset' },
      { status: 500 }
    )
  }
}
