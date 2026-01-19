import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

/**
 * NextAuth handler for authentication
 * Handles all /api/auth/* routes including:
 * - /api/auth/signin
 * - /api/auth/signout
 * - /api/auth/session
 * - /api/auth/providers
 * - /api/auth/callback/*
 */
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
