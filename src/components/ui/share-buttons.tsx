'use client'

import { useState } from 'react'
import { Share2, Copy, Check, Facebook, Twitter, Linkedin, Mail } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'

interface ShareButtonsProps {
  url?: string
  title: string
  description?: string
  hashtags?: string[]
}

export function ShareButtons({ url, title, description, hashtags = [] }: ShareButtonsProps) {
  const [showMenu, setShowMenu] = useState(false)
  const [copied, setCopied] = useState(false)

  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '')
  const encodedUrl = encodeURIComponent(shareUrl)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description || '')
  const hashtagString = hashtags.join(',')

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}${hashtagString ? `&hashtags=${hashtagString}` : ''}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      toast.success('Link copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error('Failed to copy link')
    }
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: shareUrl,
        })
      } catch (error) {
        // User cancelled share
      }
    } else {
      setShowMenu(!showMenu)
    }
  }

  return (
    <div className="relative">
      <button
        onClick={handleNativeShare}
        className="flex items-center gap-2 px-4 py-2 bg-dark-800 hover:bg-dark-700 border border-dark-700 hover:border-primary-500/50 rounded-lg transition-all group"
      >
        <Share2 className="w-4 h-4 text-dark-400 group-hover:text-primary-400 transition-colors" />
        <span className="text-sm text-dark-300 group-hover:text-white transition-colors">Share</span>
      </button>

      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            className="absolute top-full mt-2 right-0 bg-dark-800 border border-dark-700 rounded-xl shadow-2xl p-2 min-w-[200px] z-50"
          >
            <a
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-dark-700 rounded-lg transition-colors group"
            >
              <Facebook className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-dark-300 group-hover:text-white">Facebook</span>
            </a>

            <a
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-dark-700 rounded-lg transition-colors group"
            >
              <Twitter className="w-4 h-4 text-sky-400" />
              <span className="text-sm text-dark-300 group-hover:text-white">Twitter</span>
            </a>

            <a
              href={shareLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-dark-700 rounded-lg transition-colors group"
            >
              <Linkedin className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-dark-300 group-hover:text-white">LinkedIn</span>
            </a>

            <a
              href={shareLinks.email}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-dark-700 rounded-lg transition-colors group"
            >
              <Mail className="w-4 h-4 text-accent-400" />
              <span className="text-sm text-dark-300 group-hover:text-white">Email</span>
            </a>

            <div className="h-px bg-dark-700 my-2" />

            <button
              onClick={handleCopyLink}
              className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-dark-700 rounded-lg transition-colors group"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-green-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-dark-400 group-hover:text-primary-400" />
                  <span className="text-sm text-dark-300 group-hover:text-white">Copy Link</span>
                </>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
