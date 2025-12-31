'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Download, Share2, MapPin, Calendar } from 'lucide-react'
import { useState, useEffect } from 'react'

interface LightboxProps {
  images: {
    src: string
    title: string
    description?: string
    location?: string
    date?: string
    category?: string
  }[]
  currentIndex: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

export function Lightbox({ images, currentIndex, onClose, onNext, onPrev }: LightboxProps) {
  const currentImage = images[currentIndex]
  const [shareSuccess, setShareSuccess] = useState(false)

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, onNext, onPrev])

  // Download image
  const handleDownload = async () => {
    try {
      const response = await fetch(currentImage.src)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `rise-for-impact-${currentImage.title.toLowerCase().replace(/\s+/g, '-')}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  // Share image
  const handleShare = async () => {
    const shareData = {
      title: currentImage.title,
      text: currentImage.description || 'Check out this impact story from Rise for Impact!',
      url: window.location.href
    }

    try {
      if (navigator.share) {
        // Use native share if available (mobile)
        await navigator.share(shareData)
      } else {
        // Copy link to clipboard as fallback
        await navigator.clipboard.writeText(window.location.href)
        setShareSuccess(true)
        setTimeout(() => setShareSuccess(false), 2000)
      }
    } catch (error) {
      // If sharing fails, try clipboard as backup
      try {
        await navigator.clipboard.writeText(window.location.href)
        setShareSuccess(true)
        setTimeout(() => setShareSuccess(false), 2000)
      } catch (clipboardError) {
        console.error('Share failed:', error)
      }
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-dark-900/95 backdrop-blur-xl"
        onClick={onClose}
      >
        {/* Close Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-3 rounded-full bg-dark-800/80 hover:bg-dark-700 text-white backdrop-blur-sm transition-colors"
        >
          <X className="w-6 h-6" />
        </motion.button>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.1 }}
              onClick={(e) => {
                e.stopPropagation()
                onPrev()
              }}
              className="absolute left-6 z-50 p-3 rounded-full bg-dark-800/80 hover:bg-dark-700 text-white backdrop-blur-sm transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.1 }}
              onClick={(e) => {
                e.stopPropagation()
                onNext()
              }}
              className="absolute right-6 z-50 p-3 rounded-full bg-dark-800/80 hover:bg-dark-700 text-white backdrop-blur-sm transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </>
        )}

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-7xl w-full mx-4 md:mx-8"
        >
          {/* Image */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative rounded-2xl overflow-hidden mb-6"
          >
            <img
              src={currentImage.src}
              alt={currentImage.title}
              className="w-full max-h-[70vh] object-contain mx-auto"
            />
            
            {/* Gradient Overlay for Better Text Visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent pointer-events-none" />
          </motion.div>

          {/* Image Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 rounded-2xl"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {currentImage.title}
                </h3>
                {currentImage.description && (
                  <p className="text-dark-300 text-sm leading-relaxed">
                    {currentImage.description}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleDownload}
                  className="p-2 rounded-lg bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white transition-colors"
                  title="Download Image"
                >
                  <Download className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleShare}
                  className="relative p-2 rounded-lg bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white transition-colors"
                  title="Share"
                >
                  <Share2 className="w-5 h-5" />
                  {shareSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg bg-green-500 text-white text-xs font-medium whitespace-nowrap"
                    >
                      Link copied!
                    </motion.div>
                  )}
                </motion.button>
              </div>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 text-sm text-dark-400">
              {currentImage.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  <span>{currentImage.location}</span>
                </div>
              )}
              {currentImage.date && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>{currentImage.date}</span>
                </div>
              )}
              {currentImage.category && (
                <div className="px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 text-xs font-medium">
                  {currentImage.category}
                </div>
              )}
            </div>

            {/* Counter */}
            <div className="mt-4 pt-4 border-t border-dark-700 text-center text-sm text-dark-400">
              {currentIndex + 1} of {images.length}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
