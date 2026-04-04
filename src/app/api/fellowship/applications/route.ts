import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

/**
 * GET  /api/fellowship/applications  — admin: list all applications
 * POST /api/fellowship/applications  — public: create a new draft application
 */

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const cohortId = searchParams.get('cohortId')
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    const submittedOnly = searchParams.get('submittedOnly') !== 'false'

    const where: Record<string, unknown> = {}
    if (cohortId) where.cohortId = parseInt(cohortId)
    if (status) where.status = status
    if (submittedOnly) where.isSubmitted = true
    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { region: { contains: search, mode: 'insensitive' } },
        { cityTown: { contains: search, mode: 'insensitive' } },
        { impactArea: { contains: search, mode: 'insensitive' } },
      ]
    }

    const applications = await prisma.fellowshipApplication.findMany({
      where,
      include: {
        cohort: { select: { name: true, slug: true } },
        review: { select: { totalScore: true, finalRecommendation: true } },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(applications)
  } catch (error) {
    console.error('Error fetching fellowship applications:', error)
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { cohortSlug, ...data } = body

    // Resolve cohort by slug
    const cohort = await prisma.fellowshipCohort.findUnique({ where: { slug: cohortSlug } })
    if (!cohort) {
      return NextResponse.json({ error: 'Cohort not found' }, { status: 404 })
    }
    if (cohort.status === 'closed' || cohort.status === 'archived') {
      return NextResponse.json({ error: 'Applications are closed for this cohort' }, { status: 400 })
    }

    const application = await prisma.fellowshipApplication.create({
      data: {
        cohortId: cohort.id,
        status: 'draft',
        progressStep: data.progressStep || 1,
        ...sanitiseFields(data),
      },
    })

    return NextResponse.json(application, { status: 201 })
  } catch (error) {
    console.error('Error creating fellowship application:', error)
    return NextResponse.json({ error: 'Failed to create application' }, { status: 500 })
  }
}

/** Strip unknown keys and cast booleans to protect against direct injection */
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
      // 'yes'/'no' strings → booleans for availability fields
      const v = data[key]
      if (typeof v === 'string') out[key] = v === 'yes' || v === 'true'
      else out[key] = Boolean(v)
    } else {
      out[key] = data[key]
    }
  }
  return out
}
