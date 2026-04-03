import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle,
  Users,
  Target,
  Lightbulb,
  Compass,
  MessageSquare,
  Repeat2,
  BookOpen,
  Globe,
  Zap,
  UserCheck,
  MoveRight,
} from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/sections/footer'

export const metadata: Metadata = {
  title: 'Rise for Impact Fellowship | Leadership & Impact Development Program',
  description:
    'The Rise for Impact Fellowship is a structured leadership and impact development program equipping young Africans with the skills, mentorship, and real-world experience to drive change in their communities.',
}

// ── Data ─────────────────────────────────────────────────────────────────────

const phases = [
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
    color: 'from-accent-500 to-accent-600',
    border: 'border-accent-500/30',
    bg: 'bg-accent-500/10',
    tag: 'text-accent-400',
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

const gains = [
  {
    icon: UserCheck,
    title: 'Leadership Development',
    desc: 'Structured exposure to leadership principles, decision-making, and the ability to take initiative — applied in real situations, not just theory.',
    color: 'from-primary-500 to-primary-600',
    bg: 'bg-primary-500/10',
    border: 'border-primary-500/20',
    text: 'text-primary-400',
  },
  {
    icon: Zap,
    title: 'Practical Skills',
    desc: 'Project design and execution, communication, problem-solving, and turning ideas into action — competencies built through doing.',
    color: 'from-accent-500 to-accent-600',
    bg: 'bg-accent-500/10',
    border: 'border-accent-500/20',
    text: 'text-accent-400',
  },
  {
    icon: Compass,
    title: 'Clarity & Direction',
    desc: 'A clearer picture of personal goals, areas of contribution, and a defined path forward — grounded in honest self-assessment.',
    color: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    text: 'text-blue-400',
  },
  {
    icon: MessageSquare,
    title: 'Mentorship & Feedback',
    desc: 'Access to mentors who provide structured guidance, honest feedback, and consistent support across the fellowship period.',
    color: 'from-purple-500 to-purple-600',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    text: 'text-purple-400',
  },
  {
    icon: Users,
    title: 'Network & Community',
    desc: 'Connection to a growing cohort of peers across different backgrounds, all committed to learning, growth, and positive contribution.',
    color: 'from-emerald-500 to-emerald-600',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    text: 'text-emerald-400',
  },
  {
    icon: Repeat2,
    title: 'Multiplied Reach',
    desc: 'The expectation and support to carry learning beyond yourself — organizing sessions, sharing knowledge, and expanding the circle.',
    color: 'from-yellow-500 to-yellow-600',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
    text: 'text-yellow-400',
  },
]

const criteria = [
  'Interested in leadership, community contribution, or personal development',
  'Has ideas or is actively exploring ways to create impact',
  'Willing to commit time, effort, and accountability to the program',
  'Prepared to apply learning through action, not just observation',
  'Open to mentorship, feedback, and structured growth',
]

const multiplierSteps = [
  'Organize a knowledge-sharing session or community event',
  'Transfer key learnings to at least one immediate circle',
  'Document and submit a brief account of the experience',
  'Contribute to the growing network of program alumni',
]

// ── Page ─────────────────────────────────────────────────────────────────────

export default function FellowshipPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-dark-950 pb-24">

        {/* ── Hero ── */}
        <section className="relative pt-24 pb-20 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0">
            <img
              src="/images/backgrounds/fellowship.jpeg"
              alt=""
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-dark-950/70 via-dark-950/75 to-dark-950" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(251,146,60,0.12),transparent_55%)]" />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:3rem_3rem]" />

          <div className="container-premium relative z-10 py-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/15 border border-primary-500/25 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
                <span className="text-xs font-semibold text-primary-400 tracking-widest uppercase">
                  Applications open — April 15, 2026
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
                Rise for Impact <span className="text-gradient">Fellowship</span>
              </h1>

              <p className="text-xl md:text-2xl text-dark-200 leading-relaxed mb-3 max-w-2xl">
                A structured leadership and impact development program for young Africans ready to move
                from potential to action.
              </p>
              <p className="text-dark-400 text-sm mb-10 max-w-xl">
                Starting in Cameroon · Cohort 1 · 2026
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/get-involved"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold transition-colors text-sm"
                >
                  Apply Now <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#structure"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/15 hover:bg-white/5 text-white font-semibold transition-colors text-sm"
                >
                  See Program Structure
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Program at a Glance ── */}
        <section className="container-premium py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Format', value: 'In-person + virtual' },
              { label: 'Duration', value: '~5 months' },
              { label: 'Cohort Size', value: 'Limited intake' },
              { label: 'Location', value: 'Cameroon (Cohort 1)' },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl bg-white/4 border border-white/8 p-5 space-y-1"
              >
                <p className="text-xs text-dark-400 uppercase tracking-wider font-medium">{item.label}</p>
                <p className="text-white font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── What the Fellowship Is ── */}
        <section className="container-premium py-14">
          <div className="grid md:grid-cols-2 gap-14 items-start">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-semibold text-primary-400 uppercase tracking-wider">What It Is</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight">
                More than a training program
              </h2>
              <div className="space-y-4 text-dark-200 leading-relaxed">
                <p>
                  The <span className="text-white font-semibold">Rise for Impact Fellowship</span> is a
                  guided experience — combining structured learning, mentorship, and real-world
                  application in a single cohort journey.
                </p>
                <p>
                  Many programs teach. This one also requires doing. Fellows are expected to develop
                  an idea, build a project, lead something, and account for it — not just complete
                  modules and collect a certificate.
                </p>
                <p>
                  The design is deliberate: participants move through three connected phases — from
                  orientation to mentored development to measurable impact — each building on the last.
                </p>
              </div>

              {/* Transformation flow */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {['Ideas', 'Execution', 'Potential', 'Leadership', 'Learning', 'Impact'].map(
                  (word, i) =>
                    i % 2 === 0 ? (
                      <div key={word} className="flex items-center gap-3">
                        <span className="px-3 py-1.5 rounded-lg bg-white/6 border border-white/10 text-dark-300 text-sm font-medium">
                          {word}
                        </span>
                        <MoveRight className="w-4 h-4 text-primary-400 flex-shrink-0" />
                        <span className="px-3 py-1.5 rounded-lg bg-primary-500/15 border border-primary-500/25 text-primary-300 text-sm font-semibold">
                          {['Execution', 'Leadership', 'Impact'][Math.floor(i / 2)]}
                        </span>
                      </div>
                    ) : null
                )}
              </div>
            </div>

            {/* Why it exists */}
            <div className="rounded-2xl bg-gradient-to-br from-dark-900/60 to-white/3 border border-white/8 p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-accent-500 to-accent-600">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-semibold text-accent-400 uppercase tracking-wider">Why It Exists</span>
              </div>
              <h3 className="text-xl font-display font-bold text-white leading-snug">
                The gap the fellowship is designed to close
              </h3>
              <p className="text-dark-300 leading-relaxed text-sm">
                Across Africa, many young people have strong ideas and the desire to contribute.
                But without structured guidance, mentorship, and practical pathways, most of that
                potential doesn't translate into meaningful action.
              </p>
              <div className="space-y-3">
                {[
                  'Structured guidance to develop ideas into action',
                  'Access to mentors with real experience',
                  'Practical leadership skills applied in context',
                  'Accountability systems that make growth measurable',
                ].map((gap) => (
                  <div key={gap} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-400 mt-2 flex-shrink-0" />
                    <p className="text-sm text-dark-200">{gap}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-dark-400 border-t border-white/6 pt-4 italic">
                The fellowship was created to address this gap — providing a structured pathway from
                aspiration to accountable action.
              </p>
            </div>
          </div>
        </section>

        {/* ── Program Structure ── */}
        <section id="structure" className="container-premium py-14">
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/6 border border-white/10 mb-4">
              <span className="text-xs font-semibold text-dark-300 tracking-widest uppercase">Program Structure</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
              Three phases, one continuous journey
            </h2>
            <p className="text-dark-400 max-w-xl leading-relaxed">
              The fellowship is structured in phases to ensure depth, continuity, and accountability
              — not a collection of disconnected events.
            </p>
          </div>

          <div className="space-y-6">
            {phases.map((phase) => (
              <div
                key={phase.number}
                className={`rounded-2xl ${phase.bg} border ${phase.border} p-7 md:p-9`}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Phase number + header */}
                  <div className="flex-shrink-0 space-y-2">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${phase.color} flex items-center justify-center text-white font-bold text-lg`}
                    >
                      {phase.number}
                    </div>
                    <p className={`text-xs font-semibold uppercase tracking-wider ${phase.tag}`}>
                      {phase.duration}
                    </p>
                  </div>

                  <div className="flex-1 space-y-4">
                    <h3 className="text-xl font-display font-bold text-white">{phase.title}</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {phase.items.map((item) => (
                        <div key={item} className="flex items-start gap-3">
                          <CheckCircle className={`w-4 h-4 ${phase.tag} flex-shrink-0 mt-0.5`} />
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
          <div className="rounded-3xl bg-gradient-to-br from-primary-900/35 via-dark-900/50 to-accent-900/25 border border-primary-500/15 p-10 md:p-14">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600">
                    <Repeat2 className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-semibold text-primary-400 uppercase tracking-wider">The Multiplier Approach</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-white leading-snug">
                  Each fellow extends the impact beyond themselves
                </h2>
                <p className="text-dark-300 leading-relaxed">
                  The fellowship expects fellows not just to receive, but to pass it on. After completing
                  the program, every fellow is required to take one concrete multiplier action in their
                  community or network.
                </p>
                <p className="text-dark-400 text-sm">
                  This is how one cohort becomes a hundred — and how the fellowship builds a broader
                  network of equipped and active young people across Africa.
                </p>
              </div>

              <div className="space-y-3">
                {multiplierSteps.map((step, i) => (
                  <div
                    key={step}
                    className="flex items-start gap-4 rounded-xl bg-white/4 border border-white/8 p-4"
                  >
                    <div className="w-7 h-7 rounded-full bg-primary-500/20 border border-primary-500/30 flex items-center justify-center text-primary-400 font-bold text-xs flex-shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-sm text-dark-200 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── What Participants Gain ── */}
        <section className="container-premium py-14">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/6 border border-white/10 mb-4">
              <span className="text-xs font-semibold text-dark-300 tracking-widest uppercase">What You Gain</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
              What participants leave with
            </h2>
            <p className="text-dark-400 max-w-xl mx-auto">
              The fellowship is designed to deliver specific, measurable outcomes — not generic self-improvement.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {gains.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className={`rounded-2xl ${item.bg} border ${item.border} p-6 space-y-4`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className={`text-lg font-bold ${item.text}`}>{item.title}</h3>
                  <p className="text-sm text-dark-300 leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* ── Who It's For ── */}
        <section className="container-premium py-14">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600">
                  <Lightbulb className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Who It's For</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight">
                Who should apply
              </h2>
              <p className="text-dark-300 leading-relaxed">
                The fellowship is not selective on the basis of credentials or status. It is selective
                on the basis of commitment, intention, and readiness to do real work.
              </p>

              <div className="space-y-3">
                {criteria.map((c) => (
                  <div key={c} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-dark-200 leading-relaxed">{c}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-xl bg-blue-500/8 border border-blue-500/20 p-4 text-sm text-blue-300 leading-relaxed">
                The program is open to individuals at different levels of experience — what matters
                is demonstrated commitment and willingness to engage seriously with the process.
              </div>
            </div>

            {/* Vision panel */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Vision & Scale</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight">
                Where this is going
              </h2>
              <p className="text-dark-300 leading-relaxed">
                The Rise for Impact Fellowship is part of a broader long-term goal: to build a
                generation of young African leaders who are equipped, accountable, and actively
                contributing to development in their communities.
              </p>

              <div className="space-y-4">
                {[
                  { label: 'Cohort 1', detail: 'Cameroon — 2026', color: 'text-primary-400', bg: 'bg-primary-500/10', border: 'border-primary-500/20' },
                  { label: 'Expansion', detail: 'Ghana, Nigeria & Rwanda — planned', color: 'text-accent-400', bg: 'bg-accent-500/10', border: 'border-accent-500/20' },
                  { label: 'Long-term', detail: 'Pan-African alumni network contributing to community development', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
                ].map((v) => (
                  <div
                    key={v.label}
                    className={`flex items-start gap-4 rounded-xl ${v.bg} border ${v.border} p-4`}
                  >
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${v.color.replace('text-', 'bg-')}`} />
                    <div>
                      <p className={`text-sm font-semibold ${v.color}`}>{v.label}</p>
                      <p className="text-xs text-dark-400 mt-0.5">{v.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-sm text-dark-400 italic border-l-2 border-emerald-500/30 pl-4">
                Starting small, building correctly, and expanding from a foundation of real results.
              </p>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="container-premium pt-6">
          <div className="rounded-3xl bg-gradient-to-br from-primary-900/40 via-dark-900/55 to-accent-900/30 border border-primary-500/15 p-12 md:p-16 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/15 border border-primary-500/25 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
              <span className="text-xs font-semibold text-primary-400 tracking-widest uppercase">
                Cohort 1 — Applications open April 15, 2026
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Ready to apply?
            </h2>
            <p className="text-dark-300 mb-8 max-w-xl mx-auto leading-relaxed">
              Applications for the first cohort open on April 15, 2026. Spots are limited.
              If you meet the criteria and are prepared to commit, we'd like to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/get-involved"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold transition-colors"
              >
                Apply for the Fellowship <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/12 hover:bg-white/5 text-white font-semibold transition-colors"
              >
                Explore Other Programs
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
