import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET - Fetch all opportunities (public - no auth required)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const activeOnly = searchParams.get('activeOnly') === 'true'
    const featuredOnly = searchParams.get('featuredOnly') === 'true'

    const where: any = {}
    if (activeOnly) where.isActive = true
    if (featuredOnly) where.isFeatured = true

    const opportunities = await prisma.opportunity.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(opportunities)
  } catch (error) {
    console.error('Error fetching opportunities:', error)
    return NextResponse.json(
      { error: 'Failed to fetch opportunities' },
      { status: 500 }
    )
  }
}

// POST - Create new opportunity (admin only)
export async function POST(request: Request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    // Validate required fields
    if (!body.title || !body.description || !body.applyLink) {
      return NextResponse.json(
        { error: 'Title, description, and apply link are required' },
        { status: 400 }
      )
    }

    const opportunity = await prisma.opportunity.create({
      data: {
        title: body.title,
        description: body.description,
        organization: body.organization || null,
        deadline: body.deadline || null,
        eligibility: body.eligibility || null,
        benefits: body.benefits || null,
        applyLink: body.applyLink,
        image: body.image || null,
        categories: body.categories ? JSON.stringify(body.categories) : null,
        location: body.location || null,
        isPaid: body.isPaid || false,
        isActive: body.isActive !== undefined ? body.isActive : true,
        isFeatured: body.isFeatured || false,
      },
    })

    // Send email notification to all subscribers (non-blocking)
    if (body.isActive && body.isFeatured) {
      // Only send email if opportunity is active and featured
      const { notifySubscribersNewOpportunity } = await import('@/lib/email-notifications')
      const categoriesArray = body.categories || []
      notifySubscribersNewOpportunity({
        title: opportunity.title,
        description: opportunity.description,
        organization: opportunity.organization,
        deadline: opportunity.deadline,
        image: opportunity.image,
        applyLink: opportunity.applyLink,
        category: categoriesArray.length > 0 ? categoriesArray.join(', ') : null,
      }).catch((error) => {
        console.error('Failed to send opportunity notification:', error)
      })
    }

    return NextResponse.json(opportunity, { status: 201 })
  } catch (error) {
    console.error('Error creating opportunity:', error)
    return NextResponse.json(
      { error: 'Failed to create opportunity' },
      { status: 500 }
    )
  }
}
