'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-900 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-red-500/10 flex items-center justify-center">
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </div>
        
        <div className="space-y-3">
          <h1 className="text-3xl font-display font-bold text-white">
            Something went wrong!
          </h1>
          <p className="text-dark-300">
            We encountered an unexpected error. Don't worry, our team has been notified.
          </p>
          {error.digest && (
            <p className="text-sm text-dark-500">Error ID: {error.digest}</p>
          )}
        </div>

        <div className="flex gap-4 justify-center">
          <Button
            variant="primary"
            onClick={reset}
          >
            Try Again
          </Button>
          <Button
            variant="outline"
            onClick={() => window.location.href = '/'}
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  )
}
