
'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">Error</h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Something went wrong!
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
          We're sorry, but something unexpected happened. Please try again or contact support if the problem persists.
        </p>
        <div className="space-x-4">
          <Button onClick={reset}>
            Try again
          </Button>
          <Button variant="outline" onClick={() => window.location.href = '/'}>
            Go Home
          </Button>
        </div>
      </div>
    </div>
  )
}
