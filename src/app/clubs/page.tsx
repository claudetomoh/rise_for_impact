import type { Metadata } from 'next'
import Link from 'next/link'
import { GraduationCap, ArrowRight, MapPin, Users, Star, CheckCircle } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/sections/footer'

export const metadata: Metadata = {
  title: 'University Clubs | Rise for Impact',
  description: 'Rise for Impact university clubs bring our mission to campuses across Cameroon, Ghana, Nigeria, and Rwanda — building leaders one chapter at a time.',
}

const clubs = [
  {
    university: 'University of Buea',
    country: 'Cameroon 🇨🇲',
    region: 'Southwest Region',
    status: 'Active',
    statusColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    image: '/images/backgrounds/buea-chapter.jpeg',
    highlights: ['Flagship sessions hosted', 'LinkedIn workshops delivered', 'Active ambassador network'],
  },
  {
    university: 'Academic City University',
    country: 'Ghana 🇬🇭',
    region: 'Greater Accra',
    status: 'Active',
    statusColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    image: '/images/backgrounds/academic-city-club.jpeg',
    highlights: ['LinkedIn optimisation workshops', '200+ student participants', 'Ongoing engagement'],
  },
]

const startSteps = [
  { step: '01', title: 'Express Interest', desc: 'Fill out the campus ambassador form via Get Involved.' },
  { step: '02', title: 'Connect with Coordinator', desc: 'Your country coordinator reviews your application and gets in touch.' },
  { step: '03', title: 'Orientation & Onboarding', desc: 'Complete the ambassador training and receive your club toolkit.' },
  { step: '04', title: 'Launch Your Chapter', desc: 'Host your first session and register your campus with Rise for Impact.' },
]

export default function ClubsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-dark-950">

        {/* Hero */}
        <section className="relative pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0">
            <img src="/images/backgrounds/club-hero.jpeg" alt="" className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-b from-dark-950/80 via-dark-950/75 to-dark-950" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.12),transparent_55%)]" />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:3rem_3rem]" />
          <div className="container-premium relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/25 mb-6">
              <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-xs font-semibold text-purple-400 tracking-widest uppercase">University Clubs</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-5 leading-tight">
              Rise for Impact<br />
              <span className="text-gradient">on Campus.</span>
            </h1>
            <p className="text-xl text-dark-200 max-w-2xl leading-relaxed">
              Campus chapters bringing our programmes, opportunities, and community to students across Africa.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-white/5 bg-dark-900/60 backdrop-blur-sm">
          <div className="container-premium">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
              {[
                { value: '2', label: 'Active Chapters', sub: 'Cameroon & Ghana' },
                { value: '4', label: 'Target Countries', sub: 'Expanding across all regions' },
                { value: '200+', label: 'Students Reached', sub: 'Through club programming' },
                { value: '2026', label: 'Expansion Year', sub: 'New cohorts launching' },
              ].map((s) => (
                <div key={s.label} className="py-10 px-6 text-center group">
                  <div className="text-4xl md:text-5xl font-display font-black text-white mb-2 group-hover:text-purple-400 transition-colors">{s.value}</div>
                  <div className="text-sm text-dark-200 font-semibold">{s.label}</div>
                  <div className="text-xs text-dark-500 mt-1">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Active Clubs */}
        <section className="container-premium py-20">
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
              <Star className="w-3 h-3 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Active Chapters</span>
            </div>
            <h2 className="text-3xl font-display font-bold text-white">Our Current Clubs</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {clubs.map((club) => (
              <div key={club.university} className="rounded-3xl overflow-hidden bg-dark-900/60 border border-white/8 hover:-translate-y-1 transition-transform duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img src={club.image} alt={club.university} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${club.statusColor}`}>{club.status}</span>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-display font-bold text-white">{club.university}</h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-dark-400" />
                      <span className="text-sm text-dark-400">{club.region} &middot; {club.country}</span>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {club.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-sm text-dark-300">
                        <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 text-emerald-400" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How to Start a Club */}
        <section className="container-premium pb-20">
          <div className="rounded-3xl bg-dark-900/60 border border-purple-500/15 overflow-hidden">
            <div className="p-10 md:p-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
                <Users className="w-3 h-3 text-purple-400" />
                <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Start a Chapter</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">Bring Rise for Impact to your campus</h2>
              <p className="text-dark-300 mb-10 max-w-xl">
                Any motivated student at a university in our active countries can apply to become a campus ambassador and launch a chapter.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {startSteps.map((s) => (
                  <div key={s.step} className="space-y-3">
                    <div className="text-3xl font-display font-black text-purple-500/40">{s.step}</div>
                    <h3 className="text-white font-semibold text-sm">{s.title}</h3>
                    <p className="text-dark-400 text-xs leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
              <Link href="/get-involved" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-semibold transition-all text-sm shadow-lg shadow-purple-500/25">
                Apply to Start a Club <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
