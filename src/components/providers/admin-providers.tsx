'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode, useEffect } from 'react'

export function AdminProviders({ children }: { children: ReactNode }) {
  // Suppress NextAuth client fetch errors in console
  useEffect(() => {
    const originalError = console.error
    console.error = (...args) => {
      if (
        typeof args[0] === 'string' &&
        (args[0].includes('[next-auth][error][CLIENT_FETCH_ERROR]') ||
         args[0].includes('Failed to execute \'json\' on \'Response\''))
      ) {
        return // Suppress this specific error
      }
      originalError.apply(console, args)
    }
    return () => {
      console.error = originalError
    }
  }, [])

  return (
    <SessionProvider
      refetchInterval={0}
      refetchOnWindowFocus={false}
      basePath="/api/auth"
    >
      {children}
    </SessionProvider>
  )
}
