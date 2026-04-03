import type { Metadata } from 'next'
import Link from 'next/link'
import { BarChart3, Users, MapPin, Calendar, ArrowRight, CheckCircle, TrendingUp, Lightbulb, Star, Globe } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/sections/footer'
import { PrintButton } from '@/components/ui/print-button'

export const metadata: Metadata = {
  title: 'Our Impact | Rise for Impact',
  description: 'Rise for Impact 2025 impact report — 500+ youth engaged, 4 flagship sessions, 200+ workshop participants across Cameroon, Ghana, Nigeria, and Rwanda.',
}

const keyStats = [
  {
    value: '500+',
    label: 'Youth Engaged',
    detail: 'Across all 2025 programming — in-person and digital',
    icon: Users,
    color: 'from-primary-500 to-primary-600',
    bg: 'bg-primary-500/10',
    border: 'border-primary-500/20',
    text: 'text-primary-400',
  },
  {
    value: '4',
    label: 'Flagship Sessions Delivered',
    detail: '60+ participants per session on average',
    icon: Star,
    color: 'from-accent-500 to-accent-600',
    bg: 'bg-accent-500/10',
    border: 'border-accent-500/20',
    text: 'text-accent-400',
  },
  {
    value: '200+',
    label: 'Workshop Participants',
    detail: 'LinkedIn optimisation and professional skills sessions',
    icon: Lightbulb,
    color: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    text: 'text-blue-400',
  },
  {
    value: '4',
    label: 'Active Countries',
    detail: 'Cameroon, Ghana, Nigeria & Rwanda — with verified on-the-ground work',
    icon: Globe,
    color: 'from-emerald-500 to-emerald-600',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    text: 'text-emerald-400',
  },
]

const programHighlights = [
  {
    program: 'Flagship Speaker Sessions',
    what: 'High-impact sessions bringing expert speakers to engage youth on leadership, career development, and social impact.',
    result: '4 sessions delivered. 60+ participants per session. Positive participant feedback collected.',
    countries: ['Cameroon', 'Ghana', 'Nigeria'],
    color: 'border-primary-500/30',
    tag: 'text-primary-400',
  },
  {
    program: 'LinkedIn Optimisation Workshops',
    what: 'Practical workshops teaching young professionals to build strong LinkedIn profiles and position themselves for opportunities.',
    result: '2 dedicated sessions. 200+ youth participants. Focus on professional visibility and career access.',
    countries: ['Cameroon', 'Ghana'],
    color: 'border-accent-500/30',
    tag: 'text-accent-400',
  },
  {
    program: 'Opportunity Sharing & Curation',
    what: 'Regular sharing of vetted fellowships, scholarships, grants, and leadership programmes through digital channels.',
    result: 'Ongoing. Hundreds of opportunities shared with our community across all three countries.',
    countries: ['Cameroon', 'Ghana', 'Nigeria'],
    color: 'border-blue-500/30',
    tag: 'text-blue-400',
  },
  {
    program: 'Student Engagement & Campus Activities',
    what: 'Direct engagement with university students through clubs, ambassador programmes, and campus events.',
    result: 'Active campus chapters and ambassador relationships being formalised in 2026.',
    countries: ['Cameroon', 'Ghana'],
    color: 'border-emerald-500/30',
    tag: 'text-emerald-400',
  },
]

const whatsNext = [
  { item: 'Rise for Impact Fellowship — first cohort, applications open February 2026' },
  { item: 'Campus Ambassadors Programme — cohorts in January, June, August & December 2026' },
  { item: 'Rise Circles — peer leadership circles launching Q2 2026' },
  { item: 'Expanded Opportunity Plug partnerships with verified external organisations' },
  { item: 'Impact Clinics — structured community project programme opening soon' },
]

export default function ImpactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-dark-950 pt-24 pb-20">

        {/* Hero */}
        <section className="container-premium py-16">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-medium text-emerald-400 tracking-wide uppercase">2025 Annual Impact</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
              Real numbers.<br />
              <span className="text-gradient">Honest impact.</span>
            </h1>
            <p className="text-xl text-dark-200 leading-relaxed max-w-2xl mb-4">
              This is what Rise for Impact delivered in its first year of operation — verified, 
              documented, and reported without inflation.
            </p>
            <p className="text-sm text-dark-400 max-w-xl">
              We believe credibility is more valuable than magnitude at this stage. These numbers represent 
              real young people reached through real programming.
            </p>
            <PrintButton />
          </div>
        </section>

        {/* Key stats */}
        <section className="container-premium py-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyStats.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className={`rounded-2xl ${stat.bg} border ${stat.border} p-7 space-y-3`}>
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className={`text-4xl font-display font-bold ${stat.text}`}>{stat.value}</div>
                  <div className="text-white font-semibold text-sm leading-snug">{stat.label}</div>
                  <div className="text-dark-400 text-xs leading-relaxed">{stat.detail}</div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Programme highlights */}
        <section className="container-premium py-12">
          <div className="mb-8">
            <h2 className="text-2xl font-display font-bold text-white mb-2">Programme Highlights</h2>
            <p className="text-dark-400 text-sm">What we ran, what we delivered, and where.</p>
          </div>
          <div className="space-y-5">
            {programHighlights.map((p) => (
              <div key={p.program} className={`rounded-2xl bg-dark-900/60 border ${p.color} p-6 md:p-8`}>
                <div className="md:flex md:gap-8">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-lg font-bold text-white">{p.program}</h3>
                      <div className="flex gap-1.5 flex-wrap">
                        {p.countries.map((c) => (
                          <span key={c} className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-dark-300 flex items-center gap-1">
                            <MapPin className="w-2.5 h-2.5" />{c}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-dark-300 text-sm leading-relaxed">{p.what}</p>
                  </div>
                  <div className="mt-4 md:mt-0 md:w-64 flex-shrink-0">
                    <div className={`text-xs font-semibold uppercase tracking-wider ${p.tag} mb-2 flex items-center gap-1.5`}>
                      <TrendingUp className="w-3.5 h-3.5" /> Result
                    </div>
                    <p className="text-sm text-dark-200 leading-relaxed">{p.result}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Geographic presence */}
        <section className="container-premium py-12">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { country: 'Cameroon', flag: '🇨🇲', detail: 'Headquarters country. Northwest & Southwest regional coordinators. Multiple flagship sessions delivered.', status: 'Most active' },
              { country: 'Ghana', flag: '🇬🇭', detail: 'Active programming including LinkedIn workshops and opportunity sharing. Country coordinator in place.', status: 'Active' },
              { country: 'Nigeria', flag: '🇳🇬', detail: 'Flagship sessions delivered. Country coordinator active. Growing community.', status: 'Active' },
              { country: 'Rwanda', flag: '🇷🇼', detail: 'Country coordinator in place. Expanding community and programme engagement.', status: 'Active' },
            ].map((country) => (
              <div key={country.country} className="rounded-2xl bg-dark-900/60 border border-white/8 p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{country.flag}</span>
                  <div>
                    <h3 className="text-lg font-bold text-white">{country.country}</h3>
                    <span className="text-xs text-emerald-400 font-medium">{country.status}</span>
                  </div>
                </div>
                <p className="text-sm text-dark-300 leading-relaxed">{country.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What's next */}
        <section className="container-premium py-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-8">
              <Calendar className="w-5 h-5 text-primary-400" />
              <h2 className="text-2xl font-display font-bold text-white">What's Coming in 2026</h2>
            </div>
            <div className="space-y-3">
              {whatsNext.map((n, i) => (
                <div key={i} className="flex items-start gap-3 py-3 border-b border-white/5 last:border-0">
                  <CheckCircle className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                  <p className="text-dark-200 text-sm leading-relaxed">{n.item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container-premium pt-6">
          <div className="rounded-3xl bg-gradient-to-br from-emerald-900/30 via-dark-900/60 to-primary-900/30 border border-emerald-500/15 p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">Work with us</h2>
            <p className="text-dark-300 mb-8 max-w-xl mx-auto">
              If you're a funder, partner, or organisation interested in what we're building — we'd love to connect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/partners"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors text-sm"
              >
                Partner With Us <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-white font-semibold transition-colors text-sm"
              >
                View Our Programs
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
