import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/sections/footer'
import { Team } from '@/components/sections/team'

export const metadata: Metadata = {
  title: 'Our Team | Rise for Impact',
  description: 'Meet the executive board, team coordinators, and country leaders behind Rise for Impact — the people driving youth opportunity access across Cameroon, Ghana, Nigeria, and Rwanda.',
}

export default function TeamPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-dark-950 pt-24">

        {/* Page header */}
        <section className="container-premium py-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6">
            <span className="text-xs font-medium text-primary-400 tracking-wide uppercase">Behind Rise for Impact</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-5">
            Meet the <span className="text-gradient">Team</span>
          </h1>
          <p className="text-xl text-dark-300 max-w-2xl mx-auto leading-relaxed mb-6">
            Our executive board, team coordinators, and country leaders work together to connect 
            young people to opportunities across Cameroon, Ghana, Nigeria, and Rwanda.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/get-involved"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold transition-colors text-sm"
            >
              Join the Team <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-white font-semibold transition-colors text-sm"
            >
              About the Organisation
            </Link>
          </div>
        </section>

        {/* Team section component */}
        <Team />

      </main>
      <Footer />
    </>
  )
}
