'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface PremiumPageLayoutProps {
  children: ReactNode
  title: string
  subtitle?: string
  icon?: ReactNode
  gradient?: 'emerald' | 'blue' | 'purple' | 'orange'
}

export function PremiumPageLayout({ 
  children, 
  title, 
  subtitle, 
  icon,
  gradient = 'emerald' 
}: PremiumPageLayoutProps) {
  const gradients = {
    emerald: 'from-emerald-500/20 via-teal-500/20 to-green-500/20',
    blue: 'from-blue-500/20 via-cyan-500/20 to-indigo-500/20',
    purple: 'from-purple-500/20 via-pink-500/20 to-fuchsia-500/20',
    orange: 'from-orange-500/20 via-amber-500/20 to-yellow-500/20',
  }

  const glowColors = {
    emerald: 'shadow-emerald-500/30',
    blue: 'shadow-blue-500/30',
    purple: 'shadow-purple-500/30',
    orange: 'shadow-orange-500/30',
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${gradients[gradient]} rounded-full blur-3xl`}
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className={`absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr ${gradients[gradient]} rounded-full blur-3xl`}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 py-16 md:py-24">
        <div className="container max-w-5xl px-4">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            {icon && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${gradients[gradient]} backdrop-blur-sm mb-6 ${glowColors[gradient]} shadow-2xl`}
              >
                {icon}
              </motion.div>
            )}
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-white mb-4 bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent leading-tight">
              {title}
            </h1>
            
            {subtitle && (
              <p className="text-base md:text-lg text-dark-300 max-w-3xl mx-auto font-medium">
                {subtitle}
              </p>
            )}
          </motion.div>

          {/* Main Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="glass-card rounded-3xl overflow-hidden backdrop-blur-xl border border-white/10 shadow-2xl"
          >
            <div className="p-6 md:p-10">
              {children}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
