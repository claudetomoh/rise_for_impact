import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

/**
 * POST /api/fellowship/applications/[id]/review  — create or update a review (admin only)
 */
export async function POST(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json()

    const {
      scoreCommitmentAvailability = 0,
      scoreLeadershipInitiative = 0,
      scoreProblemAwareness = 0,
      scoreClarityComm = 0,
      scoreExecutionPotential = 0,
      scorePassItOn = 0,
      notes = '',
      finalRecommendation = 'pending',
      reviewerName = '',
    } = body

    // Clamp scores to their maximums
    const scores = {
      scoreCommitmentAvailability: Math.min(20, Math.max(0, Number(scoreCommitmentAvailability))),
      scoreLeadershipInitiative:   Math.min(20, Math.max(0, Number(scoreLeadershipInitiative))),
      scoreProblemAwareness:       Math.min(20, Math.max(0, Number(scoreProblemAwareness))),
      scoreClarityComm:            Math.min(15, Math.max(0, Number(scoreClarityComm))),
      scoreExecutionPotential:     Math.min(15, Math.max(0, Number(scoreExecutionPotential))),
      scorePassItOn:               Math.min(10, Math.max(0, Number(scorePassItOn))),
    }
    const totalScore =
      scores.scoreCommitmentAvailability +
      scores.scoreLeadershipInitiative +
      scores.scoreProblemAwareness +
      scores.scoreClarityComm +
      scores.scoreExecutionPotential +
      scores.scorePassItOn

    const review = await prisma.applicationReview.upsert({
      where: { applicationId: params.id },
      create: {
        applicationId: params.id,
        reviewerName,
        ...scores,
        totalScore,
        notes,
        finalRecommendation,
      },
      update: {
        reviewerName,
        ...scores,
        totalScore,
        notes,
        finalRecommendation,
      },
    })

    // Sync status on the application itself
    const statusMap: Record<string, string> = {
      shortlist: 'shortlisted',
      interview: 'interview',
      accepted: 'accepted',
      rejected: 'rejected',
      pending: 'submitted',
    }
    await prisma.fellowshipApplication.update({
      where: { id: params.id },
      data: { status: statusMap[finalRecommendation] || 'submitted' },
    })

    return NextResponse.json(review)
  } catch (error) {
    console.error('Error saving review:', error)
    return NextResponse.json({ error: 'Failed to save review' }, { status: 500 })
  }
}
