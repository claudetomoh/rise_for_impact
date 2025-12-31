'use client'

import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useState, useEffect } from 'react'

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  if (!isVisible) return null

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.9 }}
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-40 p-4 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-2xl shadow-primary-500/30 hover:shadow-primary-500/50 transition-shadow"
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-6 h-6" />
      
      {/* Pulse ring effect */}
      <motion.div
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.5, 0, 0.5] 
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity 
        }}
        className="absolute inset-0 rounded-full bg-primary-500"
      />
    </motion.button>
  )
}
