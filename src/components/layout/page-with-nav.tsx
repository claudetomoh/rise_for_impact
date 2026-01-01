import { ReactNode } from 'react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/sections/footer'

interface PageWithNavProps {
  children: ReactNode
}

export function PageWithNav({ children }: PageWithNavProps) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
