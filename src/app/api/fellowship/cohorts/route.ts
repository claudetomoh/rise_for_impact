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
    const cohort = await prisma.fellowshipCohort.create({
      data: {
        name: body.name,
        slug: body.slug,
        year: body.year,
        country: body.country,
        city: body.city,
        venueCity: body.venueCity,
        applicationOpenDate: body.applicationOpenDate ?? null,
        applicationCloseDate: body.applicationCloseDate ?? null,
        fellowshipStartDate: body.fellowshipStartDate ?? null,
        inPersonStartDate: body.inPersonStartDate ?? null,
        inPersonEndDate: body.inPersonEndDate ?? null,
        mentorshipDurationText: body.mentorshipDurationText ?? '4 months',
        status: body.status ?? 'upcoming',
        contributionAmount: body.contributionAmount ?? 10000,
        contributionCurrency: body.contributionCurrency ?? 'FCFA',
        contributionLabel: body.contributionLabel ?? 'Commitment Contribution',
        contributionDescription: body.contributionDescription ?? null,
        transportationCovered: body.transportationCovered ?? false,
        accommodationCovered: body.accommodationCovered ?? false,
        ageMin: body.ageMin ?? null,
        ageMax: body.ageMax ?? null,
        fellowshipBulletsJson: body.fellowshipBulletsJson ?? null,
        passItOnTitle: body.passItOnTitle ?? null,
        passItOnParagraph: body.passItOnParagraph ?? null,
        passItOnBulletsJson: body.passItOnBulletsJson ?? null,
        contributionFullTitle: body.contributionFullTitle ?? null,
        contributionFullParagraph: body.contributionFullParagraph ?? null,
        eligibilityPointsJson: body.eligibilityPointsJson ?? null,
        beforeYouApplyJson: body.beforeYouApplyJson ?? null,
        essay1Title: body.essay1Title ?? null,
        essay1Prompt: body.essay1Prompt ?? null,
        essay2Title: body.essay2Title ?? null,
        essay2Prompt: body.essay2Prompt ?? null,
        passItOnEssayTitle: body.passItOnEssayTitle ?? null,
        passItOnEssayPrompt: body.passItOnEssayPrompt ?? null,
        declarationCheckboxesJson: body.declarationCheckboxesJson ?? null,
        introCopy: body.introCopy ?? null,
        eligibilityCopy: body.eligibilityCopy ?? null,
        logisticsCopy: body.logisticsCopy ?? null,
      },
    })
    return NextResponse.json(cohort, { status: 201 })
  } catch (error) {
    console.error('Error creating cohort:', error)
    return NextResponse.json({ error: 'Failed to create cohort' }, { status: 500 })
  }
}
