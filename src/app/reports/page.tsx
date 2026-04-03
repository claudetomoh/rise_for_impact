import type { Metadata } from 'next'
import Link from 'next/link'
import { FileText, ArrowRight, Calendar, BarChart2, BookOpen } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/sections/footer'

export const metadata: Metadata = {
  title: 'Annual Reports | Rise for Impact',
  description: 'Transparency and accountability in our impact journey. Rise for Impact annual reports document our delivery, finances, and lessons learned.',
}

export default function ReportsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-dark-950">

        {/* Hero */}
        <section className="relative pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0">
            <img src="/images/backgrounds/impact.jpeg" alt="" className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-b from-dark-950/85 via-dark-950/80 to-dark-950" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(139,92,246,0.10),transparent_55%)]" />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:3rem_3rem]" />
          <div className="container-premium relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/25 mb-6">
              <FileText className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-xs font-semibold text-purple-400 tracking-widest uppercase">Annual Reports</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-5 leading-tight">
              Transparent,<br />
              <span className="text-gradient">accountable.</span>
            </h1>
            <p className="text-xl text-dark-200 max-w-2xl leading-relaxed">
              Our annual reports document what we delivered, what we spent, and what we learned — without inflation.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="container-premium py-20">
          <div className="max-w-3xl mx-auto">
            <div className="rounded-3xl bg-dark-900/60 border border-purple-500/15 p-10 md:p-14 text-center space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto">
                <BookOpen className="w-7 h-7 text-purple-400" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">First Report Coming in 2026</h2>
                <p className="text-dark-300 leading-relaxed max-w-lg mx-auto">
                  Our inaugural annual report will be published in 2026, documenting our impact, financials, key achievements, and lessons learned from our first full year of operations.
                </p>
              </div>
              <div className="grid sm:grid-cols-3 gap-5 text-left">
                {[
                  { icon: Calendar, label: 'Publication', value: '2026', sub: 'First annual report' },
                  { icon: BarChart2, label: 'Coverage', value: '2025', sub: 'Full year of operations' },
                  { icon: FileText, label: 'Format', value: 'PDF + Web', sub: 'Downloadable & readable online' },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="p-5 rounded-2xl bg-dark-800/60 border border-white/6 space-y-2">
                      <Icon className="w-5 h-5 text-purple-400" />
                      <div className="text-white text-xl font-display font-bold">{item.value}</div>
                      <div className="text-dark-300 text-xs font-semibold">{item.label}</div>
                      <div className="text-dark-500 text-xs">{item.sub}</div>
                    </div>
                  )
                })}
              </div>
              <div className="pt-6 border-t border-white/6 space-y-4">
                <p className="text-dark-400 text-sm">Subscribe to our newsletter to be notified when reports become available.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/#newsletter" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-semibold transition-all text-sm shadow-lg shadow-purple-500/25">
                    Subscribe to Updates <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link href="/impact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/15 hover:bg-white/5 text-white font-semibold transition-all text-sm">
                    View 2025 Impact Data
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
