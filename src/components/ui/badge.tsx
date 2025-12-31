'use client'

import { HTMLAttributes } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'gradient'
  size?: 'sm' | 'md' | 'lg'
  removable?: boolean
  onRemove?: () => void
  animated?: boolean
}

export function Badge({
  className,
  variant = 'primary',
  size = 'md',
  removable,
  onRemove,
  animated = true,
  children,
  ...props
}: BadgeProps) {
  const variants = {
    primary: 'bg-primary-500/20 text-primary-300 border-primary-500/30',
    secondary: 'bg-dark-700 text-dark-200 border-dark-600',
    success: 'bg-green-500/20 text-green-300 border-green-500/30',
    warning: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    danger: 'bg-red-500/20 text-red-300 border-red-500/30',
    info: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    gradient: 'bg-gradient-to-r from-primary-500/30 to-accent-500/30 text-primary-200 border-primary-500/30',
  }

  const sizes = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2',
  }

  const baseClassName = cn(
    'inline-flex items-center gap-1.5 font-medium rounded-full border backdrop-blur-sm',
    variants[variant],
    sizes[size],
    className
  )

  const content = (
    <>
      {children}
      {removable && (
        <button
          onClick={onRemove}
          className="hover:bg-white/10 rounded-full p-0.5 transition-colors"
          aria-label="Remove"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </>
  )

  if (animated) {
    return (
      <motion.div
        className={baseClassName}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        {content}
      </motion.div>
    )
  }

  return (
    <div className={baseClassName} {...props}>
      {content}
    </div>
  )
}

export interface StatusBadgeProps extends HTMLAttributes<HTMLDivElement> {
  status: 'online' | 'offline' | 'away' | 'busy'
  showText?: boolean
}

export function StatusBadge({ status, showText, className, ...props }: StatusBadgeProps) {
  const statusConfig = {
    online: { color: 'bg-green-500', text: 'Online', ring: 'ring-green-500/50' },
    offline: { color: 'bg-gray-500', text: 'Offline', ring: 'ring-gray-500/50' },
    away: { color: 'bg-yellow-500', text: 'Away', ring: 'ring-yellow-500/50' },
    busy: { color: 'bg-red-500', text: 'Busy', ring: 'ring-red-500/50' },
  }

  const config = statusConfig[status]

  return (
    <div className={cn('inline-flex items-center gap-2', className)} {...props}>
      <span className={cn('relative flex h-3 w-3')}>
        <span className={cn('absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping', config.color)} />
        <span className={cn('relative inline-flex h-3 w-3 rounded-full ring-2', config.color, config.ring)} />
      </span>
      {showText && (
        <span className="text-sm font-medium text-dark-300">{config.text}</span>
      )}
    </div>
  )
}

export interface CountBadgeProps extends HTMLAttributes<HTMLDivElement> {
  count: number
  max?: number
  variant?: 'primary' | 'danger'
}

export function CountBadge({ count, max = 99, variant = 'primary', className, ...props }: CountBadgeProps) {
  const displayCount = count > max ? `${max}+` : count
  
  const variants = {
    primary: 'bg-primary-500 text-white',
    danger: 'bg-red-500 text-white',
  }

  if (count === 0) return null

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={cn(
        'inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold rounded-full',
        variants[variant],
        className
      )}
    >
      {displayCount}
    </motion.div>
  )
}
