import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { notifyApplicationReceived, notifyAdminNewSubmission } from '@/lib/email-notifications'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.name || !body.email || !body.country) {
      return NextResponse.json(
        { error: 'Name, email, and country are required' },
        { status: 400 }
      )
    }

    const application = await prisma.application.create({
      data: {
        name: body.name,
        email: body.email,
        country: body.country,
        message: body.message || '',
        type: body.type || 'general',
        status: 'pending',
      },
    })

    // Send instant confirmation email (non-blocking)
    const isDonation = body.type?.toLowerCase().includes('donation') || body.type?.toLowerCase().includes('donor')
    notifyApplicationReceived({
      name: body.name,
      email: body.email,
      type: body.type || 'general',
      isDonation,
    }).catch((error) => {
      console.error('Failed to send confirmation email:', error)
      // Don't fail the application submission if email fails
    })

    return NextResponse.json(
      { message: 'Application submitted successfully', application },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error submitting application:', error)
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const applications = await prisma.application.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(applications)
  } catch (error) {
    console.error('Error fetching applications:', error)
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    )
  }
}
