import { PageWithNav } from '@/components/layout/page-with-nav'
import { FileText, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function ReportsPage() {
  return (
    <PageWithNav>
      <main className="min-h-screen bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950 py-24">
        <div className="container max-w-5xl mx-auto px-4">
          {/* Back Button */}
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Centered Content */}
          <div className="flex flex-col items-center justify-center text-center">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm mb-8 shadow-lg shadow-purple-500/20">
              <FileText className="w-12 h-12 text-purple-400" />
            </div>

            {/* Header */}
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 max-w-3xl">
              Annual Reports
            </h1>
            <p className="text-lg text-dark-300 max-w-2xl mb-12">
              Transparency and accountability in our impact journey
            </p>

            {/* Content Card - Centered */}
            <div className="w-full max-w-3xl glass-card p-10 md:p-16 rounded-3xl">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <FileText className="w-10 h-10 text-purple-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">First Report Coming in 2026</h2>
              <p className="text-lg text-dark-200 leading-relaxed mb-8">
                Our inaugural annual report will be published in 2026, documenting our impact, financials, key achievements, and lessons learned from our first full year of operations.
              </p>
              
              {/* Info Grid */}
              <div className="grid md:grid-cols-2 gap-4 mt-8 pt-8 border-t border-dark-700">
                <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-700">
                  <div className="text-2xl font-bold text-purple-400 mb-2">2026</div>
                  <div className="text-sm text-dark-300">First Report</div>
                </div>
                <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-700">
                  <div className="text-2xl font-bold text-emerald-400 mb-2">Annual</div>
                  <div className="text-sm text-dark-300">Publication</div>
                </div>
              </div>

              {/* Subscribe CTA */}
              <div className="mt-8 pt-8 border-t border-dark-700">
                <p className="text-dark-300 text-sm mb-4">
                  Subscribe to our newsletter to be notified when reports are available
                </p>
                <Link href="/#newsletter" className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-xl transition-all">
                  Subscribe to Updates
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </PageWithNav>
  )
}
