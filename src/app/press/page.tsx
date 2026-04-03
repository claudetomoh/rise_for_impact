import type { Metadata } from 'next'
import Link from 'next/link'
import { Newspaper, Mail, ArrowRight, FileText, Users, Globe } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/sections/footer'

export const metadata: Metadata = {
  title: 'Press Kit | Rise for Impact',
  description: 'Media resources, press contacts, and brand information for Rise for Impact — a pan-African youth social initiative active in Cameroon, Ghana, Nigeria, and Rwanda.',
}

const quickFacts = [
  { label: 'Founded', value: '2025' },
  { label: 'Type', value: 'Youth-focused social initiative' },
  { label: 'Active countries', value: 'Cameroon, Ghana, Nigeria & Rwanda' },
  { label: 'Youth engaged (2025)', value: '500+' },
  { label: 'Flagship sessions', value: '4 delivered' },
  { label: 'Workshop participants', value: '200+' },
]

const links = [
  { label: '2025 Impact Report', href: '/impact', icon: FileText, desc: 'Verified delivery data and programme highlights' },
  { label: 'Our Programmes', href: '/programs', icon: Globe, desc: 'Six programmes across four countries' },
  { label: 'Meet the Team', href: '/team', icon: Users, desc: 'Executive board, coordinators, and country leads' },
]

export default function PressPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-dark-950">

        {/* Hero */}
        <section className="relative pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0">
            <img src="/images/backgrounds/ClaudeMeeting1.jpeg" alt="" className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-b from-dark-950/85 via-dark-950/80 to-dark-950" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(99,102,241,0.10),transparent_55%)]" />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:3rem_3rem]" />
          <div className="container-premium relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/25 mb-6">
              <Newspaper className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-xs font-semibold text-indigo-400 tracking-widest uppercase">Press & Media</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-5 leading-tight">
              Press <span className="text-gradient">Kit</span>
            </h1>
            <p className="text-xl text-dark-200 max-w-2xl leading-relaxed">
              Resources, facts, and contacts for journalists, researchers, and media partners covering Rise for Impact.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="container-premium py-16">
          <div className="grid md:grid-cols-5 gap-10">

            {/* Left: Contact + facts */}
            <div className="md:col-span-2 space-y-8">
              {/* Contact */}
              <div className="rounded-2xl bg-dark-900/60 border border-white/8 p-6 space-y-4">
                <h2 className="text-lg font-display font-bold text-white">Media Inquiries</h2>
                <p className="text-dark-300 text-sm leading-relaxed">
                  For press inquiries, interviews, or media partnerships:
                </p>
                <a href="mailto:info@riseforimpact.org" className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors text-sm font-medium">
                  <Mail className="w-4 h-4" />
                  info@riseforimpact.org
                </a>
                <div className="pt-4 border-t border-white/6">
                  <p className="text-dark-500 text-xs italic">Brand guidelines and downloadable assets coming soon</p>
                </div>
              </div>

              {/* Quick facts */}
              <div className="rounded-2xl bg-dark-900/60 border border-white/8 p-6">
                <h2 className="text-sm font-semibold text-dark-400 uppercase tracking-wider mb-4">Quick Facts</h2>
                <div className="space-y-3">
                  {quickFacts.map((f) => (
                    <div key={f.label} className="flex items-start justify-between gap-4 py-2 border-b border-white/5 last:border-0">
                      <span className="text-dark-400 text-xs">{f.label}</span>
                      <span className="text-white text-xs font-semibold text-right">{f.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: About + links */}
            <div className="md:col-span-3 space-y-8">
              <div className="rounded-2xl bg-dark-900/60 border border-white/8 p-8 space-y-5">
                <h2 className="text-xl font-display font-bold text-white">About Rise for Impact</h2>
                <p className="text-dark-200 leading-relaxed text-sm">
                  Rise for Impact is a youth-focused social initiative founded in 2025, connecting young Africans
                  to opportunities, practical skills, and leadership pathways across Cameroon, Ghana, Nigeria, and Rwanda.
                </p>
                <p className="text-dark-200 leading-relaxed text-sm">
                  In its first year of operation, Rise for Impact delivered 4 flagship speaker sessions, LinkedIn
                  optimisation workshops reaching 200+ participants, and engaged over 500 young people through
                  combined digital and in-person programming.
                </p>
                <p className="text-dark-300 leading-relaxed text-sm italic border-l-2 border-primary-500/40 pl-4">
                  "We help young people move from aspiration to access."
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-sm font-semibold text-dark-400 uppercase tracking-wider">Further Reading</h2>
                {links.map((l) => {
                  const Icon = l.icon
                  return (
                    <Link key={l.href} href={l.href} className="flex items-center justify-between gap-4 p-4 rounded-xl bg-dark-900/40 border border-white/6 hover:bg-dark-800/60 hover:border-primary-500/20 group transition-all">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-primary-400" />
                        </div>
                        <div>
                          <div className="text-white text-sm font-semibold group-hover:text-primary-400 transition-colors">{l.label}</div>
                          <div className="text-dark-400 text-xs">{l.desc}</div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-dark-500 group-hover:text-primary-400 transition-colors flex-shrink-0" />
                    </Link>
                  )
                })}
              </div>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
