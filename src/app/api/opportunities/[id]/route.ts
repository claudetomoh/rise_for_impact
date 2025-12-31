import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET - Fetch single opportunity by ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const opportunity = await prisma.opportunity.findUnique({
      where: { id: parseInt(id) },
    })

    if (!opportunity) {
      return NextResponse.json(
        { error: 'Opportunity not found' },
        { status: 404 }
      )
    }

    // Increment view count
    await prisma.opportunity.update({
      where: { id: parseInt(id) },
      data: { views: opportunity.views + 1 },
    })

    return NextResponse.json(opportunity)
  } catch (error) {
    console.error('Error fetching opportunity:', error)
    return NextResponse.json(
      { error: 'Failed to fetch opportunity' },
      { status: 500 }
    )
  }
}

// PATCH - Update opportunity (admin only)
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params;
    const body = await request.json()

    const opportunity = await prisma.opportunity.update({
      where: { id: parseInt(id) },
      data: {
        title: body.title,
        description: body.description,
        organization: body.organization,
        deadline: body.deadline,
        eligibility: body.eligibility,
        benefits: body.benefits,
        applyLink: body.applyLink,
        image: body.image,
        categories: body.categories ? JSON.stringify(body.categories) : null,
        location: body.location,
        isPaid: body.isPaid,
        isActive: body.isActive,
        isFeatured: body.isFeatured,
      },
    })

    return NextResponse.json(opportunity)
  } catch (error) {
    console.error('Error updating opportunity:', error)
    return NextResponse.json(
      { error: 'Failed to update opportunity' },
      { status: 500 }
    )
  }
}

// DELETE - Delete opportunity (admin only)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params;
    await prisma.opportunity.delete({
      where: { id: parseInt(id) },
    })

    return NextResponse.json({ message: 'Opportunity deleted successfully' })
  } catch (error) {
    console.error('Error deleting opportunity:', error)
    return NextResponse.json(
      { error: 'Failed to delete opportunity' },
      { status: 500 }
    )
  }
}
