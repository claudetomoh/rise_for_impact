import type { Metadata } from 'next'
import Link from 'next/link'
import { Users, Sprout, Globe, Award, GraduationCap, Bookmark, ArrowRight, MapPin, Clock, Calendar } from 'lucide-react'
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
    tagline: 'Intensive leadership & skills training',
    description: 'Our flagship programme equipping exceptional young leaders with practical skills in grant writing, storytelling, public speaking, and leadership development.',
    icon: Award,
    color: 'from-yellow-500 to-yellow-600',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/20',
    iconColor: 'text-yellow-400',
    duration: '3–6 months',
    frequency: 'Quarterly cohorts',
    locations: 'Open to Africa-based applicants',
    status: 'Applications open February 2026',
    isOpen: false,
    image: '/images/backgrounds/fellowship.jpeg',
    highlights: ['Grant writing workshops', 'Storytelling masterclasses', 'Public speaking training', 'Mentorship & coaching'],
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
      <main className="min-h-screen bg-dark-950 pt-24 pb-20">

        {/* Hero */}
        <section className="container-premium py-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6">
            <span className="text-xs font-medium text-primary-400 tracking-wide uppercase">What We Do</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            Our <span className="text-gradient">Programs</span>
          </h1>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto leading-relaxed mb-4">
            Rise for Impact runs structured programmes that help young people access skills, opportunities, 
            and leadership pathways. All programmes are grounded in verified delivery across Cameroon, Ghana, Nigeria, and Rwanda.
          </p>
          <p className="text-sm text-dark-400 max-w-xl mx-auto">
            We are a growing organisation. Our capacity is expanding — we share only what we have delivered.
          </p>
        </section>

        {/* Stats bar */}
        <section className="border-y border-white/5 bg-white/[0.02]">
          <div className="container-premium">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
              {stats.map((stat) => (
                <div key={stat.label} className="py-8 px-6 text-center">
                  <div className="text-3xl font-display font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-dark-300 font-medium">{stat.label}</div>
                  <div className="text-xs text-dark-500 mt-0.5">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Programs grid */}
        <section className="container-premium py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => {
              const Icon = program.icon
              return (
                <Link
                  key={program.id}
                  href={`/programs/${program.id}`}
                  className={`group flex flex-col rounded-2xl border ${program.borderColor} bg-dark-900/60 hover:bg-dark-800/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden`}
                >
                  {/* Image */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent" />
                    {/* Status badge */}
                    <div className="absolute top-3 right-3">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${program.isOpen ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-white/10 text-dark-300 border border-white/10'}`}>
                        {program.isOpen ? '● Open now' : 'Coming soon'}
                      </span>
                    </div>
                    {/* Icon */}
                    <div className={`absolute bottom-3 left-4 w-10 h-10 rounded-xl bg-gradient-to-br ${program.color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6">
                    <p className={`text-xs font-semibold uppercase tracking-wider ${program.iconColor} mb-1`}>{program.tagline}</p>
                    <h2 className="text-lg font-display font-bold text-white mb-3 group-hover:text-primary-300 transition-colors">{program.title}</h2>
                    <p className="text-sm text-dark-300 leading-relaxed mb-5 flex-1">{program.description}</p>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-3 text-xs text-dark-400 mb-5">
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{program.duration}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{program.locations}</span>
                    </div>

                    {/* Highlights */}
                    <ul className="space-y-1.5 mb-5">
                      {program.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-xs text-dark-300">
                          <span className={`mt-0.5 w-1.5 h-1.5 rounded-full bg-gradient-to-br ${program.color} flex-shrink-0`} />
                          {h}
                        </li>
                      ))}
                    </ul>

                    {/* Status + CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <span className="text-xs text-dark-400 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{program.status}</span>
                      <ArrowRight className={`w-4 h-4 ${program.iconColor} group-hover:translate-x-1 transition-transform`} />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="container-premium">
          <div className="rounded-3xl bg-gradient-to-br from-primary-900/40 via-dark-900/60 to-accent-900/30 border border-primary-500/15 p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">Not sure which programme fits you?</h2>
            <p className="text-dark-300 mb-8 max-w-xl mx-auto">
              Reach out to us or explore our opportunities page — we're here to help you find the right path.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/opportunities"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold transition-colors text-sm"
              >
                Browse Opportunities <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/get-involved"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-white font-semibold transition-colors text-sm"
              >
                Get Involved
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
