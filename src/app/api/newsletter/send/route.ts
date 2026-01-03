import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

const resendApiKey = process.env.RESEND_API_KEY
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
const resend = resendApiKey ? new Resend(resendApiKey) : null

export async function POST(request: Request) {
  try {
    if (!resend) {
      return NextResponse.json(
        { error: 'RESEND_API_KEY is not configured.' },
        { status: 500 }
      )
    }

    const { subject, content, recipients } = await request.json()
    if (!subject || !content) {
      return NextResponse.json(
        { error: 'Subject and content are required' },
        { status: 400 }
      )
    }

    // Resolve recipients
    let targetEmails: string[] = []
    if (recipients && Array.isArray(recipients) && recipients.length > 0) {
      targetEmails = recipients
    } else {
      const subscribers = await prisma.newsletterSubscriber.findMany({
        where: { isActive: true },
      })
      targetEmails = subscribers.map((sub) => sub.email)
    }

    if (targetEmails.length === 0) {
      return NextResponse.json(
        { error: 'No recipients to send to' },
        { status: 400 }
      )
    }

    // Send in batches
    const batchSize = 50
    let sentCount = 0
    const errors: Array<{ batch: number; error: string }> = []

    for (let i = 0; i < targetEmails.length; i += batchSize) {
      const batchEmails = targetEmails.slice(i, i + batchSize)
      try {
        const result = await resend.emails.send({
          from: `Rise for Impact <${FROM_EMAIL}>`,
          to: batchEmails,
          subject,
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${subject}</title>
              </head>
              <body style="margin:0;padding:0;font-family:Arial,sans-serif;background-color:#f3f4f6;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3f4f6;padding:20px 0;">
                  <tr>
                    <td align="center">
                      <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
                        <tr>
                          <td style="background:linear-gradient(135deg,#22C55E 0%,#F59E0B 100%);padding:40px 30px;text-align:center;">
                            <h1 style="color:#ffffff;font-size:32px;margin:0;font-weight:bold;">Rise for Impact</h1>
                            <p style="color:#ffffff;font-size:14px;margin:10px 0 0 0;opacity:0.9;">Empowering African Youth Leaders</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:40px 30px;">
                            ${content}
                          </td>
                        </tr>
                        <tr>
                          <td style="background-color:#f9fafb;padding:30px;text-align:center;border-top:1px solid #e5e7eb;">
                            <p style="margin:0 0 15px 0;font-size:14px;color:#6b7280;">Follow us on social media</p>
                            <div style="margin:20px 0;">
                              <a href="https://linkedin.com/company/riseforimpact" style="display:inline-block;margin:0 10px;text-decoration:none;">
                                <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" width="32" height="32" style="display:block;" />
                              </a>
                              <a href="https://twitter.com/riseforimpact" style="display:inline-block;margin:0 10px;text-decoration:none;">
                                <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" width="32" height="32" style="display:block;" />
                              </a>
                              <a href="https://instagram.com/riseforimpact" style="display:inline-block;margin:0 10px;text-decoration:none;">
                                <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" width="32" height="32" style="display:block;" />
                              </a>
                            </div>
                            <p style="margin:20px 0 0 0;font-size:12px;color:#9ca3af;">
                              You're receiving this email because you subscribed to Rise for Impact newsletters.<br />
                              <a href="https://riseforimpact.org/unsubscribe" style="color:#22C55E;text-decoration:none;">Unsubscribe</a>
                            </p>
                            <p style="margin:10px 0 0 0;font-size:12px;color:#9ca3af;">© ${new Date().getFullYear()} Rise for Impact. All rights reserved.</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </body>
            </html>
          `,
        })

        // If Resend returns an error, capture it
        if ((result as any)?.error) {
          errors.push({ batch: i / batchSize + 1, error: String((result as any).error) })
        } else {
          sentCount += batchEmails.length
        }
      } catch (error) {
        errors.push({ batch: i / batchSize + 1, error: String(error) })
      }
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { error: 'Some batches failed', sent: sentCount, total: targetEmails.length, errors },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, sent: sentCount, total: targetEmails.length })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send newsletter' }, { status: 500 })
  }
}
