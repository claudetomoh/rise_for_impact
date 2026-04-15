import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { notifyApplicationReceived } from '@/lib/email-notifications'

/**
 * POST /api/fellowship/applications/[id]/submit
 * Finalises a draft, validates required fields server-side, marks as submitted.
 */
export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const app = await prisma.fellowshipApplication.findUnique({
      where: { id },
    })
    if (!app) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    if (app.isSubmitted) {
      return NextResponse.json({ error: 'Application already submitted' }, { status: 400 })
    }

    // Server-side required field validation
    const missing: string[] = []
    if (!app.fullName?.trim()) missing.push('Full Name')
    if (!app.dateOfBirth) missing.push('Date of Birth')
    if (!app.email?.trim()) missing.push('Email')
    if (!app.phone?.trim()) missing.push('Phone')
    if (!app.country?.trim()) missing.push('Country')
    if (!app.region?.trim()) missing.push('Region')
    if (!app.cityTown?.trim()) missing.push('City / Town')
    if (!app.currentStatus?.trim()) missing.push('Current Status')
    if (app.canAttendBuea === null) missing.push('Availability — in-person session')
    if (!app.bueaAccommodationStatus?.trim()) missing.push('Accommodation situation')
    if (app.canCommitFourMonths === null) missing.push('Mentorship commitment')
    if (app.hasCurrentInitiative === null) missing.push('Current initiative question')
    if (!app.impactArea?.trim()) missing.push('Impact area')
    if (app.hasLedInitiative === null) missing.push('Led initiative question')
    if (!app.essayLeadership?.trim()) missing.push('Essay 1 — Leadership')
    if (!app.essayCommunityProblem?.trim()) missing.push('Essay 2 — Community Problem')
    if (!app.passItOnResponse?.trim()) missing.push('Pass It On response')
    if (app.contributionWilling === null) missing.push('Commitment contribution')
    if (!app.motivationOneSentence?.trim()) missing.push('Motivation sentence')
    if (!app.declareAttendBuea || !app.declareTransportAccom || !app.declareCommitProgram ||
        !app.declareCompetitiveProc || !app.declareActiveParticip) {
      missing.push('All declarations must be confirmed')
    }
    if (!app.declareAccurate) missing.push('Accuracy declaration must be confirmed')
    if (!app.declareDataConsent) missing.push('Data consent must be confirmed')

    if (missing.length > 0) {
      return NextResponse.json(
        { error: 'Incomplete application', missing },
        { status: 422 }
      )
    }

    const submitted = await prisma.fellowshipApplication.update({
      where: { id },
      data: {
        isSubmitted: true,
        submittedAt: new Date(),
        status: 'submitted',
        progressStep: 9,
      },
    })

    // Confirmation email (non-blocking)
    if (submitted.email && submitted.fullName) {
      notifyApplicationReceived({
        name: submitted.fullName,
        email: submitted.email,
        type: 'Rise for Impact Fellowship — Cameroon Cohort 2026',
        isDonation: false,
      }).catch((err) => console.error('Fellowship confirmation email failed:', err))
    }

    return NextResponse.json({ success: true, id: submitted.id })
  } catch (error) {
    console.error('Error submitting fellowship application:', error)
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 })
  }
}
