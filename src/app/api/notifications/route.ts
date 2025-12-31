import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// Email notification endpoint
// In production, integrate with SendGrid, AWS SES, or similar service
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { to, subject, body, applicantName, status } = await request.json()

    // For demonstration, we'll log the email
    // In production, integrate with an email service
    console.log('Email Notification:')
    console.log('To:', to)
    console.log('Subject:', subject)
    console.log('Body:', body)

    // Example integration with email service (commented out)
    /*
    // Using SendGrid example:
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    
    const msg = {
      to,
      from: process.env.EMAIL_FROM || 'noreply@rise4impact.org',
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(to right, #10b981, #14b8a6); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">Rise for Impact</h1>
          </div>
          <div style="padding: 30px; background: #f9fafb;">
            <h2 style="color: #10b981;">Application Status Update</h2>
            <p>Dear ${applicantName},</p>
            <p>${body}</p>
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0;"><strong>New Status:</strong> 
                <span style="background: ${status === 'approved' ? '#10b981' : '#ef4444'}; 
                             color: white; 
                             padding: 5px 15px; 
                             border-radius: 20px;">
                  ${status.toUpperCase()}
                </span>
              </p>
            </div>
            <p>If you have any questions, please don't hesitate to contact us.</p>
            <p>Best regards,<br>The Rise for Impact Team</p>
          </div>
          <div style="background: #1f2937; padding: 20px; text-align: center; color: #9ca3af;">
            <p style="margin: 0;">© ${new Date().getFullYear()} Rise for Impact. All rights reserved.</p>
          </div>
        </div>
      `,
    }
    
    await sgMail.send(msg)
    */

    return NextResponse.json({
      success: true,
      message: 'Email notification sent successfully',
      demo: true,
      details: {
        to,
        subject,
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Email notification error:', error)
    return NextResponse.json(
      { error: 'Failed to send email notification' },
      { status: 500 }
    )
  }
}
