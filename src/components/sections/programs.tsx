'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Users, Globe, Sprout, Award, Megaphone, Briefcase, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedSection } from '@/components/animations/motion-wrappers'
import { SectionParallax } from '@/components/animations/parallax-background'

const programs = [
  {
    id: 'rise-circles',
    title: 'Rise Circles',
    icon: Users,
    color: 'from-primary-500 to-primary-600',
    summary: 'Peer learning circles where young leaders develop skills, collaborate on community challenges, and build lasting networks.',
  },
  {
    id: 'impact-clinics',
    title: 'Impact Clinics',
    icon: Sprout,
    color: 'from-accent-500 to-accent-600',
    summary: 'Youth-led clinics that identify community needs, design targeted solutions, and deliver measurable on-the-ground impact.',
  },
  {
    id: 'rise-for-climate',
    title: 'Rise for Climate',
    icon: Globe,
    color: 'from-blue-500 to-blue-600',
    summary: 'Environmental education, tree planting campaigns, and youth advocacy empowering Africa\'s next generation of climate actors.',
  },
  {
    id: 'fellowship',
    title: 'Rise for Impact Fellowship',
    icon: Award,
    color: 'from-yellow-500 to-yellow-600',
    summary: 'An annual intensive program building leadership, grant writing, storytelling, and public speaking skills for exceptional young changemakers.',
  },
  {
    id: 'campus-ambassadors',
    title: 'Campus Ambassadors',
    icon: Megaphone,
    color: 'from-indigo-500 to-indigo-600',
    summary: 'Student leaders trained and resourced to launch Rise for Impact chapters at their universities and grow campus communities.',
  },
  {
    id: 'opportunity-plug',
    title: 'Opportunity Plug',
    icon: Briefcase,
    color: 'from-orange-500 to-orange-600',
    summary: 'Curated fellowships, scholarships, and grants — delivered with application guidance so no opportunity goes unseen.',
  }
]

export function Programs() {
  return (
    <section id="programs" className="py-12 md:py-20 relative overflow-hidden">
      <SectionParallax image="/images/backgrounds/ClubMeeting2.jpeg" intensity={0.3} />
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/50 via-dark-800/40 to-dark-900/50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(34,197,94,0.08),transparent_50%)]" />

      <div className="container-premium relative z-10">
        {/* Header */}
        <AnimatedSection className="text-center mb-12 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20"
          >
            <Sprout className="w-4 h-4 text-primary-400" />
            <span className="text-sm font-medium text-primary-400">Our Programs</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-display font-bold">
            <span className="text-gradient">Six Ways We Work</span>
          </h2>

          <p className="text-lg text-dark-300 max-w-2xl mx-auto">
            Practical programs built for real contexts — each one grounded in community,
            designed for impact, and open to applicants across Africa.
          </p>
        </AnimatedSection>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {programs.map((program, index) => {
            const Icon = program.icon
            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07, duration: 0.4 }}
                className="group glass-card rounded-2xl p-6 flex flex-col gap-4 hover:scale-[1.02] transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${program.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-display font-bold text-white mb-2">{program.title}</h3>
                  <p className="text-sm text-dark-300 leading-relaxed">{program.summary}</p>
                </div>
                <Link href="/programs" className="mt-auto">
                  <Button variant="ghost" size="sm" className="w-full group-hover:bg-white/5 flex items-center justify-center gap-1">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <AnimatedSection className="text-center">
          <div className="glass-card p-8 md:p-10 rounded-3xl max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">
              Ready to Get Involved?
            </h3>
            <p className="text-dark-300 mb-6">
              Explore all programs or browse open opportunities across Africa.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/programs">
                <Button variant="primary" size="lg">Explore All Programs</Button>
              </Link>
              <Link href="/opportunities">
                <Button variant="outline" size="lg">Browse Opportunities</Button>
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
