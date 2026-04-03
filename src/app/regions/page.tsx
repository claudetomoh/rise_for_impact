import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Globe, ArrowRight, CheckCircle, Sparkles } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/sections/footer'

export const metadata: Metadata = {
  title: 'Where We Work | Rise for Impact',
  description: 'Rise for Impact operates across Cameroon, Ghana, Nigeria, and Rwanda — with country coordinators, campus clubs, and active youth programming in each country.',
}

const countries = [
  {
    name: 'Cameroon',
    flag: '🇨🇲',
    status: 'Headquarters',
    statusColor: 'bg-primary-500/20 text-primary-400 border-primary-500/30',
    coordinator: 'Nawal Chefton',
    coordinatorImage: '/images/team/Nawal.JPG',
    color: 'from-primary-500 to-primary-600',
    border: 'border-primary-500/20',
    glow: 'from-primary-500/10',
    description: 'Our founding country and operational headquarters. Home to the largest concentration of programming — flagship sessions, LinkedIn workshops, and two active regional coordinators covering the Northwest and Southwest.',
    highlights: [
      'Organisation headquarters',
      'Northwest & Southwest regional coordinators',
      'Multiple flagship sessions delivered',
      'Active campus ambassador network',
    ],
    regionalCoordinators: [
      { name: 'Chafor Ramson Njoyue', region: 'Northwest', image: '/images/team/Ramson.jpeg' },
      { name: 'Neh Valerie', region: 'Southwest', image: '/images/team/Neh-Valerie.jpeg' },
    ],
  },
  {
    name: 'Ghana',
    flag: '🇬🇭',
    status: 'Active',
    statusColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    coordinator: 'Akurugu Princess',
    coordinatorImage: '/images/team/Princess.jpg',
    color: 'from-emerald-500 to-teal-600',
    border: 'border-emerald-500/20',
    glow: 'from-emerald-500/10',
    description: 'Active programming with a strong focus on LinkedIn career skills and professional development. Country coordinator in place driving youth engagement across Ghanaian universities.',
    highlights: [
      'LinkedIn optimisation workshops delivered',
      '200+ direct workshop participants',
      'University engagement ongoing',
      'Opportunity sharing community active',
    ],
    regionalCoordinators: [],
  },
  {
    name: 'Nigeria',
    flag: '🇳🇬',
    status: 'Active',
    statusColor: 'bg-accent-500/20 text-accent-400 border-accent-500/30',
    coordinator: 'Kareen Ajatitton',
    coordinatorImage: '/images/team/Kareen.jpg',
    color: 'from-accent-500 to-orange-600',
    border: 'border-accent-500/20',
    glow: 'from-accent-500/10',
    description: 'Flagship sessions delivered and a growing community of engaged young professionals. Country coordinator active in tech and innovation-focused youth programming.',
    highlights: [
      'Flagship sessions delivered',
      'Tech & innovation focus',
      'Growing digital community',
      'Opportunities curation ongoing',
    ],
    regionalCoordinators: [],
  },
  {
    name: 'Rwanda',
    flag: '🇷🇼',
    status: 'Active',
    statusColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    coordinator: 'Regine Niyorukundo',
    coordinatorImage: "/images/team/Regine's pic.jpg",
    color: 'from-blue-500 to-indigo-600',
    border: 'border-blue-500/20',
    glow: 'from-blue-500/10',
    description: "Country coordinator in place and community expanding. Education and civic engagement programming being developed with a focus on Rwanda's youth leadership ecosystem.",
    highlights: [
      'Country coordinator active',
      'Education & civic labs focus',
      'Community engagement building',
      'Fellowship applicants from Rwanda',
    ],
    regionalCoordinators: [],
  },
]

const stats = [
  { value: '4', label: 'Active Countries', sub: 'Cameroon · Ghana · Nigeria · Rwanda' },
  { value: '500+', label: 'Youth Engaged', sub: 'Across all 2025 programming' },
  { value: '4', label: 'Flagship Sessions', sub: 'In-person and digital' },
  { value: '6', label: 'Country & Regional Leads', sub: 'On the ground in each country' },
]

export default function RegionsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-dark-950">

        {/* Hero */}
        <section className="relative pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0">
            <img src="/images/backgrounds/Togetherness.jpg" alt="" className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-b from-dark-950/75 via-dark-950/70 to-dark-950" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(34,197,94,0.12),transparent_55%)]" />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:3rem_3rem]" />
          <div className="container-premium relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/25 mb-6">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400 tracking-widest uppercase">Where We Work</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-5 leading-tight">
              Four countries.<br />
              <span className="text-gradient">One mission.</span>
            </h1>
            <p className="text-xl text-dark-200 max-w-2xl leading-relaxed">
              Rise for Impact operates across Cameroon, Ghana, Nigeria, and Rwanda — with dedicated
              country coordinators and active youth programming in each.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-white/5 bg-dark-900/60 backdrop-blur-sm">
          <div className="container-premium">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
              {stats.map((s) => (
                <div key={s.label} className="py-10 px-6 text-center group">
                  <div className="text-4xl md:text-5xl font-display font-black text-white mb-2 group-hover:text-primary-400 transition-colors">{s.value}</div>
                  <div className="text-sm text-dark-200 font-semibold">{s.label}</div>
                  <div className="text-xs text-dark-500 mt-1">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Country cards */}
        <section className="container-premium py-20 space-y-10">
          {countries.map((country) => (
            <div key={country.name} id={country.name.toLowerCase()} className={`scroll-mt-24 rounded-3xl border ${country.border} bg-dark-900/60 overflow-hidden`}>
              {/* Header */}
              <div className={`relative px-8 py-6 bg-gradient-to-r ${country.glow} to-transparent border-b ${country.border}`}>
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="text-5xl">{country.flag}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap mb-1">
                      <h2 className="text-3xl font-display font-bold text-white">{country.name}</h2>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${country.statusColor}`}>{country.status}</span>
                    </div>
                    <p className="text-dark-300 text-sm">Country Coordinator: <span className="text-white font-medium">{country.coordinator}</span></p>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-8 grid md:grid-cols-5 gap-10">
                <div className="md:col-span-3 space-y-6">
                  <p className="text-dark-200 leading-relaxed">{country.description}</p>
                  <ul className="space-y-2.5">
                    {country.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-3 text-sm text-dark-300">
                        <CheckCircle className="w-4 h-4 flex-shrink-0 text-primary-400" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="md:col-span-2 space-y-5">
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-dark-800/60 border border-white/6">
                    <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-dark-700">
                      <Image src={country.coordinatorImage} alt={country.coordinator} width={56} height={56} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">{country.coordinator}</div>
                      <div className="text-dark-400 text-xs mt-0.5">Country Coordinator · {country.name}</div>
                    </div>
                  </div>
                  {country.regionalCoordinators.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-xs font-semibold text-dark-400 uppercase tracking-wider">Regional Coordinators</p>
                      {country.regionalCoordinators.map((rc) => (
                        <div key={rc.name} className="flex items-center gap-3 p-3.5 rounded-xl bg-dark-800/40 border border-white/5">
                          <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-dark-700">
                            <Image src={rc.image} alt={rc.name} width={40} height={40} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <div className="text-white text-sm font-medium">{rc.name}</div>
                            <div className="text-dark-500 text-xs">{rc.region} Region</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="container-premium pb-20">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0">
              <img src="/images/backgrounds/club-hero.jpeg" alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-dark-950/95 via-dark-900/90 to-dark-950/95" />
            </div>
            <div className="relative z-10 p-12 md:p-16 text-center">
              <Sparkles className="w-8 h-8 text-primary-400 mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">
                Want to connect in your country?
              </h2>
              <p className="text-dark-300 mb-8 max-w-xl mx-auto">
                Reach out to your country coordinator, apply to a programme, or explore open opportunities across all four countries.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/get-involved" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-white font-semibold transition-all text-sm shadow-lg shadow-primary-500/25">
                  Get Involved <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/programs" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/15 hover:bg-white/5 text-white font-semibold transition-all text-sm">
                  View Programmes
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
