'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FileText, Calendar, User, ArrowRight, TrendingUp } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AnimatedSection } from '@/components/animations/motion-wrappers'
import { SectionParallax } from '@/components/animations/parallax-background'
import Link from 'next/link'
import Image from 'next/image'

interface BlogPost {
  id: number
  title: string
  excerpt?: string
  author?: string
  date?: string
  category?: string
  url?: string
  image?: string
  createdAt: string
}

interface NormalizedPost {
  id: number
  title: string
  excerpt: string
  author: string
  date: string
  readTime: string
  category: string
  image: string
  url: string
}

export function Blog() {
  const [posts, setPosts] = useState<NormalizedPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('/api/blogs')
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to fetch blogs')
        return res.json()
      })
      .then((data: BlogPost[]) => {
        const normalized: NormalizedPost[] = data.map((post) => ({
          id: post.id,
          title: post.title,
          excerpt: post.excerpt || 'Read more about this topic...',
          author: post.author || 'Rise for Impact Team',
          date: post.date || new Date(post.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }),
          readTime: '5 min read',
          category: post.category || 'Updates',
          image: post.image || '/images/backgrounds/bg.jpeg',
          url: `/blog/${post.id}`,
        }))
        setPosts(normalized)
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }, [])

  const allPosts = posts

  return (
    <section id="blog" className="py-12 md:py-16 relative overflow-hidden">
      {/* Parallax Background */}
      <SectionParallax image="/images/backgrounds/club-hero.jpeg" intensity={0.3} />
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-800/50 via-dark-900/40 to-dark-800/50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(34,197,94,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(245,158,11,0.08),transparent_50%)]" />

      <div className="container-premium relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20"
          >
            <FileText className="w-4 h-4 text-accent-400" />
            <span className="text-sm font-medium text-accent-400">Blog & Insights</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-display font-bold">
            <span className="text-white">Latest </span>
            <span className="text-gradient">Stories</span>
          </h2>

          <p className="text-xl text-dark-300 max-w-3xl mx-auto leading-relaxed">
            Insights, stories, and perspectives from the frontlines of youth-led 
            social change across Africa.
          </p>
        </AnimatedSection>

        {/* Loading skeleton */}
        {isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[400px] rounded-3xl bg-white/5 animate-pulse" />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && allPosts.length === 0 && (
          <AnimatedSection className="text-center py-20">
            <div className="glass-card p-12 rounded-3xl max-w-lg mx-auto space-y-4">
              <FileText className="w-12 h-12 text-dark-500 mx-auto" />
              <h3 className="text-xl font-semibold text-white">No posts yet</h3>
              <p className="text-dark-400">
                We're working on our first stories. Check back soon.
              </p>
            </div>
          </AnimatedSection>
        )}

        {/* Featured Post */}
        {!isLoading && allPosts[0] && (
          <AnimatedSection className="mb-16">
            <Card className="group overflow-hidden hover:scale-[1.01] transition-all duration-500">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative h-80 md:h-auto overflow-hidden">
                  <img 
                    src={allPosts[0].image}
                    alt={allPosts[0].title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-dark-900 via-dark-900/60 to-transparent" />
                  
                  <div className="absolute top-6 left-6">
                    <Badge variant="gradient" size="lg">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Featured Post
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-12 flex flex-col justify-center space-y-6">
                  <div className="flex items-center gap-4 text-sm text-dark-400">
                    <Badge variant="primary" size="sm">{allPosts[0].category}</Badge>
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {allPosts[0].date}
                    </span>
                    <span>{allPosts[0].readTime}</span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight group-hover:text-primary-400 transition-colors">
                    {allPosts[0].title}
                  </h3>

                  <p className="text-dark-300 text-lg leading-relaxed">
                    {allPosts[0].excerpt}
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-primary-500 to-accent-500">
                        {allPosts[0].author === 'Claude Tomoh' ? (
                          <Image
                            src="/images/team/Claude_Tomoh.jpeg"
                            alt={allPosts[0].author}
                            fill
                            className="object-cover"
                          />
                        ) : allPosts[0].author === 'Emmanuel Elikem Kpeli' || allPosts[0].author === 'Emmanuel' ? (
                          <Image
                            src="/images/team/Emmanuel.jpg"
                            alt={allPosts[0].author}
                            fill
                            className="object-cover"
                          />
                        ) : allPosts[0].author === 'Esther Owusu Boahemaa' ? (
                          <Image
                            src="/images/team/Esther.jpg"
                            alt={allPosts[0].author}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{allPosts[0].author}</div>
                        <div className="text-xs text-dark-500">Author</div>
                      </div>
                    </div>
                  </div>

                  <Link href={allPosts[0].url || '#'}>
                    <Button variant="primary" size="lg" rightIcon={<ArrowRight />} className="w-fit">
                      Read Full Story
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </AnimatedSection>
        )}

        {/* Blog Grid */}
        {!isLoading && allPosts.length > 1 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {allPosts.slice(1).map((post, index) => (
              <motion.div
                key={`${post.title}-${index}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
              <Link href={post.url || '#'}>
                <Card className="group h-full hover:scale-[1.02] transition-all duration-500 cursor-pointer">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden rounded-t-3xl">
                    <img 
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent" />
                    
                    <div className="absolute top-4 left-4">
                      <Badge variant="gradient" size="sm">{post.category}</Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-3 text-xs text-dark-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-xl font-display font-bold text-white line-clamp-2 group-hover:text-primary-400 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-dark-300 text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="pt-4 border-t border-dark-700 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-primary-500 to-accent-500">
                          {post.author === 'Claude Tomoh' ? (
                            <Image
                              src="/images/team/Claude_Tomoh.jpeg"
                              alt={post.author}
                              fill
                              className="object-cover"
                            />
                          ) : post.author === 'Emmanuel Elikem Kpeli' || post.author === 'Emmanuel' ? (
                            <Image
                              src="/images/team/Emmanuel.jpg"
                              alt={post.author}
                              fill
                              className="object-cover"
                            />
                          ) : post.author === 'Esther Owusu Boahemaa' ? (
                            <Image
                              src="/images/team/Esther.jpg"
                              alt={post.author}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <User className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>
                        <span className="text-sm text-dark-400">{post.author}</span>
                      </div>
                      <ArrowRight className="w-5 h-5 text-primary-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
        )}

        {/* View All CTA */}
        {!isLoading && allPosts.length > 0 && (
          <AnimatedSection className="text-center">
            <Link href="/blog">
              <Button variant="outline" size="lg" rightIcon={<ArrowRight />}>
                View All Articles
              </Button>
            </Link>
          </AnimatedSection>
        )}
      </div>
    </section>
  )
}
