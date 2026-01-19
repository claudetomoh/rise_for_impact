import { AdminProviders } from '@/components/providers/admin-providers'
import AdminNav from '@/components/layout/admin-nav'
import { ReactNode } from 'react'

export default function AdminLayout({ children }: { children: ReactNode }) {
  // Authentication is handled by middleware only
  // Layout doesn't redirect to prevent loops with auth pages
  
  return (
    <AdminProviders>
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        <AdminNav />
        <main className="flex-1 overflow-y-auto lg:ml-64 pt-16 lg:pt-0">
          {children}
        </main>
      </div>
    </AdminProviders>
  )
}
