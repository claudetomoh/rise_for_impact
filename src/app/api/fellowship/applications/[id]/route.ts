import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * GET /api/fellowship/applications/[id]  — load a draft by its id (public — no auth needed,
 *   the id is a cuid which acts as the access token for the applicant)
 * PUT /api/fellowship/applications/[id]  — update draft fields + progress_step
 */

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const app = await prisma.fellowshipApplication.findUnique({
      where: { id: params.id },
      include: { cohort: { select: { name: true, slug: true, status: true } } },
    })
    if (!app) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(app)
  } catch (error) {
    console.error('Error fetching fellowship application:', error)
    return NextResponse.json({ error: 'Failed to fetch application' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { ...data } = body

    // Prevent editing a submitted application
    const existing = await prisma.fellowshipApplication.findUnique({
      where: { id: params.id },
      select: { isSubmitted: true },
    })
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    if (existing.isSubmitted) {
      return NextResponse.json({ error: 'This application has already been submitted' }, { status: 400 })
    }

    const updated = await prisma.fellowshipApplication.update({
      where: { id: params.id },
      data: sanitiseFields(data),
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Error updating fellowship application:', error)
    return NextResponse.json({ error: 'Failed to update application' }, { status: 500 })
  }
}

function sanitiseFields(data: Record<string, unknown>) {
  const booleanFields = [
    'canAttendBuea', 'canCommitFourMonths', 'hasCurrentInitiative',
    'hasLedInitiative', 'contributionWilling',
    'declareAttendBuea', 'declareTransportAccom', 'declareCommitProgram',
    'declareCompetitiveProc', 'declareActiveParticip',
  ]
  const allowed = [
    'fullName', 'dateOfBirth', 'age', 'gender', 'email', 'phone',
    'country', 'region', 'cityTown', 'currentStatus', 'schoolOrganization',
    'canAttendBuea', 'bueaAccommodationStatus', 'canCommitFourMonths',
    'hasCurrentInitiative', 'initiativeSummary', 'impactArea',
    'hasLedInitiative', 'ledInitiativeSummary',
    'essayLeadership', 'essayCommunityProblem', 'passItOnResponse',
    'contributionWilling', 'contributionExplanation',
    'motivationOneSentence',
    'declareAttendBuea', 'declareTransportAccom', 'declareCommitProgram',
    'declareCompetitiveProc', 'declareActiveParticip',
    'progressStep',
  ]

  const out: Record<string, unknown> = {}
  for (const key of allowed) {
    if (data[key] === undefined) continue
    if (booleanFields.includes(key)) {
      const v = data[key]
      if (typeof v === 'string') out[key] = v === 'yes' || v === 'true'
      else out[key] = Boolean(v)
    } else {
      out[key] = data[key]
    }
  }
  return out
}
