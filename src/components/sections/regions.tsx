'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, Users, TrendingUp, Globe, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedSection } from '@/components/animations/motion-wrappers'
import { SectionParallax } from '@/components/animations/parallax-background'

const regions = [
  {
    name: 'Cameroon',
    code: 'CM',
    description: 'Our founding and most active country, with chapters in the Northwest and Southwest regions driving leadership development, community projects, and youth engagement.',
    color: 'from-primary-500 to-primary-600',
    coordinator: 'Nawal Chefton',
    highlights: [
      'Northwest & Southwest regional chapters',
      'Rise Circles leadership training',
      'Impact Clinics & community development',
    ],
    exploreLink: '/regions#northwest',
  },
  {
    name: 'Ghana',
    code: 'GH',
    description: 'Active chapters at Ashesi University and Academic City, engaging student leaders in leadership, innovation, and social impact programming.',
    color: 'from-accent-500 to-accent-600',
    coordinator: 'Akurugu Princess',
    highlights: [
      'Ashesi University Chapter — active',
      'Academic City Chapter — launched 2025',
      'LinkedIn & professional skills workshops',
    ],
    exploreLink: '/regions#ghana',
  },
  {
    name: 'Nigeria',
    code: 'NG',
    description: 'Growing presence with flagship sessions, opportunity sharing, and community-building activities reaching youth across the country.',
    color: 'from-blue-500 to-blue-600',
    coordinator: 'Kareen Ajatitton',
    highlights: [
      'Flagship speaker sessions',
      'Opportunity sharing & guidance',
      'Digital community engagement',
    ],
    exploreLink: '/regions#nigeria',
  },
  {
    name: 'Rwanda',
    code: 'RW',
    description: 'Our newest active country, building foundational community and programming under strong local coordination.',
    color: 'from-purple-500 to-purple-600',
    coordinator: 'Regine Niyorukundo',
    highlights: [
      'Community onboarding underway',
      'Local coordination established',
      'Programs launching 2026',
    ],
    exploreLink: '/regions#rwanda',
  },
]

const stats = [
  { label: 'Active Countries', value: '4', icon: Globe },
  { label: 'Active Clubs', value: '4+', icon: MapPin },
  { label: 'Youth Engaged', value: '500+', icon: Users },
  { label: 'Flagship Sessions', value: '4', icon: TrendingUp }
]

export function Regions() {
  return (
    <section id="regions" className="py-8 md:py-12 relative overflow-hidden">
      {/* Parallax Background */}
      <SectionParallax image="/images/backgrounds/bg.jpeg" intensity={0.3} />
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/50 via-dark-800/40 to-dark-900/50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(34,197,94,0.08),transparent_50%)]" />

      <div className="container-premium relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-8 md:mb-12 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20"
          >
            <MapPin className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs md:text-sm font-medium text-blue-400">Our Regions</span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-display font-bold">
            <span className="text-white">Where We </span>
            <span className="text-gradient">Work</span>
          </h2>

          <p className="text-xl text-dark-300 max-w-3xl mx-auto leading-relaxed">
            Rise for Impact is currently active in Cameroon, Ghana, Nigeria, and Rwanda — 
            building programs and communities grounded in real, verifiable impact.
          </p>
        </AnimatedSection>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 md:mb-12">
          {stats.map((stat, index) => {
            const colors = [
              { icon: 'text-blue-400', gradient: 'from-blue-500 to-blue-600', bg: 'from-blue-500/20 to-blue-600/10', border: 'border-blue-500/30', glow: 'shadow-blue-500/20' },
              { icon: 'text-emerald-400', gradient: 'from-emerald-500 to-emerald-600', bg: 'from-emerald-500/20 to-emerald-600/10', border: 'border-emerald-500/30', glow: 'shadow-emerald-500/20' },
              { icon: 'text-purple-400', gradient: 'from-purple-500 to-purple-600', bg: 'from-purple-500/20 to-purple-600/10', border: 'border-purple-500/30', glow: 'shadow-purple-500/20' },
              { icon: 'text-amber-400', gradient: 'from-amber-500 to-amber-600', bg: 'from-amber-500/20 to-amber-600/10', border: 'border-amber-500/30', glow: 'shadow-amber-500/20' },
            ];
            const color = colors[index % colors.length];
            
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring" }}
                whileHover={{ y: -6, scale: 1.03 }}
                className={`relative group overflow-hidden rounded-2xl backdrop-blur-xl border ${color.border} bg-gradient-to-br ${color.bg} hover:shadow-2xl ${color.glow} transition-all duration-300`}
              >
                {/* Shimmer Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
                
                {/* Content */}
                <div className="relative z-10 p-4 md:p-5 text-center">
                  {/* Icon with pulse */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.15 }}
                    transition={{ duration: 0.6, type: "spring" }}
                    className={`relative w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 rounded-xl bg-gradient-to-br ${color.gradient} flex items-center justify-center shadow-lg ${color.glow}`}
                  >
                    <stat.icon className={`w-5 h-5 md:w-6 md:h-6 ${color.icon}`} />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`absolute inset-0 rounded-xl bg-gradient-to-br ${color.gradient} opacity-50`}
                    />
                  </motion.div>
                  
                  {/* Value */}
                  <div className="text-2xl md:text-3xl font-display font-bold mb-1 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  
                  {/* Label */}
                  <div className="text-dark-300 text-xs md:text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
                
                {/* Corner accent */}
                <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${color.gradient} rounded-bl-full opacity-20`} />
              </motion.div>
            );
          })}
        </div>

        {/* Countries Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {regions.map((region, index) => (
            <motion.div
              key={region.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <div className="group glass-card rounded-2xl p-6 h-full flex flex-col gap-4 hover:scale-[1.02] transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${region.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                    <span className="text-sm font-bold text-white">{region.code}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-white">{region.name}</h3>
                    <p className="text-xs text-dark-400">Coordinator: {region.coordinator}</p>
                  </div>
                </div>

                <p className="text-sm text-dark-300 leading-relaxed">{region.description}</p>

                <ul className="space-y-1.5 flex-1">
                  {region.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-dark-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-1.5 flex-shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <Link href={region.exploreLink}>
                  <Button variant="ghost" size="sm" className="w-full group-hover:bg-white/5 flex items-center justify-center gap-1">
                    Explore Region <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection className="text-center">
          <div className="glass-card p-12 rounded-3xl max-w-3xl mx-auto">
            <h3 className="text-3xl font-display font-bold text-white mb-4">
              Start a Chapter in Your Region
            </h3>
            <p className="text-dark-300 text-lg mb-8">
              Want to bring Rise for Impact to your community? We support passionate 
              leaders to establish new regional chapters.
            </p>
            <Link href="/get-involved">
              <Button variant="primary" size="lg">
                Apply to Start a Chapter
              </Button>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
