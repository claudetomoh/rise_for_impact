import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

/**
 * GET /api/fellowship/cohorts/[id]
 * PUT /api/fellowship/cohorts/[id]
 */

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { id } = await params
    const cohort = await prisma.fellowshipCohort.findUnique({
      where: { id: parseInt(id) },
    })
    if (!cohort) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(cohort)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch cohort' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { id } = await params
    const body = await request.json()
    // Prevent id and slug from being overwritten silently
    const { id: _id, ...data } = body
    const cohort = await prisma.fellowshipCohort.update({
      where: { id: parseInt(id) },
      data,
    })
    return NextResponse.json(cohort)
  } catch (error) {
    console.error('Error updating cohort:', error)
    return NextResponse.json({ error: 'Failed to update cohort' }, { status: 500 })
  }
}
