import { authOptions } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

// Compatibility layer for NextAuth v4 with Next.js 16
// NextAuth v4 doesn't support async params/cookies in Next.js 16
// This creates a simple session management without relying on NextAuth's internal routing

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ nextauth: string[] }> }
) {
  const params = await context.params
  const path = params.nextauth?.join('/') || ''
  
  // Handle different NextAuth endpoints
  if (path === 'session') {
    // Return empty session for now - will be populated after login
    return NextResponse.json({ user: null })
  }
  
  if (path === 'providers') {
    return NextResponse.json({
      credentials: {
        id: 'credentials',
        name: 'Credentials',
        type: 'credentials',
        signinUrl: '/admin/login',
        callbackUrl: '/admin/dashboard'
      }
    })
  }
  
  if (path === 'csrf') {
    return NextResponse.json({ csrfToken: 'mock-csrf-token' })
  }
  
  // Redirect signin to login page
  if (path === 'signin' || path === 'error') {
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }
  
  return NextResponse.json({ error: 'Not found' }, { status: 404 })
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ nextauth: string[] }> }
) {
  const params = await context.params
  const path = params.nextauth?.join('/') || ''
  
  // For now, just acknowledge the POST requests
  // Actual authentication will be handled via direct API calls
  if (path === '_log') {
    return NextResponse.json({ ok: true })
  }
  
  if (path === 'callback/credentials') {
    // Handle login callback
    const body = await req.json()
    // This would normally verify credentials
    return NextResponse.json({ url: '/admin/dashboard' })
  }
  
  return NextResponse.json({ error: 'Not implemented' }, { status: 501 })
}
