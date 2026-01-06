import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Find user by email
    const user = await prisma.admin.findUnique({
      where: { email: email.toLowerCase() },
    })

    // Always return success to prevent email enumeration
    // Don't reveal whether the email exists or not
    if (!user) {
      return NextResponse.json({ 
        success: true,
        message: 'If that email exists, we sent a password reset link' 
      })
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour from now

    // Save token to database
    await prisma.admin.update({
      where: { email: email.toLowerCase() },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    })

    // Create reset URL
    const resetUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/admin/reset-password?token=${resetToken}`

    // Send email using Resend (or your email service)
    // For now, we'll log the URL (in production, send actual email)
    if (process.env.NODE_ENV === 'development') {
      console.log('Password Reset URL:', resetUrl)
      console.log('This link expires in 1 hour')
    }

    // TODO: Send actual email in production
    // Example with Resend:
    /*
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'Rise for Impact <noreply@riseforimpact.org>',
      to: email,
      subject: 'Reset Your Password - Rise for Impact',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #059669;">Reset Your Password</h2>
          <p>You requested to reset your password for your Rise for Impact admin account.</p>
          <p>Click the button below to reset your password:</p>
          <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #059669; color: white; text-decoration: none; border-radius: 6px; margin: 16px 0;">Reset Password</a>
          <p style="color: #666; font-size: 14px;">This link will expire in 1 hour.</p>
          <p style="color: #666; font-size: 14px;">If you didn't request this, you can safely ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
          <p style="color: #999; font-size: 12px;">Rise for Impact - Transforming Lives Across Africa</p>
        </div>
      `,
    })
    */

    return NextResponse.json({ 
      success: true,
      message: 'Password reset email sent',
      // Remove in production:
      ...(process.env.NODE_ENV === 'development' && { resetUrl })
    })

  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
