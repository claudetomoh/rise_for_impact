/**
 * Environment Variable Validation
 * 
 * This file validates all required environment variables at startup
 * to prevent runtime errors due to missing configuration.
 * 
 * @see .env.example for required variables
 */

import { z } from 'zod'

const envSchema = z.object({
  // Database - Required
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  DIRECT_URL: z.string().min(1, 'DIRECT_URL is required for migrations'),
  
  // NextAuth - Required
  NEXTAUTH_SECRET: z.string().min(32, 'NEXTAUTH_SECRET must be at least 32 characters'),
  NEXTAUTH_URL: z.string().url('NEXTAUTH_URL must be a valid URL'),
  
  // Email Service - Required
  RESEND_API_KEY: z.string().regex(/^re_/, 'RESEND_API_KEY must start with "re_"'),
  RESEND_FROM_EMAIL: z.string().email('RESEND_FROM_EMAIL must be a valid email').optional().default('admin@riseforimpact.org'),
  CONTACT_EMAIL: z.string().email('CONTACT_EMAIL must be a valid email'),
  
  // Node Environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
})

export type Env = z.infer<typeof envSchema>

/**
 * Validates environment variables and throws descriptive errors if validation fails
 * Call this once at application startup
 */
export function validateEnv(): Env {
  const parsed = envSchema.safeParse(process.env)
  
  if (!parsed.success) {
    console.error('❌ Environment variable validation failed:')
    console.error(parsed.error.flatten().fieldErrors)
    
    throw new Error(
      `Missing or invalid environment variables:\n${
        Object.entries(parsed.error.flatten().fieldErrors)
          .map(([key, errors]) => `  - ${key}: ${errors?.join(', ')}`)
          .join('\n')
      }`
    )
  }
  
  return parsed.data
}

/**
 * Get validated environment variables
 * Use this instead of process.env for type safety
 */
export const env = validateEnv()

/**
 * Check if running in production
 */
export const isProduction = env.NODE_ENV === 'production'

/**
 * Check if running in development
 */
export const isDevelopment = env.NODE_ENV === 'development'
