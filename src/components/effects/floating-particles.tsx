'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

export function FloatingParticles({ count = 20 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([])
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    // Reduce particle count on touch devices to avoid GPU overload
    const isMobile = window.matchMedia('(pointer: coarse), (max-width: 767px)').matches
    const effectiveCount = isMobile ? Math.min(count, 6) : count

    const newParticles = Array.from({ length: effectiveCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
    }))
    setParticles(newParticles)
  }, [count])

  // No decorative animations when user requests reduced motion
  if (prefersReduced) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-br from-primary-400/40 to-accent-400/40 blur-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, -60, -30, 0],
            x: [0, 15, -15, 10, 0],
            opacity: [0.2, 0.5, 0.8, 0.5, 0.2],
            scale: [1, 1.2, 0.8, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
