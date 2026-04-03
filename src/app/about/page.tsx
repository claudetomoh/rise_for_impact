import type { Metadata } from 'next'
import Link from 'next/link'
import { Target, Eye, Heart, Lightbulb, Users, Globe, ArrowRight, CheckCircle } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/sections/footer'

export const metadata: Metadata = {
  title: 'About Us | Rise for Impact',
  description: 'Rise for Impact is a youth-focused social initiative founded in 2025 to help young people access opportunities, practical skills, and supportive networks across Cameroon, Ghana, Nigeria, and Rwanda.',
}

const coreValues = [
  {
    icon: Lightbulb,
    title: 'Credibility',
    description: 'We say what we can prove and prove what we say. Every number, claim, and programme on this platform reflects real, documented work.',
    color: 'from-yellow-500 to-yellow-600',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
    text: 'text-yellow-400',
  },
  {
    icon: Users,
    title: 'Access',
    description: 'Information should not be luck-based. We actively lower the barriers that prevent young people from reaching opportunities they deserve.',
    color: 'from-primary-500 to-primary-600',
    bg: 'bg-primary-500/10',
    border: 'border-primary-500/20',
    text: 'text-primary-400',
  },
  {
    icon: Globe,
    title: 'Collaboration',
    description: 'We build with communities, not for them. Local coordinators, peer networks, and partners are co-architects of everything we do.',
    color: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    text: 'text-blue-400',
  },
  {
    icon: Target,
    title: 'Action Over Words',
    description: 'We measure success in real outcomes: youth connected to opportunities, skills developed, and local leadership capacity strengthened.',
    color: 'from-red-500 to-red-600',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    text: 'text-red-400',
  },
]

const timeline = [
  { year: '2025', event: 'Rise for Impact founded', detail: 'Organisation launched with a focus on youth opportunity access across Cameroon, Ghana, Nigeria, and Rwanda.' },
  { year: '2025', event: 'First flagship sessions', detail: '4 flagship speaker sessions delivered — 60+ participants per session across our four active countries.' },
  { year: '2025', event: 'LinkedIn optimisation workshops', detail: 'Delivered 2 dedicated LinkedIn career sessions reaching 200+ youth participants.' },
  { year: '2025', event: '500+ youth engaged', detail: 'Reached over 500 young people through combined digital and in-person programming in year one.' },
  { year: '2026', event: 'Fellowship & new cohorts', detail: 'Rise for Impact Fellowship applications open February 2026. Campus Ambassadors cohorts planned throughout the year.' },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-dark-950 pt-24 pb-20">

        {/* Hero */}
        <section className="container-premium py-16">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6">
              <span className="text-xs font-medium text-primary-400 tracking-wide uppercase">Who We Are</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
              About <span className="text-gradient">Rise for Impact</span>
            </h1>
            <p className="text-xl text-dark-200 leading-relaxed max-w-2xl">
              A youth-focused social initiative connecting young Africans to real opportunities, 
              practical skills, and leadership pathways.
            </p>
          </div>
        </section>

        {/* Who We Are */}
        <section className="container-premium py-12">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-display font-bold text-white">Our Story</h2>
              </div>
              <div className="space-y-4 text-dark-200 leading-relaxed">
                <p>
                  <span className="text-white font-semibold">Rise for Impact</span> is a youth-focused social initiative
                  founded in 2025 to help young people access opportunities, strengthen their leadership and
                  professional skills, and grow within a supportive community.
                </p>
                <p>
                  Since its launch, the organisation has combined digital engagement and in-person programming
                  to connect youth to training, mentorship conversations, leadership development sessions, and
                  curated opportunities for personal and professional growth.
                </p>
                <p>
                  Our early work has included <span className="text-primary-400 font-medium">flagship speaker sessions</span>,{' '}
                  <span className="text-accent-400 font-medium">community workshops</span>,{' '}
                  <span className="text-blue-400 font-medium">LinkedIn optimisation training</span>, opportunity
                  sharing, and student engagement activities across Cameroon, Ghana, Nigeria, and Rwanda.
                </p>
                <p className="text-primary-400 font-medium italic border-l-2 border-primary-500/40 pl-4">
                  A growing organisation building credible systems, stronger partnerships, and measurable outcomes over time.
                </p>
              </div>
            </div>

            {/* Quick facts */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-dark-400 uppercase tracking-wider mb-6">At a Glance</h3>
              {[
                { label: 'Founded', value: '2025' },
                { label: 'Type', value: 'Youth-focused social initiative' },
                { label: 'Active countries', value: 'Cameroon, Ghana, Nigeria & Rwanda' },
                { label: 'Youth engaged (2025)', value: '500+' },
                { label: 'Flagship sessions delivered', value: '4' },
                { label: 'Workshop participants', value: '200+' },
              ].map((fact) => (
                <div key={fact.label} className="flex items-center justify-between py-3 border-b border-white/5">
                  <span className="text-dark-400 text-sm">{fact.label}</span>
                  <span className="text-white font-semibold text-sm">{fact.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="container-premium py-12">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="rounded-2xl bg-gradient-to-br from-primary-500/10 to-accent-500/5 border border-primary-500/20 p-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-semibold text-primary-400 uppercase tracking-wider">Mission</span>
              </div>
              <h2 className="text-2xl font-display font-bold text-white">Our Mission</h2>
              <p className="text-dark-200 leading-relaxed">
                To equip young people with access to opportunities, practical skills, and supportive
                networks that help them grow into education, employment, and leadership pathways.
              </p>
              <p className="text-sm text-dark-400 italic pt-2 border-t border-white/5">
                "We help young people move from aspiration to access."
              </p>
            </div>

            {/* Vision */}
            <div className="rounded-2xl bg-gradient-to-br from-accent-500/10 to-blue-500/5 border border-accent-500/20 p-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-accent-500 to-accent-600">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-semibold text-accent-400 uppercase tracking-wider">Vision</span>
              </div>
              <h2 className="text-2xl font-display font-bold text-white">Our Vision</h2>
              <p className="text-dark-200 leading-relaxed">
                To build a trusted platform that helps thousands of young people across Africa
                access structured opportunities and develop the confidence, skills, and leadership
                capacity to create change in their communities.
              </p>
              <p className="text-sm text-dark-400 italic pt-2 border-t border-white/5">
                Intentional, honest, and built to last.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="container-premium py-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display font-bold text-white mb-3">Our Core Values</h2>
            <p className="text-dark-400 max-w-xl mx-auto">The principles that guide everything we do.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value) => {
              const Icon = value.icon
              return (
                <div key={value.title} className={`rounded-2xl ${value.bg} border ${value.border} p-6 space-y-4`}>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className={`text-lg font-bold ${value.text}`}>{value.title}</h3>
                  <p className="text-sm text-dark-300 leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Timeline */}
        <section className="container-premium py-12">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-display font-bold text-white mb-10">Our Journey</h2>
            <div className="relative space-y-0">
              <div className="absolute left-4 top-4 bottom-4 w-px bg-gradient-to-b from-primary-500/50 via-accent-500/30 to-transparent" />
              {timeline.map((item, i) => (
                <div key={i} className="relative flex gap-6 pb-8 last:pb-0">
                  <div className="relative z-10 flex-shrink-0 w-8 h-8 mt-1 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 pt-0.5">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-bold text-primary-400 bg-primary-500/10 px-2 py-0.5 rounded-full">{item.year}</span>
                      <h4 className="text-white font-semibold">{item.event}</h4>
                    </div>
                    <p className="text-sm text-dark-300 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container-premium pt-6">
          <div className="rounded-3xl bg-gradient-to-br from-primary-900/40 via-dark-900/60 to-accent-900/30 border border-primary-500/15 p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">Ready to engage?</h2>
            <p className="text-dark-300 mb-8 max-w-xl mx-auto">
              Whether you're a young person, an organisation, or a potential partner — there's a place for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/get-involved"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold transition-colors text-sm"
              >
                Get Involved <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/team"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-white font-semibold transition-colors text-sm"
              >
                Meet Our Team
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
