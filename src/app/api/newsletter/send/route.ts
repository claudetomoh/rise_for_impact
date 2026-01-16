import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { prisma } from '@/lib/prisma'
import { env } from '@/lib/env'

console.log('📧 Newsletter send route loaded')
console.log('RESEND_API_KEY at module load:', !!env.RESEND_API_KEY)
console.log('RESEND_FROM_EMAIL at module load:', env.RESEND_FROM_EMAIL)

export const dynamic = 'force-dynamic'

const resend = new Resend(env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    console.log('=== Newsletter Send Request ===')
    console.log('FROM_EMAIL:', env.RESEND_FROM_EMAIL)

    const { subject, content, recipients } = await request.json()
    console.log('Subject:', subject)
    console.log('Recipients count:', recipients?.length || 0)

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

    // Send individual emails to protect privacy
    let sentCount = 0
    const errors: Array<{ index: number; email: string; error: string }> = []

    for (let i = 0; i < targetEmails.length; i++) {
      const recipientEmail = targetEmails[i]
      try {
        console.log(`Sending email ${i + 1}/${targetEmails.length} to ${recipientEmail} from ${env.RESEND_FROM_EMAIL}`)
        
        const result = await resend.emails.send({
          from: `Rise for Impact <${env.RESEND_FROM_EMAIL}>`,
          replyTo: env.CONTACT_EMAIL,
          to: [recipientEmail],
          subject,
          text: `
Rise for Impact - ${subject}

Hello ${recipientEmail.split('@')[0]},

${content.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim()}

---

🚀 Ready to Make an Impact?

Join thousands of young African leaders building the future.

Get Involved: https://riseforimpact.org/get-involved
View Opportunities: https://riseforimpact.org/opportunities

---

Rise for Impact
Empowering 10,000+ African Youth Leaders Across 8+ Countries

Connect with Us:
Facebook: https://www.facebook.com/share/1JfWk4ekUR/?mibextid=wwXIfr
LinkedIn: https://www.linkedin.com/company/rise-for-impact

📧 info@riseforimpact.org
📱 +233 538 034 157 • +237 673 031 205
🌐 https://riseforimpact.org

You're receiving this because you subscribed to Rise for Impact newsletters.
Unsubscribe: https://riseforimpact.org/unsubscribe
Privacy Policy: https://riseforimpact.org/privacy

© ${new Date().getFullYear()} Rise for Impact. All Rights Reserved.
BUILDING AFRICA'S FUTURE
          `.trim(),
          html: `
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <title>${subject}</title>
                <style>
                  body {
                    margin: 0;
                    padding: 0;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
                    -webkit-text-size-adjust: 100%;
                    -ms-text-size-adjust: 100%;
                  }
                  table {
                    border-collapse: collapse;
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                  }
                  img {
                    border: 0;
                    height: auto;
                    line-height: 100%;
                    outline: none;
                    text-decoration: none;
                    -ms-interpolation-mode: bicubic;
                  }
                  a {
                    text-decoration: none;
                  }
                  @media only screen and (max-width: 600px) {
                    .mobile-padding {
                      padding: 20px !important;
                    }
                    .mobile-text {
                      font-size: 15px !important;
                    }
                  }
                </style>
              </head>
              <body style="margin: 0; padding: 0; background-color: #f3f4f6;">
                
                <!-- Preheader -->
                <div style="display: none; max-height: 0; overflow: hidden;">
                  ${subject} - Rise for Impact Newsletter
                </div>
                
                <!-- Wrapper Table -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f3f4f6; padding: 30px 0;">
                  <tr>
                    <td align="center">
                      
                      <!-- Main Container -->
                      <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background-color: #ffffff;">
                        
                        <!-- Header -->
                        <tr>
                          <td style="background-color: #10b981; padding: 40px 30px; text-align: center;">
                            
                            <!-- Logo -->
                            <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin-bottom: 20px;">
                              <tr>
                                <td>
                                  <img src="https://riseforimpact.org/images/logo.jpeg" alt="Rise for Impact" width="100" height="100" style="display: block; width: 100px; height: 100px; border-radius: 16px; border: 3px solid #ffffff;" />
                                </td>
                              </tr>
                            </table>
                            
                            <!-- Brand Name -->
                            <h1 style="color: #ffffff; font-size: 32px; font-weight: bold; margin: 0 0 10px 0; line-height: 1.2;">
                              Rise for Impact
                            </h1>
                            
                            <!-- Divider -->
                            <table width="60" cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 15px auto;">
                              <tr>
                                <td style="border-bottom: 2px solid #ffffff; opacity: 0.7;"></td>
                              </tr>
                            </table>
                            
                            <!-- Tagline -->
                            <p style="color: #ffffff; font-size: 16px; font-weight: 500; margin: 0; line-height: 1.5;">
                              Empowering Africa's Next Generation of Leaders
                            </p>
                            
                            <!-- Social Icons -->
                            <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin-top: 20px;">
                              <tr>
                                <td style="padding: 0 10px;">
                                  <a href="https://www.facebook.com/share/1JfWk4ekUR/?mibextid=wwXIfr" style="display: inline-block; width: 40px; height: 40px; background-color: rgba(255, 255, 255, 0.2); border-radius: 8px; text-align: center; line-height: 40px; color: #ffffff; font-size: 20px; font-weight: bold;">
                                    f
                                  </a>
                                </td>
                                <td style="padding: 0 10px;">
                                  <a href="https://www.linkedin.com/company/rise-for-impact" style="display: inline-block; width: 40px; height: 40px; background-color: rgba(255, 255, 255, 0.2); border-radius: 8px; text-align: center; line-height: 40px; color: #ffffff; font-size: 20px; font-weight: bold;">
                                    in
                                  </a>
                                </td>
                              </tr>
                            </table>
                            
                          </td>
                        </tr>

                        <!-- Main Content -->
                        <tr>
                          <td class="mobile-padding" style="padding: 40px 35px; background-color: #ffffff;">
                            <div class="mobile-text" style="color: #374151; font-size: 16px; line-height: 1.7;">
                              ${content}
                            </div>
                          </td>
                        </tr>

                        <!-- CTA Section -->
                        <tr>
                          <td style="background-color: #059669; padding: 40px 30px; text-align: center;">
                            
                            <!-- Emoji -->
                            <div style="font-size: 48px; margin-bottom: 20px;">🚀</div>
                            
                            <!-- Heading -->
                            <h2 style="color: #ffffff; font-size: 26px; font-weight: bold; margin: 0 0 15px 0; line-height: 1.3;">
                              Ready to Make an Impact?
                            </h2>
                            
                            <!-- Description -->
                            <p style="color: #ffffff; font-size: 15px; margin: 0 0 25px 0; line-height: 1.6; opacity: 0.95;">
                              Join thousands of young African leaders building the future.<br/>
                              Apply for programs, volunteer opportunities, and be part of something extraordinary.
                            </p>
                            
                            <!-- CTA Buttons -->
                            <table cellpadding="0" cellspacing="0" border="0" align="center">
                              <tr>
                                <td style="padding: 8px;">
                                  <a href="https://riseforimpact.org/get-involved" style="display: inline-block; padding: 14px 35px; background-color: #ffffff; color: #059669; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 15px;">
                                    Get Involved
                                  </a>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 8px;">
                                  <a href="https://riseforimpact.org/opportunities" style="display: inline-block; padding: 12px 30px; background-color: transparent; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px; border: 2px solid #ffffff;">
                                    View Opportunities
                                  </a>
                                </td>
                              </tr>
                            </table>
                            
                          </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                          <td style="background-color: #1f2937; padding: 40px 30px; text-align: center;">
                            
                            <!-- Footer Logo -->
                            <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin-bottom: 20px;">
                              <tr>
                                <td>
                                  <img src="https://riseforimpact.org/images/logo.jpeg" alt="Rise for Impact" width="70" height="70" style="display: block; width: 70px; height: 70px; border-radius: 12px; border: 2px solid #10b981;" />
                                </td>
                              </tr>
                            </table>
                            
                            <!-- Brand Name -->
                            <h3 style="color: #10b981; font-size: 20px; font-weight: bold; margin: 0 0 10px 0;">
                              Rise for Impact
                            </h3>
                            
                            <!-- Mission -->
                            <p style="color: #9ca3af; font-size: 14px; margin: 0 0 25px 0; line-height: 1.6;">
                              Empowering <strong style="color: #10b981;">10,000+</strong> African Youth Leaders<br/>
                              Across <strong style="color: #10b981;">8+</strong> Countries
                            </p>

                            <!-- Divider -->
                            <table width="100" cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 0 auto 25px;">
                              <tr>
                                <td style="border-bottom: 1px solid #374151;"></td>
                              </tr>
                            </table>

                            <!-- Social Links -->
                            <p style="color: #d1d5db; font-size: 14px; margin: 0 0 15px 0; font-weight: bold;">
                              Connect with Us
                            </p>
                            
                            <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin-bottom: 25px;">
                              <tr>
                                <td style="padding: 0 8px;">
                                  <a href="https://www.facebook.com/share/1JfWk4ekUR/?mibextid=wwXIfr" style="display: inline-block; padding: 10px 18px; background-color: #374151; color: #10b981; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 13px;">
                                    Facebook
                                  </a>
                                </td>
                                <td style="padding: 0 8px;">
                                  <a href="https://www.linkedin.com/company/rise-for-impact" style="display: inline-block; padding: 10px 18px; background-color: #374151; color: #10b981; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 13px;">
                                    LinkedIn
                                  </a>
                                </td>
                              </tr>
                            </table>

                            <!-- Contact Info -->
                            <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 25px 0;">
                              <tr>
                                <td style="color: #6b7280; font-size: 13px; line-height: 2;">
                                  
                                  <div style="margin: 8px 0;">
                                    📧 <a href="mailto:info@riseforimpact.org" style="color: #10b981; text-decoration: none; font-weight: 600;">info@riseforimpact.org</a>
                                  </div>
                                  
                                  <div style="margin: 8px 0; color: #9ca3af;">
                                    📱 +233 538 034 157 • +237 673 031 205
                                  </div>
                                  
                                  <div style="margin: 8px 0;">
                                    🌐 <a href="https://riseforimpact.org" style="color: #10b981; text-decoration: none; font-weight: 600;">riseforimpact.org</a>
                                  </div>
                                  
                                </td>
                              </tr>
                            </table>

                            <!-- Divider -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 30px 0 20px 0;">
                              <tr>
                                <td style="border-bottom: 1px solid #374151;"></td>
                              </tr>
                            </table>

                            <!-- Legal -->
                            <p style="color: #6b7280; font-size: 12px; line-height: 1.8; margin: 15px 0;">
                              You're receiving this because you subscribed to Rise for Impact newsletters.<br/>
                              <a href="https://riseforimpact.org/unsubscribe" style="color: #10b981; text-decoration: none; font-weight: 600;">Unsubscribe</a>
                              <span style="color: #4b5563;"> • </span>
                              <a href="https://riseforimpact.org/privacy" style="color: #10b981; text-decoration: none; font-weight: 600;">Privacy Policy</a>
                              <span style="color: #4b5563;"> • </span>
                              <a href="https://riseforimpact.org/terms" style="color: #10b981; text-decoration: none; font-weight: 600;">Terms</a>
                            </p>
                            
                            <!-- Copyright -->
                            <p style="color: #6b7280; font-size: 11px; margin: 15px 0 0 0; font-weight: 600;">
                              © ${new Date().getFullYear()} Rise for Impact. All Rights Reserved.
                            </p>
                            
                            <!-- Badge -->
                            <div style="margin-top: 15px;">
                              <span style="display: inline-block; padding: 6px 14px; background-color: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; border-radius: 20px; color: #10b981; font-size: 10px; font-weight: bold; letter-spacing: 0.5px;">
                                BUILDING AFRICA'S FUTURE
                              </span>
                            </div>
                            
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

        console.log('Resend API Response:', JSON.stringify(result, null, 2))

        if ((result as any)?.error) {
          console.error('Resend Error:', (result as any).error)
          errors.push({ index: i + 1, email: recipientEmail, error: `Resend error: ${JSON.stringify((result as any).error)}` })
        } else {
          console.log(`✓ Email ${i + 1} sent successfully to ${recipientEmail}`)
          sentCount++
        }
      } catch (error) {
        console.error(`✗ Email ${i + 1} to ${recipientEmail} failed:`, error)
        errors.push({ index: i + 1, email: recipientEmail, error: String(error) })
      }
    }

    console.log(`Newsletter sending complete: ${sentCount}/${targetEmails.length} sent individually, ${errors.length} errors`)

    if (errors.length > 0) {
      return NextResponse.json(
        { error: 'Some emails failed to send', sent: sentCount, total: targetEmails.length, errors },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, sent: sentCount, total: targetEmails.length })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send newsletter' }, { status: 500 })
  }
}
