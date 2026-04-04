import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ACTIVE_COHORT_SLUG } from '@/lib/fellowship-config'

/**
 * GET /api/fellowship/cohorts/active
 * Public endpoint — returns the active cohort config (no auth required)
 * Used by the apply page to get DB-stored essay prompts, eligibility points, etc.
 */
export async function GET() {
  try {
    const cohort = await prisma.fellowshipCohort.findUnique({
      where: { slug: ACTIVE_COHORT_SLUG },
    })
    if (!cohort) {
      return NextResponse.json({ error: 'Active cohort not found' }, { status: 404 })
    }
    return NextResponse.json(cohort)
  } catch (error) {
    console.error('Error fetching active cohort:', error)
    return NextResponse.json({ error: 'Failed to fetch cohort' }, { status: 500 })
  }
}
