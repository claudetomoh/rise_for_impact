import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(5),
  message: z.string().min(20),
})

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  
  try {
    const body = await request.json()
    const validatedData = contactSchema.parse(body)

    // Send email using Resend
    await resend.emails.send({
      from: 'Rise for Impact <noreply@riseforimpact.org>',
      to: process.env.CONTACT_EMAIL || 'info@riseforimpact.org',
      replyTo: validatedData.email,
      subject: `Contact Form: ${validatedData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #22C55E;">New Contact Form Submission</h2>
          
          <div style="background: #F9FAFB; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${validatedData.name}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            ${validatedData.phone ? `<p><strong>Phone:</strong> ${validatedData.phone}</p>` : ''}
            <p><strong>Subject:</strong> ${validatedData.subject}</p>
          </div>

          <div style="background: #F9FAFB; padding: 20px; border-radius: 8px;">
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${validatedData.message}</p>
          </div>

          <p style="color: #6B7280; font-size: 12px; margin-top: 20px;">
            This email was sent from the Rise for Impact contact form.
          </p>
        </div>
      `,
    })

    // Send confirmation email to user
    await resend.emails.send({
      from: 'Rise for Impact <noreply@riseforimpact.org>',
      to: validatedData.email,
      subject: 'We received your message!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #22C55E;">Thank You for Reaching Out!</h2>
          
          <p>Hi ${validatedData.name},</p>
          
          <p>We've received your message and our team will get back to you within 24 hours.</p>
          
          <div style="background: #F9FAFB; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Your Message:</strong></p>
            <p style="white-space: pre-wrap;">${validatedData.message}</p>
          </div>

          <p>In the meantime, feel free to explore our programs and impact stories on our website.</p>

          <p>Best regards,<br>The Rise for Impact Team</p>
        </div>
      `,
    })

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
