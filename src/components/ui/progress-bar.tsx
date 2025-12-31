'use client'

import { motion } from 'framer-motion'

interface ProgressBarProps {
  value: number
  max?: number
  label?: string
  showPercentage?: boolean
  variant?: 'default' | 'gradient' | 'glow'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-4',
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showPercentage = false,
  variant = 'default',
  size = 'md',
  className = '',
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  const variantClasses = {
    default: 'bg-primary-500',
    gradient: 'bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500',
    glow: 'bg-gradient-to-r from-primary-500 to-accent-500 shadow-lg shadow-primary-500/50',
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between text-sm">
          {label && <span className="text-dark-300 font-medium">{label}</span>}
          {showPercentage && (
            <span className="text-primary-400 font-semibold">{Math.round(percentage)}%</span>
          )}
        </div>
      )}

      <div className={`relative w-full ${sizeClasses[size]} rounded-full bg-dark-800 overflow-hidden`}>
        {/* Background glow */}
        {variant === 'glow' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-primary-500/20 blur-sm"
          />
        )}

        {/* Progress fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`relative h-full ${variantClasses[variant]} rounded-full`}
        >
          {/* Shimmer effect */}
          <motion.div
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
        </motion.div>
      </div>
    </div>
  )
}
