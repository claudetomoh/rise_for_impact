import { AdminProviders } from '@/components/providers/admin-providers'
import { ReactNode } from 'react'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminProviders>
      {children}
    </AdminProviders>
  )
}
