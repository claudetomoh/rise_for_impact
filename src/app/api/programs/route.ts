import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const programs = await prisma.program.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(programs || [])
  } catch (error) {
    console.error('Error fetching programs:', error)
    // Return empty array instead of error to prevent UI crashes
    return NextResponse.json([])
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const program = await prisma.program.create({
      data: body,
    })
    return NextResponse.json(program, { status: 201 })
  } catch (error) {
    console.error('Error creating program:', error)
    return NextResponse.json(
      { error: 'Failed to create program' },
      { status: 500 }
    )
  }
}
