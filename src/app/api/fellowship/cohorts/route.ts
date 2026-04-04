import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

/**
 * GET  /api/fellowship/cohorts  — list all cohorts (admin only)
 * POST /api/fellowship/cohorts  — create new cohort (admin only)
 */

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const cohorts = await prisma.fellowshipCohort.findMany({
      orderBy: { year: 'desc' },
      include: {
        _count: { select: { applications: { where: { isSubmitted: true } } } },
      },
    })
    return NextResponse.json(cohorts)
  } catch (error) {
    console.error('Error fetching cohorts:', error)
    return NextResponse.json({ error: 'Failed to fetch cohorts' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json()
    const cohort = await prisma.fellowshipCohort.create({ data: body })
    return NextResponse.json(cohort, { status: 201 })
  } catch (error) {
    console.error('Error creating cohort:', error)
    return NextResponse.json({ error: 'Failed to create cohort' }, { status: 500 })
  }
}
