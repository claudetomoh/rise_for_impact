'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Globe, Users, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FadeIn, SlideIn, ScaleIn } from '@/components/animations/motion-wrappers'
import { Badge } from '@/components/ui/badge'
import { FloatingParticles } from '@/components/effects/floating-particles'
import { Magnetic } from '@/components/effects/magnetic'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 top-28">
        <img 
          src="/images/backgrounds/Teambg.png" 
          alt="Rise for Impact Community" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/95 via-green-900/90 to-teal-900/95" />
        
        {/* Floating Particles */}
        <FloatingParticles count={30} />
        
        {/* Animated Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-32 left-10 w-72 h-72 rounded-full blur-3xl"
          style={{background: 'radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 70%)'}}
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute bottom-20 right-10 w-72 h-72 rounded-full blur-3xl"
          style={{background: 'radial-gradient(circle, rgba(20,184,166,0.25) 0%, transparent 70%)'}}
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="container-premium relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <FadeIn direction="up" delay={0.3}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black leading-[1.1] tracking-tight">
                <span className="text-gradient drop-shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                  Rise Together,
                </span>
                <br />
                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                  Impact Forever
                </span>
              </h1>
            </FadeIn>

            <FadeIn direction="up" delay={0.4}>
              <p className="text-lg md:text-xl text-emerald-50/90 leading-relaxed max-w-2xl font-medium">
                Join a pan-African movement of young changemakers building <span className="text-emerald-300 font-bold">Africa's next generation of leaders</span> through transformative programs, climate innovation, and community-driven impact across <span className="text-emerald-300 font-bold">8+ countries</span>.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.5}>
              <div className="flex flex-wrap gap-4">
                <Magnetic strength={0.2}>
                  <a href="/get-involved">
                    <Button variant="primary" size="lg" className="flex items-center gap-2 shadow-2xl shadow-emerald-500/40 hover:shadow-emerald-500/60">
                      Apply Now
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </a>
                </Magnetic>
                <Magnetic strength={0.2}>
                  <a href="/#programs">
                    <Button variant="outline" size="lg" className="flex items-center gap-2 backdrop-blur-xl">
                      Explore Programs
                      <Globe className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    </Button>
                  </a>
                </Magnetic>
              </div>
            </FadeIn>
          </div>

          {/* Right Content - Interactive Visual */}
          <SlideIn from="right" delay={0.4}>
            <div className="relative mt-28 ml-16">
              {/* Main Card */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="glass-card p-8 rounded-3xl relative overflow-hidden"
              >
                {/* Hero Image */}
                <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                  <img 
                    src="/images/backgrounds/bg.jpeg"
                    alt="Rise for Impact Community"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating Elements */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute top-4 -right-4 glass p-5 rounded-2xl shadow-2xl hover:shadow-emerald-500/40 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/50">
                      <Users className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-white drop-shadow-lg">10K+</div>
                      <div className="text-xs font-semibold text-emerald-200/80 uppercase tracking-wider">Members</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, 10, 0],
                    rotate: [0, -5, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1,
                  }}
                  className="absolute bottom-4 -left-4 glass p-5 rounded-2xl shadow-2xl hover:shadow-teal-500/40 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/50">
                      <Globe className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-white drop-shadow-lg">8+</div>
                      <div className="text-xs font-semibold text-teal-200/80 uppercase tracking-wider">Countries</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </SlideIn>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-8 h-12 rounded-full border-2 border-dark-600 flex items-start justify-center p-2">
          <motion.div
            animate={{
              y: [0, 16, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-1.5 h-1.5 bg-primary-500 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  )
}
