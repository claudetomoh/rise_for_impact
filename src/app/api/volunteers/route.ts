import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { notifyApplicationReceived, notifyAdminNewSubmission } from '@/lib/email-notifications'

export async function GET() {
  try {
    const volunteers = await prisma.volunteerApplication.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(volunteers)
  } catch (error) {
    console.error('Error fetching volunteer applications:', error)
    return NextResponse.json(
      { error: 'Failed to fetch volunteer applications' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const volunteer = await prisma.volunteerApplication.create({
      data: body,
    })

    // Send instant confirmation email (non-blocking)
    notifyApplicationReceived({
      name: body.fullName || body.name,
      email: body.email,
      type: `Volunteer - ${body.role || 'General'}`,
      isDonation: false,
    }).catch((error) => {
      console.error('Failed to send volunteer confirmation email:', error)
      // Don't fail the submission if email fails
    })

    // Notify admin about new volunteer (non-blocking)
    notifyAdminNewSubmission({
      type: 'volunteer',
      name: body.fullName || body.name,
      email: body.email,
      submissionType: 'Volunteer Application',
      role: body.role,
      message: body.motivation,
    }).catch((error) => {
      console.error('Failed to send admin notification:', error)
    })

    return NextResponse.json(volunteer, { status: 201 })
  } catch (error) {
    console.error('Error creating volunteer application:', error)
    return NextResponse.json(
      { error: 'Failed to create volunteer application' },
      { status: 500 }
    )
  }
}
