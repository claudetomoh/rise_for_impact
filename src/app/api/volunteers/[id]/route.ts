import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { notifyVolunteerApproved } from '@/lib/email-notifications'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const volunteer = await prisma.volunteerApplication.findUnique({
      where: { id: parseInt(id) },
    })

    if (!volunteer) {
      return NextResponse.json(
        { error: 'Volunteer application not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(volunteer)
  } catch (error) {
    console.error('Error fetching volunteer application:', error)
    return NextResponse.json(
      { error: 'Failed to fetch volunteer application' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const body = await request.json()
    const volunteer = await prisma.volunteerApplication.update({
      where: { id: parseInt(id) },
      data: body,
    })

    // Send email notification if status changed to approved
    if (body.status === 'approved' && volunteer.status === 'approved') {
      notifyVolunteerApproved({
        fullName: volunteer.fullName,
        email: volunteer.email,
        role: volunteer.role,
      }).catch(error => {
        console.error('Failed to send volunteer approval notification:', error)
        // Don't fail the update if notification fails
      })
    }

    return NextResponse.json(volunteer)
  } catch (error) {
    console.error('Error updating volunteer application:', error)
    return NextResponse.json(
      { error: 'Failed to update volunteer application' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    await prisma.volunteerApplication.delete({
      where: { id: parseInt(id) },
    })
    return NextResponse.json({ message: 'Volunteer application deleted successfully' })
  } catch (error) {
    console.error('Error deleting volunteer application:', error)
    return NextResponse.json(
      { error: 'Failed to delete volunteer application' },
      { status: 500 }
    )
  }
}
