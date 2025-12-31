'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ParallaxBackgroundProps {
  images: string[]
  sectionId?: string
}

export function ParallaxBackground({ images, sectionId }: ParallaxBackgroundProps) {
  const [scrollY, setScrollY] = useState(0)
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate which image should be visible based on scroll position
  const imageIndex = Math.floor((scrollY / 800) % images.length)

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {images.map((image, index) => {
        const isActive = index === imageIndex
        const offset = (scrollY * 0.5) % 1000

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{
              opacity: isActive ? 0.15 : 0,
              scale: isActive ? 1 : 1.1,
              y: isActive ? -offset * 0.3 : 0,
            }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${image})`,
                filter: 'blur(2px)',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-dark-900/90 via-dark-900/70 to-dark-900/90" />
          </motion.div>
        )
      })}
      
      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/95 via-dark-800/90 to-dark-900/95" />
    </div>
  )
}

// Individual section parallax - for section-specific backgrounds
export function SectionParallax({ 
  image, 
  intensity = 0.5 
}: { 
  image: string
  intensity?: number 
}) {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${intensity * 100}%`])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.2, 0.1])

  return (
    <motion.div
      style={{ y, opacity }}
      className="absolute inset-0 -z-10"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${image})`,
          filter: 'blur(3px)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/80 via-dark-900/70 to-dark-900/90" />
    </motion.div>
  )
}
