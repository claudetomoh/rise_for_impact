import { PageWithNav } from '@/components/layout/page-with-nav'
import { Handshake, Building2, Globe, Mail, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function PartnersPage() {
  return (
    <PageWithNav>
      <main className="min-h-screen bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950 py-24">
        <div className="container max-w-5xl mx-auto px-4">
          {/* Back Button */}
          <Link href="/" className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm mb-6 shadow-lg">
              <Handshake className="w-10 h-10 text-blue-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Our Partners
            </h1>
            <p className="text-lg text-dark-300 max-w-2xl mx-auto">
              Building strategic partnerships to amplify youth impact across Africa
            </p>
          </div>

          {/* Content */}
          <div className="space-y-12">
            {/* Partnership Types */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 hover:border-blue-500/50 transition-all">
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Corporate Partners</h3>
                <p className="text-sm text-dark-300">Supporting our programs through funding and resources</p>
              </div>

              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 hover:border-emerald-500/50 transition-all">
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <Globe className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">University Partners</h3>
                <p className="text-sm text-dark-300">Hosting campus clubs and providing institutional support</p>
              </div>

              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-500/50 transition-all">
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Handshake className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">NGO Partners</h3>
                <p className="text-sm text-dark-300">Collaborating on shared impact initiatives</p>
              </div>
            </div>

            {/* Partnership Benefits */}
            <div className="pt-6 border-t border-dark-700">
              <h3 className="text-2xl font-bold text-white mb-6 font-display">Why Partner With Us?</h3>
              <div className="space-y-4">
                {[
                  'Access to a network of 10,000+ emerging African leaders',
                  'Visibility across 8+ African countries',
                  'Direct impact on youth development and community transformation',
                  'Co-creation opportunities for innovative programs',
                  'Regular impact reports and transparent communication',
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-400 text-sm font-bold">✓</span>
                    </div>
                    <p className="text-dark-200">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-6 border-t border-dark-700">
              <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-teal-500/20 border border-blue-500/30 text-center">
                <Mail className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">Interested in Partnering?</h3>
                <p className="text-dark-200 mb-6 max-w-2xl mx-auto">
                  We're building strategic partnerships with organizations committed to youth empowerment in Africa. Let's explore how we can collaborate.
                </p>
                <a
                  href="mailto:info@riseforimpact.org"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-blue-500/50"
                >
                  <Mail className="w-5 h-5" />
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </PageWithNav>
  )
}
