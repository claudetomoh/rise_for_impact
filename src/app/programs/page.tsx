import type { Metadata } from 'next'
import Link from 'next/link'
import { Users, Sprout, Globe, Award, GraduationCap, Bookmark, ArrowRight, MapPin, Clock, Calendar, Sparkles } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/sections/footer'

export const metadata: Metadata = {
  title: 'Our Programs | Rise for Impact',
  description: 'Explore Rise for Impact programs — from peer leadership circles to climate action, fellowships, and campus ambassador initiatives across Cameroon, Ghana, Nigeria, and Rwanda.',
}

const programs = [
  {
    id: 'rise-circles',
    title: 'Rise Circles',
    tagline: 'Peer-led leadership development',
    description: 'Structured peer learning circles where young leaders collaborate, build skills, and develop essential leadership competencies over 3–6 months.',
    icon: Users,
    color: 'from-primary-500 to-primary-600',
    bgColor: 'bg-primary-500/10',
    borderColor: 'border-primary-500/20',
    iconColor: 'text-primary-400',
    duration: '3–6 months',
    frequency: 'Weekly meetings',
    locations: 'Cameroon, Ghana, Nigeria & Rwanda',
    status: 'Applications open Q2 2026',
    isOpen: false,
    image: '/images/backgrounds/ClubMeeting.jpeg',
    highlights: ['Monthly leadership workshops', 'Peer mentorship', 'Skill-building sessions', 'Community projects'],
  },
  {
    id: 'impact-clinics',
    title: 'Impact Clinics',
    tagline: 'Community problem-solving workshops',
    description: 'Hands-on workshops and structured sessions where youth identify local challenges and develop practical, evidence-based solutions with measurable outcomes.',
    icon: Sprout,
    color: 'from-accent-500 to-accent-600',
    bgColor: 'bg-accent-500/10',
    borderColor: 'border-accent-500/20',
    iconColor: 'text-accent-400',
    duration: '3–12 months',
    frequency: 'Project-based',
    locations: 'Cameroon, Ghana, Nigeria & Rwanda',
    status: 'Applications opening soon',
    isOpen: false,
    image: '/images/backgrounds/impact1.jpeg',
    highlights: ['Community needs assessment', 'Project design & planning', 'Implementation support', 'Impact measurement'],
  },
  {
    id: 'rise-for-climate',
    title: 'Rise for Climate',
    tagline: 'Youth-driven environmental action',
    description: 'Mobilising young people to take concrete climate action — from tree planting and environmental education to advocacy and sustainable practices training.',
    icon: Globe,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    iconColor: 'text-blue-400',
    duration: 'Ongoing',
    frequency: 'Monthly campaigns',
    locations: 'Cameroon, Ghana, Nigeria & Rwanda',
    status: 'Applications opening soon',
    isOpen: false,
    image: '/images/backgrounds/Togetherness.jpg',
    highlights: ['Climate education workshops', 'Tree planting campaigns', 'Advocacy training', 'Regional networking'],
  },
  {
    id: 'fellowship',
    title: 'Rise for Impact Fellowship',
    tagline: 'Leadership & impact development',
    description: 'A structured program combining in-person sessions, four months of mentorship, and real-world impact application — designed to move participants from potential to accountable leadership.',
    icon: Award,
    color: 'from-yellow-500 to-yellow-600',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/20',
    iconColor: 'text-yellow-400',
    duration: '~5 months',
    frequency: 'Cohort-based',
    locations: 'Cameroon (Cohort 1)',
    status: 'Applications open April 15, 2026',
    isOpen: true,
    image: '/images/backgrounds/fellowship.jpeg',
    highlights: ['In-person kick-off session', '4-month mentorship journey', 'Real-world impact project', 'Multiplier community action'],
    detailHref: '/fellowship',
  },
  {
    id: 'campus-ambassadors',
    title: 'Campus Ambassadors',
    tagline: 'Student leadership on campus',
    description: 'Supporting passionate student leaders to establish and grow Rise for Impact chapters at universities across Africa, building campus communities around social impact.',
    icon: GraduationCap,
    color: 'from-indigo-500 to-indigo-600',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/20',
    iconColor: 'text-indigo-400',
    duration: 'Academic year (9–12 months)',
    frequency: 'Monthly ambassador calls',
    locations: 'Universities across Africa',
    status: 'Cohorts: January, June, August & December 2026',
    isOpen: false,
    image: '/images/backgrounds/ClubMeeting2.jpeg',
    highlights: ['Ambassador training & certification', 'Club establishment toolkit', 'Inter-campus networking', 'Event planning support'],
  },
  {
    id: 'opportunity-plug',
    title: 'Opportunity Plug',
    tagline: 'Curated opportunities for youth',
    description: 'Your gateway to the best fellowships, scholarships, grants, and leadership programmes — curated, verified, and delivered with application guidance.',
    icon: Bookmark,
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20',
    iconColor: 'text-orange-400',
    duration: 'Ongoing',
    frequency: 'Daily updates',
    locations: 'Pan-African & Global',
    status: 'Browse opportunities now',
    isOpen: true,
    image: '/images/backgrounds/club-team.jpeg',
    highlights: ['Curated opportunities database', 'Application guidance & tips', 'Deadline tracking', 'Application review workshops'],
  },
]

const stats = [
  { value: '4', label: 'Flagship Sessions Delivered', sub: 'In 2025' },
  { value: '60+', label: 'Participants Per Session', sub: 'Average attendance' },
  { value: '200+', label: 'Workshop Participants', sub: 'LinkedIn & skills training' },
  { value: '4', label: 'Active Countries', sub: 'Cameroon, Ghana, Nigeria & Rwanda' },
]

export default function ProgramsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-dark-950">

        {/* ── Hero ── */}
        <section className="relative pt-24 pb-20 overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0">
            <img
              src="/images/backgrounds/fellowship.jpeg"
              alt=""
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-dark-950/80 via-dark-950/70 to-dark-950" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,197,94,0.15),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(245,158,11,0.10),transparent_60%)]" />
          </div>

          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:3rem_3rem]" />

          <div className="container-premium relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/15 border border-primary-500/25 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-primary-400" />
              <span className="text-xs font-semibold text-primary-400 tracking-widest uppercase">What We Do</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
              Our <span className="text-gradient">Programs</span>
            </h1>
            <p className="text-xl text-dark-200 max-w-3xl mx-auto leading-relaxed mb-3">
              Structured programmes helping young people access skills, opportunities, and leadership
              pathways — grounded in verified delivery across four African countries.
            </p>
            <p className="text-sm text-dark-400 max-w-xl mx-auto">
              We share only what we have delivered. Our capacity is growing.
            </p>
          </div>
        </section>

        {/* ── Stats bar ── */}
        <section className="border-y border-white/5 bg-dark-900/60 backdrop-blur-sm">
          <div className="container-premium">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
              {stats.map((stat) => (
                <div key={stat.label} className="py-10 px-6 text-center group">
                  <div className="text-4xl md:text-5xl font-display font-black text-white mb-2 group-hover:text-primary-400 transition-colors">{stat.value}</div>
                  <div className="text-sm text-dark-200 font-semibold">{stat.label}</div>
                  <div className="text-xs text-dark-500 mt-1">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Programs grid ── */}
        <section className="container-premium py-20">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">
              Six Ways to Get Involved
            </h2>
            <p className="text-dark-400 max-w-xl mx-auto text-sm">
              Click any programme to learn more, view the timeline, and apply.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program) => {
              const Icon = program.icon
              const href = (program as any).detailHref ?? `/programs/${program.id}`
              return (
                <Link
                  key={program.id}
                  href={href}
                  className="group flex flex-col rounded-2xl border border-white/8 bg-dark-900/70 hover:bg-dark-800/90 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-white/15 overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-900/50 to-transparent" />

                    {/* Colour tint on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-0 group-hover:opacity-15 transition-opacity duration-500`} />

                    {/* Status badge */}
                    <div className="absolute top-4 right-4">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm ${program.isOpen ? 'bg-green-500/25 text-green-300 border border-green-500/40' : 'bg-dark-800/70 text-dark-300 border border-white/10'}`}>
                        {program.isOpen ? '● Open now' : 'Opening soon'}
                      </span>
                    </div>

                    {/* Icon pill */}
                    <div className={`absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-br ${program.color} shadow-lg`}>
                      <Icon className="w-4 h-4 text-white" />
                      <span className="text-xs font-bold text-white">{program.tagline}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6">
                    <h2 className="text-xl font-display font-bold text-white mb-2 group-hover:text-primary-300 transition-colors">{program.title}</h2>
                    <p className="text-sm text-dark-300 leading-relaxed mb-5 flex-1">{program.description}</p>

                    {/* Meta row */}
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-dark-400 mb-5">
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 flex-shrink-0" />{program.duration}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 flex-shrink-0" />{program.locations}</span>
                    </div>

                    {/* Highlights */}
                    <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 mb-5">
                      {program.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-1.5 text-xs text-dark-400">
                          <span className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-gradient-to-br ${program.color}`} />
                          {h}
                        </li>
                      ))}
                    </ul>

                    {/* Footer row */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <span className="text-xs text-dark-500 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />{program.status}
                      </span>
                      <span className={`flex items-center gap-1 text-xs font-semibold ${program.iconColor} group-hover:gap-2 transition-all`}>
                        View details <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="container-premium pb-20">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0">
              <img src="/images/backgrounds/Togetherness.jpg" alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary-950/95 via-dark-900/90 to-accent-950/90" />
            </div>
            <div className="relative z-10 p-12 md:p-16 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 mb-6">
                <span className="text-xs font-medium text-dark-200">Not sure where to start?</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-display font-bold text-white mb-4">
                Find your path with Rise for Impact
              </h2>
              <p className="text-dark-300 mb-8 max-w-xl mx-auto">
                Explore curated opportunities, reach out to our team, or apply to programmes directly. We're here to help you move forward.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/opportunities"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-white font-semibold transition-all text-sm shadow-lg shadow-primary-500/25"
                >
                  Browse Opportunities <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/get-involved"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/15 hover:bg-white/8 text-white font-semibold transition-all text-sm"
                >
                  Get Involved
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
