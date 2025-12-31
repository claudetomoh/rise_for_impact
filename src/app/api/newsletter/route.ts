import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

const newsletterSchema = z.object({
  email: z.string().email(),
})

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  
  try {
    const body = await request.json()
    const { email } = newsletterSchema.parse(body)

    // Check if email already exists
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 400 }
      )
    }

    // Add to database
    await prisma.newsletterSubscriber.create({
      data: { email },
    })

    // Send welcome email
    await resend.emails.send({
      from: 'Rise for Impact <noreply@riseforimpact.org>',
      to: email,
      subject: 'Welcome to Rise for Impact Newsletter!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; padding: 40px 0;">
            <h1 style="color: #22C55E; font-size: 32px; margin: 0;">Rise for Impact</h1>
          </div>

          <div style="background: linear-gradient(to right, #22C55E, #F59E0B); height: 4px; margin: 20px 0;"></div>

          <h2 style="color: #1F2937;">Welcome to the Movement! 🎉</h2>
          
          <p>Thank you for subscribing to our newsletter! You've joined 5,000+ changemakers receiving monthly updates on:</p>

          <ul style="color: #4B5563; line-height: 1.8;">
            <li>🌟 Inspiring impact stories from across Africa</li>
            <li>📚 New program launches and opportunities</li>
            <li>🎯 Leadership development resources</li>
            <li>🌍 Climate action initiatives</li>
            <li>🤝 Community events and collaboration opportunities</li>
          </ul>

          <div style="background: #F9FAFB; padding: 20px; border-radius: 8px; margin: 30px 0;">
            <h3 style="color: #1F2937; margin-top: 0;">What's Next?</h3>
            <p style="color: #4B5563; margin-bottom: 0;">
              Explore our programs, read our latest blog posts, and consider applying 
              to join our fellowship program. Together, we're building a better Africa!
            </p>
          </div>

          <p style="color: #6B7280; font-size: 14px; border-top: 1px solid #E5E7EB; padding-top: 20px; margin-top: 40px;">
            You can unsubscribe at any time by clicking the link in our emails.<br>
            Rise for Impact | Empowering African Youth Leaders
          </p>
        </div>
      `,
    })

    return NextResponse.json(
      { message: 'Subscribed successfully' },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    )
  }
}

// GET - Fetch all subscribers (admin only)
export async function GET() {
  try {
    const subscribers = await prisma.newsletterSubscriber.findMany({
      orderBy: { subscribedAt: 'desc' },
    })

    return NextResponse.json(subscribers, { status: 200 })
  } catch (error) {
    console.error('Error fetching subscribers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    )
  }
}

// PATCH - Update subscriber status
export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const body = await request.json()
    const { isActive } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Subscriber ID is required' },
        { status: 400 }
      )
    }

    const updated = await prisma.newsletterSubscriber.update({
      where: { id: parseInt(id) },
      data: { isActive },
    })

    return NextResponse.json(updated, { status: 200 })
  } catch (error) {
    console.error('Error updating subscriber:', error)
    return NextResponse.json(
      { error: 'Failed to update subscriber' },
      { status: 500 }
    )
  }
}

// DELETE - Remove subscriber
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Subscriber ID is required' },
        { status: 400 }
      )
    }

    await prisma.newsletterSubscriber.delete({
      where: { id: parseInt(id) },
    })

    return NextResponse.json(
      { message: 'Subscriber deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting subscriber:', error)
    return NextResponse.json(
      { error: 'Failed to delete subscriber' },
      { status: 500 }
    )
  }
}
