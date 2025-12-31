'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <>
      {/* Top progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-600 transform origin-left z-50 shadow-lg shadow-primary-500/50"
      />
      
      {/* Optional: Bottom accent line */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-400/50 to-transparent transform origin-left z-50"
      />
    </>
  )
}
