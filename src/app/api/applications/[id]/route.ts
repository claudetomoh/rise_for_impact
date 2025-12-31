import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { notifyApplicationApproved } from '@/lib/email-notifications'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const application = await prisma.application.findUnique({
      where: { id: parseInt(id) },
    })

    if (!application) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(application)
  } catch (error) {
    console.error('Error fetching application:', error)
    return NextResponse.json(
      { error: 'Failed to fetch application' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    const application = await prisma.application.update({
      where: { id: parseInt(id) },
      data: {
        status: body.status,
      },
    })

    // Send email notification if status changed to approved
    if (body.status === 'approved') {
      notifyApplicationApproved({
        name: application.name,
        email: application.email,
        type: application.type || 'General Application',
      }).catch(error => {
        console.error('Failed to send approval notification:', error)
        // Don't fail the update if notification fails
      })
    }

    return NextResponse.json(application)
  } catch (error) {
    console.error('Error updating application:', error)
    return NextResponse.json(
      { error: 'Failed to update application' },
      { status: 500 }
    )
  }
}
