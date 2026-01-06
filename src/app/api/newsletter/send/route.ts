import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { prisma } from '@/lib/prisma'

console.log('📧 Newsletter send route loaded')
console.log('RESEND_API_KEY at module load:', !!process.env.RESEND_API_KEY)
console.log('RESEND_FROM_EMAIL at module load:', process.env.RESEND_FROM_EMAIL)

export const dynamic = 'force-dynamic'

const resendApiKey = process.env.RESEND_API_KEY
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'admin@riseforimpact.org'
const resend = resendApiKey ? new Resend(resendApiKey) : null

export async function POST(request: Request) {
  try {
    console.log('=== Newsletter Send Request ===')
    console.log('RESEND_API_KEY exists:', !!resendApiKey)
    console.log('FROM_EMAIL:', FROM_EMAIL)
    console.log('Resend client initialized:', !!resend)
    
    if (!resend) {
      console.error('ERROR: Resend client not initialized - missing API key')
      return NextResponse.json(
        { error: 'RESEND_API_KEY is not configured.' },
        { status: 500 }
      )
    }

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
        console.log(`Sending email ${i + 1}/${targetEmails.length} to ${recipientEmail} from ${FROM_EMAIL}`)
        
        const result = await resend.emails.send({
          from: `Rise for Impact <${FROM_EMAIL}>`,
          to: [recipientEmail],
          subject,
          replyTo: 'info@riseforimpact.org',
          html: `
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta name="x-apple-disable-message-reformatting">
                <meta name="format-detection" content="telephone=no,date=no,address=no,email=no">
                <title>${subject}</title>
                <!--[if mso]>
                <noscript>
                  <xml>
                    <o:OfficeDocumentSettings>
                      <o:PixelsPerInch>96</o:PixelsPerInch>
                    </o:OfficeDocumentSettings>
                  </xml>
                </noscript>
                <![endif]-->
                <style>
                  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
                  
                  * { margin: 0; padding: 0; box-sizing: border-box; }
                  
                  body { 
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif; 
                    line-height: 1.6;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                  }
                  
                  .btn { 
                    display: inline-block; 
                    padding: 16px 40px; 
                    text-decoration: none; 
                    border-radius: 12px; 
                    font-weight: 700; 
                    font-size: 16px; 
                    text-align: center;
                    transition: all 0.3s ease; 
                    box-shadow: 0 6px 20px rgba(16, 185, 129, 0.35);
                  }
                  
                  .btn-primary { 
                    background: linear-gradient(135deg, #10b981 0%, #059669 100%); 
                    color: #ffffff !important; 
                  }
                  
                  .btn-white {
                    background: #ffffff;
                    color: #059669 !important;
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
                  }
                  
                  @media only screen and (max-width: 600px) {
                    .mobile-padding { padding: 24px !important; }
                    .mobile-text { font-size: 15px !important; line-height: 1.7 !important; }
                    .mobile-heading { font-size: 26px !important; line-height: 1.3 !important; }
                    .mobile-subheading { font-size: 20px !important; }
                    .mobile-logo { width: 90px !important; height: 90px !important; }
                    .mobile-hide { display: none !important; }
                    .mobile-center { text-align: center !important; }
                    .btn { padding: 14px 32px !important; font-size: 15px !important; }
                  }
                </style>
              </head>
              <body style="margin: 0; padding: 0; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); font-family: 'Inter', sans-serif;">
                
                <!-- Preheader Text (Hidden but shown in email preview) -->
                <div style="display: none; max-height: 0; overflow: hidden; mso-hide: all;">
                  ${subject} - Rise for Impact Newsletter
                </div>
                
                <!-- Wrapper -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 40px 20px;">
                  <tr>
                    <td align="center">
                      
                      <!-- Main Container -->
                      <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background: linear-gradient(135deg, #1e293b 0%, #334155 100%); border-radius: 24px; overflow: hidden; box-shadow: 0 25px 70px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.05);">
                        
                        <!-- ========== PREMIUM HEADER ========== -->
                        <tr>
                          <td style="background: linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%); padding: 0; position: relative; overflow: hidden;">
                            
                            <!-- Decorative Pattern Overlay -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                              <tr>
                                <td style="background-image: radial-gradient(circle at 20% 30%, rgba(255,255,255,0.15) 0%, transparent 60%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.1) 0%, transparent 50%); padding: 45px 40px; text-align: center;">
                                  
                                  <!-- Logo Container with Glow Effect -->
                                  <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin-bottom: 24px;">
                                    <tr>
                                      <td align="center">
                                        <div style="position: relative; display: inline-block;">
                                          <img src="https://riseforimpact.org/images/logo.jpeg" alt="Rise for Impact" width="110" height="110" class="mobile-logo" style="width: 110px; height: 110px; max-width: 110px; border-radius: 22px; box-shadow: 0 12px 35px rgba(0, 0, 0, 0.4), 0 0 0 4px rgba(255, 255, 255, 0.2); object-fit: cover; display: block; border: 4px solid rgba(255, 255, 255, 0.3); margin: 0 auto;" />
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                  
                                  <!-- Brand Name with Premium Typography -->
                                  <h1 class="mobile-heading" style="color: #ffffff; font-size: 36px; font-weight: 900; margin: 0 0 12px 0; text-shadow: 0 3px 12px rgba(0, 0, 0, 0.3); letter-spacing: -0.8px; line-height: 1.2;">
                                    Rise for Impact
                                  </h1>
                                  
                                  <!-- Tagline with Visual Separator -->
                                  <div style="width: 60px; height: 3px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent); margin: 0 auto 16px; border-radius: 2px;"></div>
                                  
                                  <p style="color: rgba(255, 255, 255, 0.98); font-size: 17px; font-weight: 600; margin: 0 0 28px 0; letter-spacing: 0.3px; line-height: 1.5; text-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);">
                                    Empowering Africa's Next Generation of Leaders
                                  </p>
                                  
                                  <!-- Social Media Icons with Premium Styling -->
                                  <table cellpadding="0" cellspacing="0" border="0" align="center">
                                    <tr>
                                      <td style="padding: 0 6px;">
                                        <a href="https://www.facebook.com/profile.php?id=61566754234783" style="display: inline-block; width: 44px; height: 44px; background: rgba(255, 255, 255, 0.25); border-radius: 12px; text-align: center; text-decoration: none; backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.3); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); padding: 10px;">
                                          <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'/%3E%3C/svg%3E" alt="Facebook" width="24" height="24" style="display: block; width: 24px; height: 24px; max-width: 24px; margin: 0 auto;" />
                                        </a>
                                      </td>
                                      <td style="padding: 0 6px;">
                                        <a href="https://www.linkedin.com/company/rise-for-impact" style="display: inline-block; width: 44px; height: 44px; background: rgba(255, 255, 255, 0.25); border-radius: 12px; text-align: center; text-decoration: none; backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.3); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); padding: 10px;">
                                          <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'/%3E%3C/svg%3E" alt="LinkedIn" width="24" height="24" style="display: block; width: 24px; height: 24px; max-width: 24px; margin: 0 auto;" />
                                        </a>
                                      </td>
                                    </tr>
                                  </table>
                                  
                                </td>
                              </tr>
                            </table>
                            
                          </td>
                        </tr>

                        <!-- ========== MAIN CONTENT AREA ========== -->
                        <tr>
                          <td class="mobile-padding" style="padding: 55px 45px; background: linear-gradient(180deg, #1e293b 0%, #334155 100%);">
                            
                            <!-- Content Wrapper with Premium Styling -->
                            <div class="mobile-text" style="color: #e2e8f0; font-size: 16.5px; line-height: 1.8; font-weight: 400;">
                              ${content}
                            <!-- Content Wrapper with Premium Styling -->
                            <div class="mobile-text" style="color: #e2e8f0; font-size: 16.5px; line-height: 1.8; font-weight: 400;">
                              ${content}
                            </div>
                          </td>
                        </tr>

                        <!-- ========== PREMIUM CTA SECTION ========== -->
                        <tr>
                          <td style="padding: 0; position: relative; overflow: hidden;">
                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                              <tr>
                                <td style="background: linear-gradient(135deg, #059669 0%, #047857 50%, #065f46 100%); padding: 50px 40px; text-align: center; position: relative;">
                                  
                                  <!-- Decorative Background Pattern -->
                                  <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: radial-gradient(circle at 70% 30%, rgba(255,255,255,0.08) 0%, transparent 50%), radial-gradient(circle at 30% 80%, rgba(255,255,255,0.06) 0%, transparent 60%);"></div>
                                  
                                  <!-- Content -->
                                  <div style="position: relative; z-index: 1;">
                                    
                                    <!-- Icon/Emoji -->
                                    <div style="margin-bottom: 20px;">
                                      <span style="font-size: 48px; display: inline-block; filter: drop-shadow(0 4px 12px rgba(0,0,0,0.2));">🚀</span>
                                    </div>
                                    
                                    <h2 class="mobile-subheading" style="color: #ffffff; font-size: 28px; font-weight: 800; margin: 0 0 16px 0; line-height: 1.3; letter-spacing: -0.5px;">
                                      Ready to Make an Impact?
                                    </h2>
                                    
                                    <p style="color: rgba(255, 255, 255, 0.95); font-size: 16px; font-weight: 500; margin: 0 0 30px 0; line-height: 1.6; max-width: 480px; margin-left: auto; margin-right: auto;">
                                      Join thousands of young African leaders building the future. Apply for programs, volunteer opportunities, and be part of something extraordinary.
                                    </p>
                                    
                                    <!-- CTA Buttons -->
                                    <table cellpadding="0" cellspacing="0" border="0" align="center">
                                      <tr>
                                        <td style="padding: 8px;">
                                          <a href="https://riseforimpact.org/get-involved" class="btn btn-white" style="display: inline-block; padding: 16px 40px; background: #ffffff; color: #059669 !important; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 16px; box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);">
                                            Get Involved
                                          </a>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td style="padding: 8px;">
                                          <a href="https://riseforimpact.org/opportunities" style="display: inline-block; padding: 14px 36px; background: rgba(255, 255, 255, 0.15); color: #ffffff !important; text-decoration: none; border-radius: 12px; font-weight: 600; font-size: 15px; border: 2px solid rgba(255, 255, 255, 0.3); backdrop-filter: blur(10px);">
                                            View Opportunities
                                          </a>
                                        </td>
                                      </tr>
                                    </table>
                                    
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>

                        <!-- ========== PREMIUM FOOTER ========== -->
                        <tr>
                          <td style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 50px 40px 40px; text-align: center; border-top: 1px solid rgba(16, 185, 129, 0.2);">
                            
                            <!-- Footer Logo -->
                            <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin-bottom: 24px;">
                              <tr>
                                <td align="center">
                                  <img src="https://riseforimpact.org/images/logo.jpeg" alt="Rise for Impact" width="75" height="75" style="width: 75px; height: 75px; max-width: 75px; border-radius: 16px; object-fit: cover; display: block; box-shadow: 0 6px 20px rgba(16, 185, 129, 0.25); border: 3px solid rgba(16, 185, 129, 0.3); margin: 0 auto;" />
                                </td>
                              </tr>
                            </table>
                            
                            <!-- Organization Name -->
                            <h3 style="color: #10b981; font-size: 22px; font-weight: 800; margin: 0 0 12px 0; letter-spacing: -0.3px;">
                              Rise for Impact
                            </h3>
                            
                            <!-- Mission Statement -->
                            <p style="color: #94a3b8; font-size: 15px; line-height: 1.7; margin: 0 0 28px 0; font-weight: 500; max-width: 500px; margin-left: auto; margin-right: auto;">
                              Empowering <strong style="color: #10b981;">10,000+</strong> African Youth Leaders Across <strong style="color: #10b981;">8+</strong> Countries
                            </p>

                            <!-- Decorative Divider -->
                            <div style="width: 80px; height: 2px; background: linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.5), transparent); margin: 0 auto 28px; border-radius: 2px;"></div>

                            <!-- Social Media Section -->
                            <p style="color: #cbd5e1; font-size: 15px; margin: 0 0 18px 0; font-weight: 700; letter-spacing: 0.5px;">
                              Connect with Us
                            </p>
                            
                            <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin-bottom: 32px;">
                              <tr>
                                <td style="padding: 0 8px;">
                                  <a href="https://www.facebook.com/profile.php?id=61566754234783" style="display: inline-block; padding: 12px 20px; background: linear-gradient(135deg, #1e293b 0%, #334155 100%); border-radius: 11px; text-decoration: none; color: #10b981; font-weight: 700; font-size: 14px; border: 1px solid rgba(16, 185, 129, 0.3); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); vertical-align: middle;">
                                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2310b981'%3E%3Cpath d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'/%3E%3C/svg%3E" alt="" width="16" height="16" style="display: inline-block; width: 16px; height: 16px; max-width: 16px; vertical-align: middle; margin-right: 8px;" />
                                    <span style="vertical-align: middle;">Facebook</span>
                                  </a>
                                </td>
                                <td style="padding: 0 8px;">
                                  <a href="https://www.linkedin.com/company/rise-for-impact" style="display: inline-block; padding: 12px 20px; background: linear-gradient(135deg, #1e293b 0%, #334155 100%); border-radius: 11px; text-decoration: none; color: #10b981; font-weight: 700; font-size: 14px; border: 1px solid rgba(16, 185, 129, 0.3); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); vertical-align: middle;">
                                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2310b981'%3E%3Cpath d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'/%3E%3C/svg%3E" alt="" width="16" height="16" style="display: inline-block; width: 16px; height: 16px; max-width: 16px; vertical-align: middle; margin-right: 8px;" />
                                    <span style="vertical-align: middle;">LinkedIn</span>
                                  </a>
                                </td>
                              </tr>
                            </table>

                            <!-- Contact Information with Icons -->
                            <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 32px 0;">
                              <tr>
                                <td style="color: #64748b; font-size: 14px; line-height: 2.2; text-align: center;">
                                  
                                  <!-- Email -->
                                  <div style="margin: 10px 0;">
                                    <table cellpadding="0" cellspacing="0" border="0" align="center">
                                      <tr>
                                        <td style="padding-right: 8px;">
                                          <span style="font-size: 16px;">📧</span>
                                        </td>
                                        <td>
                                          <a href="mailto:info@riseforimpact.org" style="color: #10b981; text-decoration: none; font-weight: 600; font-size: 14px;">
                                            info@riseforimpact.org
                                          </a>
                                        </td>
                                      </tr>
                                    </table>
                                  </div>
                                  
                                  <!-- Phone Numbers -->
                                  <div style="margin: 10px 0;">
                                    <span style="font-size: 16px;">📱</span>
                                    <span style="color: #94a3b8; font-weight: 500; font-size: 14px; margin-left: 8px;">+233 538 034 157</span>
                                    <span style="color: #64748b; font-size: 14px; margin: 0 8px;">•</span>
                                    <span style="color: #94a3b8; font-weight: 500; font-size: 14px;">+237 673 031 205</span>
                                  </div>
                                  
                                  <!-- Website -->
                                  <div style="margin: 10px 0;">
                                    <table cellpadding="0" cellspacing="0" border="0" align="center">
                                      <tr>
                                        <td style="padding-right: 8px;">
                                          <span style="font-size: 16px;">🌐</span>
                                        </td>
                                        <td>
                                          <a href="https://riseforimpact.org" style="color: #10b981; text-decoration: none; font-weight: 600; font-size: 14px;">
                                            riseforimpact.org
                                          </a>
                                        </td>
                                      </tr>
                                    </table>
                                  </div>
                                  
                                </td>
                              </tr>
                            </table>

                            <!-- Premium Divider -->
                            <div style="height: 1px; background: linear-gradient(90deg, transparent, rgba(100, 116, 139, 0.3), transparent); margin: 35px 0;"></div>

                            <!-- Unsubscribe & Legal Links -->
                            <p style="color: #64748b; font-size: 13px; line-height: 2; margin: 20px 0 15px 0; font-weight: 500;">
                              You're receiving this because you subscribed to Rise for Impact newsletters.<br/>
                              <a href="https://riseforimpact.org/unsubscribe" style="color: #10b981; text-decoration: none; font-weight: 600;">Unsubscribe</a>
                              <span style="color: #475569; margin: 0 8px;">•</span>
                              <a href="https://riseforimpact.org/privacy" style="color: #10b981; text-decoration: none; font-weight: 600;">Privacy Policy</a>
                              <span style="color: #475569; margin: 0 8px;">•</span>
                              <a href="https://riseforimpact.org/terms" style="color: #10b981; text-decoration: none; font-weight: 600;">Terms</a>
                            </p>
                            
                            <!-- Copyright -->
                            <p style="color: #475569; font-size: 12px; margin: 15px 0 0 0; font-weight: 600; letter-spacing: 0.3px;">
                              © ${new Date().getFullYear()} Rise for Impact. All Rights Reserved.
                            </p>
                            
                            <!-- Brand Badge -->
                            <div style="margin-top: 20px;">
                              <span style="display: inline-block; padding: 8px 16px; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 20px; color: #10b981; font-size: 11px; font-weight: 700; letter-spacing: 0.5px;">
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
