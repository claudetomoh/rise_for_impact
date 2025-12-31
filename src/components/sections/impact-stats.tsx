'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { TrendingUp, Users, Globe, Target, Award, Heart } from 'lucide-react'
import { AnimatedSection } from '@/components/animations/motion-wrappers'
import { SectionParallax } from '@/components/animations/parallax-background'
import { TiltCard } from '@/components/effects/tilt-card'

const stats = [
  {
    icon: Users,
    value: 1000,
    suffix: '+',
    label: 'Youth Impacted',
    description: 'Young leaders across Africa',
    color: 'from-primary-500 to-primary-600',
  },
  {
    icon: Globe,
    value: 8,
    suffix: '+',
    label: 'African Countries',
    description: 'Growing pan-African presence',
    color: 'from-accent-500 to-accent-600',
  },
  {
    icon: Target,
    value: 100,
    suffix: '+',
    label: 'Impact Projects',
    description: 'Community-driven initiatives',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Award,
    value: 5,
    suffix: '+',
    label: 'Partner Organizations',
    description: 'Growing collaborative networks',
    color: 'from-purple-500 to-purple-600',
  },
]

function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = (currentTime - startTime) / (duration * 1000)

      if (progress < 1) {
        setCount(Math.floor(value * progress))
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(value)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isInView, value, duration])

  return <div ref={ref}>{count.toLocaleString()}</div>
}

export function ImpactStats() {
  return (
    <section className="py-8 md:py-12 relative overflow-hidden">
      {/* Parallax Background */}
      <SectionParallax image="/images/backgrounds/impact1.jpeg" intensity={0.3} />
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-800/50 via-dark-900/40 to-dark-800/50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(34,197,94,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(245,158,11,0.1),transparent_50%)]" />

      <div className="container-premium relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-8 space-y-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-4"
          >
            <TrendingUp className="w-4 h-4 text-primary-400" />
            <span className="text-sm font-medium text-primary-400">Our Impact Journey</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-display font-bold">
            <span className="text-gradient">Transforming Lives</span>
            <br />
            <span className="text-white">Across Africa</span>
          </h2>

          <p className="text-lg text-dark-300 max-w-3xl mx-auto">
            Our numbers tell a story of collective action, sustainable impact, 
            and a growing movement of young changemakers.
          </p>
        </AnimatedSection>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <TiltCard key={stat.label} intensity={8}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative group h-full"
              >
                {/* Card */}
                <div className="relative overflow-hidden h-full rounded-2xl border border-dark-700/50 backdrop-blur-xl bg-gradient-to-br from-dark-800/90 via-dark-800/50 to-dark-900/90 shadow-2xl hover:shadow-primary-500/20 transition-all duration-500">
                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-2xl p-[1px]">
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-500`} />
                  </div>
                  
                  {/* Gradient Overlay on Hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-6 md:p-7 space-y-4">
                    {/* Icon with animated ring */}
                    <div className="relative">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6, type: "spring" }}
                        className={`relative w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow duration-300`}
                      >
                      <stat.icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                      {/* Pulse ring */}
                      <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-50`}
                      />
                    </motion.div>
                  </div>

                  {/* Number with gradient */}
                  <div className="space-y-1">
                    <div className="text-3xl md:text-4xl font-display font-bold flex items-baseline gap-1">
                      <span className="bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
                        <AnimatedCounter value={stat.value} />
                      </span>
                      <span className={`text-2xl bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>{stat.suffix}</span>
                    </div>
                  </div>

                  {/* Label */}
                  <div className="space-y-2 pt-2 border-t border-dark-700/50">
                    <div className="text-base md:text-lg font-semibold text-white group-hover:text-gray-100 transition-colors">
                      {stat.label}
                    </div>
                    <div className="text-dark-400 text-xs md:text-sm leading-relaxed">
                      {stat.description}
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className={`absolute -bottom-12 -right-12 w-40 h-40 bg-gradient-to-br ${stat.color} rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-all duration-700`} />
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.color} rounded-bl-full opacity-5`} />
              </div>
            </motion.div>
          </TiltCard>
          ))}
        </div>

        {/* Bottom CTA */}
        <AnimatedSection className="text-center mt-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-dark-300 text-lg mb-6"
          >
            These numbers represent real stories of transformation, leadership, and sustainable impact.
          </motion.p>
          <Link href="/#blog">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-premium px-8 py-4 rounded-2xl text-lg"
            >
              Read Impact Stories →
            </motion.button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}
