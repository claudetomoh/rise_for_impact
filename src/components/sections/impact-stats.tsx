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

        {/* Stats Grid - In Cards like Core Values */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-6 rounded-2xl text-center hover:scale-105 transition-all duration-300"
            >
              {/* Centered Icon */}
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              
              {/* Number */}
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.value}<span className="text-emerald-400">+</span>
              </div>
              
              {/* Label */}
              <h3 className="text-lg font-bold text-white mb-2">
                {stat.label}
              </h3>
              
              {/* Description */}
              <p className="text-sm text-dark-400">
                {stat.description}
              </p>
            </motion.div>
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
