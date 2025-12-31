'use client'

import { Toaster } from 'sonner'

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: '#1F2937',
          color: '#F9FAFB',
          border: '1px solid #374151',
        },
        className: 'toast',
        duration: 4000,
      }}
      richColors
    />
  )
}
