import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const team = await prisma.teamMember.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(team || [])
  } catch (error) {
    console.error('Error fetching team members:', error)
    // Return empty array instead of error to prevent UI crashes
    return NextResponse.json([])
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const teamMember = await prisma.teamMember.create({
      data: body,
    })
    return NextResponse.json(teamMember, { status: 201 })
  } catch (error) {
    console.error('Error creating team member:', error)
    return NextResponse.json(
      { error: 'Failed to create team member' },
      { status: 500 }
    )
  }
}
