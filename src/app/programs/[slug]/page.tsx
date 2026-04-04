'use client'

import { useState, useEffect, use } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Download, 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Users, 
  Target, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  AlertCircle,
  Sparkles,
  BookOpen,
  Repeat2,
  Compass,
  MessageSquare,
  Zap,
  UserCheck,
  Globe,
  Lightbulb,
  MoveRight,
} from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/sections/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import DownloadGuideButton from '@/components/fellowship/DownloadGuideButton'
import jsPDF from 'jspdf'

interface ProgramData {
  id: string
  title: string
  description: string
  longDescription: string
  features: string[]
  impact: string
  duration: string
  frequency: string
  locations: string
  image: string
  color: string
  applicationsOpen?: boolean
  status?: string
}

const programsData: Record<string, ProgramData> = {
  'rise-circles': {
    id: 'rise-circles',
    title: 'Rise Circles',
    description: 'Leadership development through peer learning circles where young leaders collaborate, share experiences, and develop essential skills.',
    longDescription: `Rise Circles bring together young leaders in structured peer learning environments where they develop critical leadership competencies, share experiences, and collaborate on solving community challenges. Through monthly workshops and mentorship, participants build networks that last beyond the program.

Our approach combines experiential learning with peer-to-peer knowledge sharing, creating a supportive environment where emerging leaders can explore challenges, test ideas, and develop solutions together. Each circle consists of 8-12 carefully selected participants who meet regularly over a 6-month period.`,
    features: [
      'Monthly leadership workshops led by experienced facilitators',
      'Peer mentorship programs with personalized guidance',
      'Collaborative community impact projects',
      'Skill-building sessions in communication, project management, and teamwork',
      'Access to a network of 500+ alumni leaders across Africa',
      'Certificate of completion and leadership portfolio development'
    ],
    impact: 'Growing community',
    duration: '2-3 months',
    frequency: 'Weekly meetings (2 hours each)',
    locations: 'Cameroon, Ghana, Nigeria & Rwanda',
    image: '/images/backgrounds/ClubMeeting.jpeg',
    color: 'from-primary-500 to-primary-600',
    applicationsOpen: false,
    status: 'Applications open Q2 2026'
  },
  'impact-clinics': {
    id: 'impact-clinics',
    title: 'Impact Clinics',
    description: 'Community-driven initiatives addressing local challenges through sustainable, youth-led solutions.',
    longDescription: `Impact Clinics provide a structured approach to community development, where youth identify local challenges, design innovative solutions, and implement sustainable projects with measurable impact.

We guide young changemakers through the entire project lifecycle - from identifying community needs and designing evidence-based interventions, to implementing projects and measuring their impact. Each clinic receives technical support, mentorship from experienced development practitioners, and connections to potential funders and partners.`,
    features: [
      'Comprehensive community needs assessment training',
      'Project design & planning workshops with expert facilitators',
      'Connections to funding opportunities and grant resources',
      'Implementation support and technical assistance',
      'Impact measurement tools and frameworks',
      'Documentation and storytelling support for showcasing results',
      'Networking with other clinic leaders and potential funders'
    ],
    impact: 'Active programs',
    duration: '3-12 months (flexible based on project scope)',
    frequency: 'Project-based with monthly check-ins',
    locations: 'Cameroon, Ghana, Nigeria & Rwanda',
    image: '/images/backgrounds/impact1.jpeg',
    color: 'from-accent-500 to-accent-600',
    applicationsOpen: false,
    status: 'Applications opening soon'
  },
  'rise-for-climate': {
    id: 'rise-for-climate',
    title: 'Rise for Climate',
    description: 'Climate action and environmental stewardship programs empowering youth to address climate challenges.',
    longDescription: `Our climate program mobilizes young people to take concrete action against climate change through tree planting, environmental education, sustainable practices, and advocacy for policy change.

Rise for Climate combines grassroots environmental action with leadership development, empowering youth to become climate champions in their communities. Through hands-on projects, advocacy training, and partnerships with environmental organizations, participants develop the knowledge and skills to drive meaningful climate action.`,
    features: [
      'Climate education workshops covering science, policy, and solutions',
      'Tree planting campaigns with local community engagement',
      'Sustainable practices training (waste management, energy efficiency, etc.)',
      'Climate advocacy initiatives and policy engagement opportunities',
      'Access to climate funding and grants for local projects',
      'Regional and continental networking events',
      'Media training for effective climate communication'
    ],
    impact: 'Growing environmental impact',
    duration: 'Ongoing program with various campaigns',
    frequency: 'Monthly campaigns and quarterly convenings',
    locations: 'Cameroon, Ghana, Nigeria & Rwanda',
    image: '/images/backgrounds/Togetherness.jpg',
    color: 'from-blue-500 to-blue-600',
    applicationsOpen: false,
    status: 'Applications opening soon'
  },
  'fellowship': {
    id: 'fellowship',
    title: 'Rise for Impact Fellowship',
    description: 'A structured leadership and impact development program for young Africans ready to move from potential to accountable action.',
    longDescription: `The Rise for Impact Fellowship is a guided experience — combining structured learning, mentorship, and real-world application in a single cohort journey.

Many programs teach. This one also requires doing. Fellows are expected to develop an idea, build a project, lead something, and account for it — not just complete modules and collect a certificate.

The design is deliberate: participants move through three connected phases — from orientation to mentored development to measurable impact — each building on the last.`,
    features: [
      'In-person kick-off: orientation, leadership sessions, and cohort formation',
      '4 months of structured mentorship with assigned guides',
      'Project or initiative development with ongoing feedback',
      'Leadership and execution skills built through doing, not just learning',
      'Accountability checkpoints throughout the journey',
      'Multiplier requirement: fellows must organize a knowledge-sharing session',
      'Connection to a growing alumni network across Africa',
      'Certificate of completion and documented impact record',
    ],
    impact: 'Cohort 1 — Cameroon, 2026',
    duration: '~5 months',
    frequency: 'In-person kick-off + monthly virtual sessions',
    locations: 'Cameroon (Cohort 1) · Pan-African expansion planned',
    image: '/images/backgrounds/fellowship.jpeg',
    color: 'from-yellow-500 to-yellow-600',
    applicationsOpen: false,
    status: 'Applications open April 15, 2026'
  },
  'campus-ambassadors': {
    id: 'campus-ambassadors',
    title: 'Campus Ambassadors Program',
    description: 'Empowering student leaders to establish and run Rise for Impact clubs on their university campuses.',
    longDescription: `The Campus Ambassadors Program identifies and supports passionate student leaders to establish Rise for Impact chapters at their universities. Ambassadors receive training, resources, and ongoing support to build vibrant campus communities driving social impact.

As a Campus Ambassador, you become the face of Rise for Impact on your campus, mobilizing fellow students around leadership development, community service, and social innovation. You'll receive comprehensive training, access to resources, and support from our team and a network of ambassadors across Africa.`,
    features: [
      'Ambassador training & certification program',
      'Club establishment toolkit with templates and guides',
      'Monthly resources package (activity ideas, event plans, etc.)',
      'Inter-campus networking opportunities',
      'Leadership development through program management',
      'Event planning support and funding access',
      'Recognition and recommendation letters for ambassadors',
      'Access to Rise for Impact programs and opportunities'
    ],
    impact: 'Applications opening soon',
    duration: 'Academic year (9-12 months)',
    frequency: 'Ongoing support with monthly ambassador calls',
    locations: 'Universities across Africa',
    image: '/images/backgrounds/ClubMeeting2.jpeg',
    color: 'from-indigo-500 to-indigo-600',
    applicationsOpen: false,
    status: 'Multiple cohorts: January, June, August & December 2026'
  },
  'opportunity-plug': {
    id: 'opportunity-plug',
    title: 'Opportunity Plug',
    description: 'Your gateway to fellowships, scholarships, and opportunities across Africa. We curate and share the latest opportunities with application guidance.',
    longDescription: `Opportunity Plug is our dedicated platform for bringing the best fellowships, scholarships, grants, and leadership programs directly to young African changemakers. We not only share opportunities but provide guidance on crafting winning applications, meeting deadlines, and maximizing your chances of success.

Every day, we scan hundreds of sources to curate the most relevant opportunities for African youth. Our team verifies each opportunity, provides application tips, and shares success stories to inspire and guide you. Whether you're looking for funding for your education, a fellowship to develop your skills, or a grant for your project, Opportunity Plug has you covered.`,
    features: [
      'Curated opportunities database updated daily',
      'Application deadline tracking and reminders',
      'Step-by-step application guidance and tips',
      'Success stories and resources from past recipients',
      'Fellowship match recommendations based on your profile',
      'Regular opportunity updates via email and social media',
      'Application review workshops and webinars',
      'Direct support from our opportunities team'
    ],
    impact: 'Connecting youth to opportunities',
    duration: 'Ongoing service',
    frequency: 'Daily opportunity updates',
    locations: 'Pan-African & Global opportunities',
    image: '/images/backgrounds/getinvolved.jpeg',
    color: 'from-orange-500 to-orange-600',
    applicationsOpen: true,
    status: 'Browse opportunities now!'
  }
}

export default function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const slug = resolvedParams.slug
  const router = useRouter()
  const program = programsData[slug]

  const [isDownloading, setIsDownloading] = useState(false)

  // Redirect Opportunity Plug to opportunities page
  useEffect(() => {
    if (slug === 'opportunity-plug') {
      router.push('/opportunities')
    }
  }, [slug, router])

  if (!program) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Program Not Found</h1>
            <p className="text-gray-600 mb-8">
              The program you're looking for doesn't exist or may have been moved.
            </p>
            <Link href="/#programs">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Programs
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // Show loading state while redirecting
  if (slug === 'opportunity-plug') {
    return null
  }

  // ── Custom rich layout for the Fellowship ────────────────────────────────
  if (slug === 'fellowship') {
    const fellowshipPhases = [
      {
        number: '01',
        title: 'In-Person Experience',
        duration: 'Kick-off',
        color: 'from-primary-500 to-primary-600',
        border: 'border-primary-500/30',
        bg: 'bg-primary-500/10',
        tag: 'text-primary-400',
        items: [
          'Program orientation and foundational leadership sessions',
          'Problem-solving workshops and ideation exercises',
          'Fellows connect and begin shaping their focus areas',
          'Formation of the cohort learning community',
        ],
      },
      {
        number: '02',
        title: 'Mentorship & Guided Development',
        duration: '4 months',
        color: 'from-yellow-500 to-yellow-600',
        border: 'border-yellow-500/30',
        bg: 'bg-yellow-500/10',
        tag: 'text-yellow-400',
        items: [
          'Structured mentorship with assigned guides',
          'Project or initiative development with ongoing feedback',
          'Leadership and execution skills built in practice',
          'Accountability checkpoints throughout the journey',
        ],
      },
      {
        number: '03',
        title: 'Application to Real Impact',
        duration: 'Ongoing',
        color: 'from-emerald-500 to-emerald-600',
        border: 'border-emerald-500/30',
        bg: 'bg-emerald-500/10',
        tag: 'text-emerald-400',
        items: [
          'Fellows implement or pilot their developed ideas',
          'Community contribution in tangible, documented ways',
          'Leadership demonstrated in real contexts',
          'Outcomes reviewed against defined goals',
        ],
      },
    ]

    const fellowshipGains = [
      { icon: UserCheck, title: 'Leadership Development', desc: 'Structured exposure to leadership principles, decision-making, and the ability to take initiative — applied in real situations, not just theory.', color: 'from-primary-500 to-primary-600', bg: 'bg-primary-500/10', border: 'border-primary-500/20', text: 'text-primary-400' },
      { icon: Zap, title: 'Practical Skills', desc: 'Project design and execution, communication, problem-solving, and turning ideas into action — competencies built through doing.', color: 'from-yellow-500 to-yellow-600', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', text: 'text-yellow-400' },
      { icon: Compass, title: 'Clarity & Direction', desc: 'A clearer picture of personal goals, areas of contribution, and a defined path forward — grounded in honest self-assessment.', color: 'from-blue-500 to-blue-600', bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400' },
      { icon: MessageSquare, title: 'Mentorship & Feedback', desc: 'Access to mentors who provide structured guidance, honest feedback, and consistent support across the fellowship period.', color: 'from-purple-500 to-purple-600', bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400' },
      { icon: Users, title: 'Network & Community', desc: 'Connection to a growing cohort of peers across different backgrounds, all committed to learning, growth, and positive contribution.', color: 'from-emerald-500 to-emerald-600', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400' },
      { icon: Repeat2, title: 'Multiplied Reach', desc: 'The expectation and support to carry learning beyond yourself — organizing sessions, sharing knowledge, and expanding the circle.', color: 'from-orange-500 to-orange-600', bg: 'bg-orange-500/10', border: 'border-orange-500/20', text: 'text-orange-400' },
    ]

    const multiplierSteps = [
      'Organize a knowledge-sharing session or community event',
      'Transfer key learnings to at least one immediate circle',
      'Document and submit a brief account of the experience',
      'Contribute to the growing network of program alumni',
    ]

    const criteria = [
      'Interested in leadership, community contribution, or personal development',
      'Has ideas or is actively exploring ways to create impact',
      'Willing to commit time, effort, and accountability to the program',
      'Prepared to apply learning through action, not just observation',
      'Open to mentorship, feedback, and structured growth',
    ]

    return (
      <div className="min-h-screen bg-dark-950">
        <Navbar />
        <main className="pb-24">

          {/* ── Hero ── */}
          <section className="relative pt-24 pb-20 overflow-hidden">
            <div className="absolute inset-0">
              <img src="/images/backgrounds/fellowship.jpeg" alt="" className="w-full h-full object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-b from-dark-950/70 via-dark-950/75 to-dark-950" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(251,146,60,0.12),transparent_55%)]" />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:3rem_3rem]" />
            <div className="container-premium relative z-10 py-8">
              <Link href="/programs" className="inline-flex items-center gap-2 text-dark-400 hover:text-white text-sm mb-8 transition-colors group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Programs
              </Link>
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/15 border border-yellow-500/25 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                  <span className="text-xs font-semibold text-yellow-400 tracking-widest uppercase">Applications open — April 15, 2026</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
                  Rise for Impact <span className="text-gradient">Fellowship</span>
                </h1>
                <p className="text-xl md:text-2xl text-dark-200 leading-relaxed mb-3 max-w-2xl">
                  A structured leadership and impact development program for young Africans ready to move from potential to action.
                </p>
                <p className="text-dark-400 text-sm mb-10 max-w-xl">Starting in Cameroon · Cohort 1 · 2026</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 font-semibold text-sm cursor-default select-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                    Applications open April 15, 2026
                  </div>
                  <a href="#structure" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/15 hover:bg-white/5 text-white font-semibold transition-colors text-sm">
                    See Program Structure
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* ── At a Glance ── */}
          <section className="container-premium py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Format', value: 'In-person + virtual' },
                { label: 'Duration', value: '~5 months' },
                { label: 'Cohort Size', value: 'Limited intake' },
                { label: 'Location', value: 'Cameroon (Cohort 1)' },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl bg-white/4 border border-white/8 p-5 space-y-1">
                  <p className="text-xs text-dark-400 uppercase tracking-wider font-medium">{item.label}</p>
                  <p className="text-white font-semibold">{item.value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── What It Is / Why It Exists ── */}
          <section className="container-premium py-14">
            <div className="grid md:grid-cols-2 gap-14 items-start">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-semibold text-yellow-400 uppercase tracking-wider">What It Is</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight">More than a training program</h2>
                <div className="space-y-4 text-dark-200 leading-relaxed">
                  <p>The <span className="text-white font-semibold">Rise for Impact Fellowship</span> is a guided experience — combining structured learning, mentorship, and real-world application in a single cohort journey.</p>
                  <p>Many programs teach. This one also requires doing. Fellows are expected to develop an idea, build a project, lead something, and account for it — not just complete modules and collect a certificate.</p>
                  <p>The design is deliberate: participants move through three connected phases — from orientation to mentored development to measurable impact — each building on the last.</p>
                </div>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {[['Ideas', 'Execution'], ['Potential', 'Leadership'], ['Learning', 'Impact']].map(([from, to]) => (
                    <div key={from} className="flex items-center gap-3">
                      <span className="px-3 py-1.5 rounded-lg bg-white/6 border border-white/10 text-dark-300 text-sm font-medium">{from}</span>
                      <MoveRight className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                      <span className="px-3 py-1.5 rounded-lg bg-yellow-500/15 border border-yellow-500/25 text-yellow-300 text-sm font-semibold">{to}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-dark-900/60 to-white/3 border border-white/8 p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-semibold text-primary-400 uppercase tracking-wider">Why It Exists</span>
                </div>
                <h3 className="text-xl font-display font-bold text-white leading-snug">The gap the fellowship is designed to close</h3>
                <p className="text-dark-300 leading-relaxed text-sm">Across Africa, many young people have strong ideas and the desire to contribute. But without structured guidance, mentorship, and practical pathways, most of that potential doesn't translate into meaningful action.</p>
                <div className="space-y-3">
                  {['Structured guidance to develop ideas into action', 'Access to mentors with real experience', 'Practical leadership skills applied in context', 'Accountability systems that make growth measurable'].map((gap) => (
                    <div key={gap} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2 flex-shrink-0" />
                      <p className="text-sm text-dark-200">{gap}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-dark-400 border-t border-white/6 pt-4 italic">The fellowship was created to address this gap — providing a structured pathway from aspiration to accountable action.</p>
              </div>
            </div>
          </section>

          {/* ── Program Structure ── */}
          <section id="structure" className="container-premium py-14">
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/6 border border-white/10 mb-4">
                <span className="text-xs font-semibold text-dark-300 tracking-widest uppercase">Program Structure</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">Three phases, one continuous journey</h2>
              <p className="text-dark-400 max-w-xl leading-relaxed">The fellowship is structured in phases to ensure depth, continuity, and accountability — not a collection of disconnected events.</p>
            </div>
            <div className="space-y-6">
              {fellowshipPhases.map((phase) => (
                <div key={phase.number} className={`rounded-2xl ${phase.bg} border ${phase.border} p-7 md:p-9`}>
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="flex-shrink-0 space-y-2">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${phase.color} flex items-center justify-center text-white font-bold text-lg`}>{phase.number}</div>
                      <p className={`text-xs font-semibold uppercase tracking-wider ${phase.tag}`}>{phase.duration}</p>
                    </div>
                    <div className="flex-1 space-y-4">
                      <h3 className="text-xl font-display font-bold text-white">{phase.title}</h3>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {phase.items.map((item) => (
                          <div key={item} className="flex items-start gap-3">
                            <CheckCircle2 className={`w-4 h-4 ${phase.tag} flex-shrink-0 mt-0.5`} />
                            <span className="text-sm text-dark-200 leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Multiplier Approach ── */}
          <section className="container-premium py-14">
            <div className="rounded-3xl bg-gradient-to-br from-yellow-900/20 via-dark-900/50 to-primary-900/20 border border-yellow-500/15 p-10 md:p-14">
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600">
                      <Repeat2 className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xs font-semibold text-yellow-400 uppercase tracking-wider">The Multiplier Approach</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-white leading-snug">Each fellow extends the impact beyond themselves</h2>
                  <p className="text-dark-300 leading-relaxed">The fellowship expects fellows not just to receive, but to pass it on. After completing the program, every fellow is required to take one concrete multiplier action in their community or network.</p>
                  <p className="text-dark-400 text-sm">This is how one cohort becomes a hundred — and how the fellowship builds a broader network of equipped and active young people across Africa.</p>
                </div>
                <div className="space-y-3">
                  {multiplierSteps.map((step, i) => (
                    <div key={step} className="flex items-start gap-4 rounded-xl bg-white/4 border border-white/8 p-4">
                      <div className="w-7 h-7 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-yellow-400 font-bold text-xs flex-shrink-0">{i + 1}</div>
                      <p className="text-sm text-dark-200 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── What You Gain ── */}
          <section className="container-premium py-14">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/6 border border-white/10 mb-4">
                <span className="text-xs font-semibold text-dark-300 tracking-widest uppercase">What You Gain</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">What participants leave with</h2>
              <p className="text-dark-400 max-w-xl mx-auto">The fellowship is designed to deliver specific, measurable outcomes — not generic self-improvement.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {fellowshipGains.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className={`rounded-2xl ${item.bg} border ${item.border} p-6 space-y-4`}>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className={`text-lg font-bold ${item.text}`}>{item.title}</h3>
                    <p className="text-sm text-dark-300 leading-relaxed">{item.desc}</p>
                  </div>
                )
              })}
            </div>
          </section>

          {/* ── Who It's For / Vision ── */}
          <section className="container-premium py-14">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600">
                    <Lightbulb className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Who It's For</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight">Who should apply</h2>
                <p className="text-dark-300 leading-relaxed">The fellowship is not selective on the basis of credentials or status. It is selective on the basis of commitment, intention, and readiness to do real work.</p>
                <div className="space-y-3">
                  {criteria.map((c) => (
                    <div key={c} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-dark-200 leading-relaxed">{c}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl bg-blue-500/8 border border-blue-500/20 p-4 text-sm text-blue-300 leading-relaxed">
                  The program is open to individuals at different levels of experience — what matters is demonstrated commitment and willingness to engage seriously with the process.
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Vision & Scale</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight">Where this is going</h2>
                <p className="text-dark-300 leading-relaxed">The Rise for Impact Fellowship is part of a broader long-term goal: to build a generation of young African leaders who are equipped, accountable, and actively contributing to development in their communities.</p>
                <div className="space-y-4">
                  {[
                    { label: 'Cohort 1', detail: 'Cameroon — 2026', colorText: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', dot: 'bg-yellow-400' },
                    { label: 'Expansion', detail: 'Ghana, Nigeria & Rwanda — planned', colorText: 'text-primary-400', bg: 'bg-primary-500/10', border: 'border-primary-500/20', dot: 'bg-primary-400' },
                    { label: 'Long-term', detail: 'Pan-African alumni network contributing to community development', colorText: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', dot: 'bg-emerald-400' },
                  ].map((v) => (
                    <div key={v.label} className={`flex items-start gap-4 rounded-xl ${v.bg} border ${v.border} p-4`}>
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${v.dot}`} />
                      <div>
                        <p className={`text-sm font-semibold ${v.colorText}`}>{v.label}</p>
                        <p className="text-xs text-dark-400 mt-0.5">{v.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-dark-400 italic border-l-2 border-emerald-500/30 pl-4">Starting small, building correctly, and expanding from a foundation of real results.</p>
              </div>
            </div>
          </section>

          {/* ── CTA ── */}
          <section className="container-premium pt-6">
            <div className="rounded-3xl bg-gradient-to-br from-yellow-900/30 via-dark-900/55 to-primary-900/25 border border-yellow-500/15 p-12 md:p-16 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/15 border border-yellow-500/25 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                <span className="text-xs font-semibold text-yellow-400 tracking-widest uppercase">Cohort 1 — Applications open April 15, 2026</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Ready to apply?</h2>
              <p className="text-dark-300 mb-6 max-w-xl mx-auto leading-relaxed">Applications for the first cohort open on April 15, 2026. Spots are limited. If you meet the criteria and are prepared to commit, we'd like to hear from you.</p>
              {/* Download Guide prompt */}
              <div className="bg-dark-900/60 border border-dark-700 rounded-2xl p-5 max-w-md mx-auto mb-8 text-left">
                <p className="text-xs font-semibold text-white mb-1">Prepare your application early</p>
                <p className="text-xs text-dark-400 mb-4 leading-relaxed">Download the full application guide — covering the programme overview, all 9 form sections, every essay prompt, and what we look for in successful candidates.</p>
                <DownloadGuideButton variant="secondary" size="sm" />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-yellow-500/15 border border-yellow-500/35 text-yellow-300 font-semibold cursor-default select-none">
                  <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse flex-shrink-0" />
                  Applications open April 15, 2026
                </div>
                <Link href="/programs" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/12 hover:bg-white/5 text-white font-semibold transition-colors">
                  Explore Other Programs
                </Link>
              </div>
            </div>
          </section>

        </main>
        <Footer />
      </div>
    )
  }
  // ── End Fellowship custom layout ─────────────────────────────────────────

  const downloadProgramGuide = async () => {
    setIsDownloading(true)
    
    try {
      const pdf = new jsPDF()
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const margin = 20
      let yPos = margin

      // Load and add logo
      const logoImg = new Image()
      logoImg.src = '/images/logo.jpeg'
      await new Promise((resolve, reject) => {
        logoImg.onload = resolve
        logoImg.onerror = reject
      })

      // Add Rise for Impact logo/header
      pdf.setFillColor(34, 197, 94) // Green color
      pdf.rect(0, 0, pageWidth, 50, 'F')
      
      // Add logo image
      pdf.addImage(logoImg, 'JPEG', margin, 10, 30, 30)
      
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(24)
      pdf.setFont('helvetica', 'bold')
      pdf.text('RISE FOR IMPACT', margin + 35, 30)
      
      yPos = 65

      // Program Title
      pdf.setTextColor(0, 0, 0)
      pdf.setFontSize(20)
      pdf.setFont('helvetica', 'bold')
      const titleLines = pdf.splitTextToSize(program.title, pageWidth - 2 * margin)
      pdf.text(titleLines, margin, yPos)
      yPos += titleLines.length * 10 + 10

      // Description
      pdf.setFontSize(11)
      pdf.setFont('helvetica', 'normal')
      const descLines = pdf.splitTextToSize(program.description, pageWidth - 2 * margin)
      pdf.text(descLines, margin, yPos)
      yPos += descLines.length * 6 + 15

      // Program Details
      pdf.setFontSize(14)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Program Overview', margin, yPos)
      yPos += 10

      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      
      const details = [
        { label: 'Duration:', value: program.duration },
        { label: 'Frequency:', value: program.frequency },
        { label: 'Location:', value: program.locations },
        { label: 'Status:', value: program.status || 'Active' }
      ]

      details.forEach(detail => {
        pdf.setFont('helvetica', 'bold')
        pdf.text(detail.label, margin, yPos)
        pdf.setFont('helvetica', 'normal')
        pdf.text(detail.value, margin + 30, yPos)
        yPos += 7
      })

      yPos += 10

      // Long Description
      pdf.setFontSize(14)
      pdf.setFont('helvetica', 'bold')
      pdf.text('About This Program', margin, yPos)
      yPos += 10

      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      const longDescLines = pdf.splitTextToSize(program.longDescription, pageWidth - 2 * margin)
      longDescLines.forEach((line: string) => {
        if (yPos > pageHeight - 30) {
          pdf.addPage()
          yPos = margin
        }
        pdf.text(line, margin, yPos)
        yPos += 6
      })

      yPos += 10

      // Features
      if (program.features && program.features.length > 0) {
        if (yPos > pageHeight - 50) {
          pdf.addPage()
          yPos = margin
        }

        pdf.setFontSize(14)
        pdf.setFont('helvetica', 'bold')
        pdf.text('Key Features', margin, yPos)
        yPos += 10

        pdf.setFontSize(10)
        pdf.setFont('helvetica', 'normal')
        
        program.features.forEach((feature: string) => {
          if (yPos > pageHeight - 20) {
            pdf.addPage()
            yPos = margin
          }
          pdf.text('•', margin, yPos)
          const featureLines = pdf.splitTextToSize(feature, pageWidth - 2 * margin - 10)
          pdf.text(featureLines, margin + 5, yPos)
          yPos += featureLines.length * 6 + 3
        })
      }

      // Footer
      pdf.addPage()
      yPos = margin

      pdf.setFillColor(34, 197, 94)
      pdf.rect(0, pageHeight - 40, pageWidth, 40, 'F')
      
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      pdf.text('Rise for Impact - Empowering African Youth Leaders', margin, pageHeight - 25)
      pdf.text('Visit us: www.riseforimpact.org | Email: info@riseforimpact.org', margin, pageHeight - 17)
      
      pdf.setFontSize(8)
      pdf.text(`© ${new Date().getFullYear()} Rise for Impact. All rights reserved.`, margin, pageHeight - 10)

      // Save the PDF
      pdf.save(`${program.title.replace(/\s+/g, '-').toLowerCase()}-program-guide.pdf`)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Failed to generate PDF. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-950">
      <Navbar />
      
      {/* Hero Section with Image */}
      <div className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-700 hover:scale-100"
          style={{ 
            backgroundImage: `url(${program.image})`,
            filter: 'brightness(0.5)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-primary-900/80" />
        
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-16">
          <Link href="/#programs">
            <Button variant="ghost" className="text-white hover:bg-white/20 backdrop-blur-sm border border-white/20 mb-6 w-fit transition-all hover:scale-105">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Programs
            </Button>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight">
              {program.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mb-8 leading-relaxed">
              {program.description}
            </p>
            
            <div className="flex flex-wrap gap-3">
              {program.applicationsOpen ? (
                <Badge className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 text-base shadow-lg shadow-green-500/50 animate-pulse">
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  {program.status}
                </Badge>
              ) : (
                <Badge className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 text-base shadow-lg shadow-amber-500/50">
                  <Clock className="w-5 h-5 mr-2" />
                  {program.status}
                </Badge>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Program Details Cards */}
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass-card rounded-2xl p-8 hover:scale-[1.02] transition-all duration-300"
                  >
                    <div className="bg-primary-500/20 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                      <Calendar className="w-7 h-7 text-primary-400" />
                    </div>
                    <h3 className="font-bold text-white mb-2 text-lg">Duration</h3>
                    <p className="text-dark-300 text-base">{program.duration}</p>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card rounded-2xl p-8 hover:scale-[1.02] transition-all duration-300"
                  >
                    <div className="bg-primary-500/20 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                      <Clock className="w-7 h-7 text-primary-400" />
                    </div>
                    <h3 className="font-bold text-white mb-2 text-lg">Frequency</h3>
                    <p className="text-dark-300 text-base">{program.frequency}</p>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass-card rounded-2xl p-8 hover:scale-[1.02] transition-all duration-300"
                  >
                    <div className="bg-blue-500/20 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                      <MapPin className="w-7 h-7 text-blue-400" />
                    </div>
                    <h3 className="font-bold text-white mb-2 text-lg">Locations</h3>
                    <p className="text-dark-300 text-base">{program.locations}</p>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass-card rounded-2xl p-8 hover:scale-[1.02] transition-all duration-300"
                  >
                    <div className="bg-accent-500/20 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                      <Target className="w-7 h-7 text-accent-400" />
                    </div>
                    <h3 className="font-bold text-white mb-2 text-lg">Impact</h3>
                    <p className="text-dark-300 text-base">{program.impact}</p>
                  </motion.div>
                </div>

                {/* About Section */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="glass-card rounded-2xl p-10 border border-primary-500/10"
                >
                  <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                    <div className="bg-primary-500/20 w-12 h-12 rounded-xl flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-primary-400" />
                    </div>
                    About This Program
                  </h2>
                  <div>
                    {program.longDescription.split('\n').map((paragraph, idx) => (
                      <p key={idx} className="text-dark-200 leading-relaxed mb-6 text-lg">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </motion.div>

                {/* Key Features */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="glass-card rounded-2xl p-10"
                >
                  <h2 className="text-3xl font-bold text-white mb-8">Key Features</h2>
                  <div className="grid gap-4">
                    {program.features.map((feature, idx) => (
                      <motion.div 
                        key={idx} 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + idx * 0.08 }}
                        className="flex items-start gap-4 p-4 bg-primary-500/8 rounded-xl border border-primary-500/15 hover:border-primary-500/30 transition-all duration-300"
                      >
                        <div className="bg-primary-500/20 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle2 className="w-5 h-5 text-primary-400" />
                        </div>
                        <p className="text-dark-200 text-base leading-relaxed">{feature}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Download Guide */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="glass-card rounded-2xl p-8 border border-primary-500/20 sticky top-4"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${program.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <Download className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Program Guide</h3>
                  <p className="text-dark-300 mb-6 text-sm leading-relaxed">
                    Download the complete program guide with all details, requirements, and application information.
                  </p>
                  <Button
                    onClick={downloadProgramGuide}
                    disabled={isDownloading}
                    variant="primary"
                    className="w-full py-3 font-semibold"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    {isDownloading ? 'Generating PDF...' : 'Download Guide'}
                  </Button>
                </motion.div>

                {/* Application Status */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="glass-card rounded-2xl p-8"
                >
                  <h3 className="text-xl font-bold text-white mb-6">Application Status</h3>
                  {program.applicationsOpen ? (
                    <div>
                      <div className="flex items-center gap-3 text-emerald-400 mb-6 bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20">
                        <div className="bg-emerald-500/20 w-10 h-10 rounded-lg flex items-center justify-center">
                          <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <span className="font-bold text-base">{program.status}</span>
                      </div>
                      <Link href={`/apply?program=${program.id}`}>
                        <Button variant="primary" className="w-full py-3 font-semibold">
                          Apply Now
                          <ExternalLink className="w-5 h-5 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center gap-3 text-amber-400 mb-6 bg-amber-500/10 p-4 rounded-xl border border-amber-500/20">
                        <div className="bg-amber-500/20 w-10 h-10 rounded-lg flex items-center justify-center">
                          <AlertCircle className="w-6 h-6" />
                        </div>
                        <span className="font-bold text-base">{program.status}</span>
                      </div>
                      <p className="text-dark-300 text-sm mb-6 leading-relaxed">
                        Applications for this program will open soon. Subscribe to our newsletter to get notified!
                      </p>
                      <Link href="/#newsletter">
                        <Button variant="outline" className="w-full py-3 font-semibold">
                          Get Notified
                        </Button>
                      </Link>
                    </div>
                  )}
                </motion.div>

                {/* Contact */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="glass-card rounded-2xl p-8"
                >
                  <h3 className="text-xl font-bold text-white mb-4">Questions?</h3>
                  <p className="text-dark-300 text-sm mb-5 leading-relaxed">
                    Have questions about this program? We're here to help!
                  </p>
                  <a href="mailto:info@riseforimpact.org" className="text-primary-400 hover:text-primary-300 font-bold text-sm inline-flex items-center gap-2 hover:gap-3 transition-all">
                    info@riseforimpact.org
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
