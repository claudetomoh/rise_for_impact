'use client'

import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'

interface BlogLikeButtonProps {
  blogId: number
  initialLikes: number
}

export function BlogLikeButton({ blogId, initialLikes }: BlogLikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [hasLiked, setHasLiked] = useState(false)

  useEffect(() => {
    // Check if user has already liked this post
    const liked = localStorage.getItem(`blog-${blogId}-liked`)
    if (liked === 'true') {
      setHasLiked(true)
    }
  }, [blogId])

  const handleLike = async () => {
    if (hasLiked) return
    
    try {
      const response = await fetch(`/api/blogs/${blogId}/like`, {
        method: 'POST',
      })
      
      if (response.ok) {
        const data = await response.json()
        setLikes(data.likes)
        setHasLiked(true)
        localStorage.setItem(`blog-${blogId}-liked`, 'true')
      }
    } catch (error) {
      console.error('Failed to like blog:', error)
    }
  }

  return (
    <button
      onClick={handleLike}
      disabled={hasLiked}
      className={`p-3 glass-card rounded-lg transition-all duration-300 flex items-center gap-2 ${
        hasLiked ? 'bg-red-500/20' : 'hover:bg-red-500/20'
      }`}
      aria-label="Like this post"
    >
      <Heart className={`h-5 w-5 ${hasLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
      <span className="text-white text-sm font-medium">{likes}</span>
    </button>
  )
}
