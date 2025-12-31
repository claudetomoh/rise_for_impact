'use client'

import { motion } from 'framer-motion'
import { Loader2, Sparkles } from 'lucide-react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'premium' | 'pulse'
  text?: string
  fullScreen?: boolean
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
}

export function LoadingSpinner({ 
  size = 'md', 
  variant = 'default',
  text,
  fullScreen = false
}: LoadingSpinnerProps) {
  const spinner = (
    <div className="flex flex-col items-center justify-center gap-4">
      {variant === 'default' && (
        <Loader2 className={`${sizeClasses[size]} text-primary-400 animate-spin`} />
      )}
      
      {variant === 'premium' && (
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className={`${sizeClasses[size]} rounded-full border-2 border-primary-500/20 border-t-primary-500`}
          />
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5] 
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className={`absolute inset-0 ${sizeClasses[size]} bg-primary-500/20 rounded-full blur-md`}
          />
        </div>
      )}

      {variant === 'pulse' && (
        <div className="relative">
          <Sparkles className={`${sizeClasses[size]} text-primary-400`} />
          <motion.div
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.3, 0, 0.3] 
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`absolute inset-0 ${sizeClasses[size]} bg-primary-500 rounded-full blur-lg`}
          />
        </div>
      )}

      {text && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-sm text-dark-300 font-medium"
        >
          {text}
        </motion.p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark-950/90 backdrop-blur-lg">
        {spinner}
      </div>
    )
  }

  return spinner
}

export function SkeletonLoader({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gradient-to-r from-dark-800 via-dark-700 to-dark-800 bg-[length:200%_100%] rounded-lg ${className}`}>
      <motion.div
        animate={{ backgroundPosition: ['0% 50%', '100% 50%'] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        className="w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent"
      />
    </div>
  )
}

export function ContentLoader() {
  return (
    <div className="space-y-4 p-6">
      <SkeletonLoader className="h-8 w-3/4" />
      <SkeletonLoader className="h-4 w-full" />
      <SkeletonLoader className="h-4 w-5/6" />
      <div className="grid grid-cols-3 gap-4 mt-6">
        <SkeletonLoader className="h-32" />
        <SkeletonLoader className="h-32" />
        <SkeletonLoader className="h-32" />
      </div>
    </div>
  )
}
