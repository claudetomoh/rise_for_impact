'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Clock,
  MapPin,
  Building2,
  ExternalLink,
  Star,
  TrendingUp,
  Briefcase,
  GraduationCap,
  Trophy,
  Lightbulb,
} from 'lucide-react'

interface Opportunity {
  id: number
  title: string
  description: string
  organization?: string | null
  deadline?: string | null
  applyLink: string
  image?: string | null
  category?: string | null
  location?: string | null
  isFeatured: boolean
  views: number
}

const categoryIcons: { [key: string]: any } = {
  Scholarship: GraduationCap,
  Internship: Briefcase,
  Job: TrendingUp,
  Competition: Trophy,
  Training: Lightbulb,
  Fellowship: Star,
  Grant: Star,
}

export default function OpportunitiesSection() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    fetchOpportunities()
  }, [])

  const fetchOpportunities = async () => {
    try {
      const response = await fetch('/api/opportunities?activeOnly=true&featuredOnly=true')
      if (response.ok) {
        const data = await response.json()
        setOpportunities(data.slice(0, 6)) // Show max 6 featured opportunities
      }
    } catch (error) {
      console.error('Error fetching opportunities:', error)
    } finally {
      setLoading(false)
    }
  }

  const categories = ['all', ...new Set(opportunities.map((o) => o.category).filter(Boolean))] as string[]
  const filteredOpportunities =
    selectedCategory === 'all'
      ? opportunities
      : opportunities.filter((o) => o.category === selectedCategory)

  if (loading) {
    return (
      <section className="py-20 bg-dark-900">
        <div className="container-premium text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-dark-400">Loading opportunities...</p>
        </div>
      </section>
    )
  }

  if (opportunities.length === 0) {
    return null
  }

  return (
    <section className="py-20 relative overflow-hidden bg-dark-950">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(34,197,94,0.06),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(249,115,22,0.06),transparent_50%)]" />

      <div className="container-premium relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 mb-4">
            <TrendingUp className="w-3.5 h-3.5 text-primary-400" />
            <span className="text-xs font-medium text-primary-400">Featured Opportunities</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Don&apos;t Miss These{' '}
            <span className="text-gradient">Opportunities</span>
          </h2>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto">
            Handpicked scholarships, internships, and opportunities to accelerate your growth
          </p>
        </motion.div>

        {/* Category Filter */}
        {categories.length > 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/25'
                    : 'bg-dark-800/60 text-dark-300 hover:text-white border border-dark-600 hover:border-primary-500/40'
                }`}
              >
                {category === 'all' ? 'All' : category}
              </button>
            ))}
          </motion.div>
        )}

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpportunities.map((opportunity, index) => {
            const CategoryIcon =
              categoryIcons[opportunity.category || ''] || ExternalLink

            return (
              <motion.div
                key={opportunity.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="group h-full"
              >
                <div className="h-full flex flex-col rounded-2xl bg-dark-900/60 border border-white/8 hover:border-primary-500/30 overflow-hidden transition-all duration-300 hover:bg-dark-800/60">
                  {/* Image */}
                  {opportunity.image ? (
                    <div className="relative h-44 overflow-hidden flex-shrink-0">
                      <img
                        src={opportunity.image}
                        alt={opportunity.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 to-transparent"></div>
                      {opportunity.isFeatured && (
                        <div className="absolute top-3 right-3 bg-accent-500/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                          <Star className="w-3 h-3 fill-white" />
                          Featured
                        </div>
                      )}
                      {opportunity.category && (
                        <div className="absolute top-3 left-3 bg-dark-900/80 backdrop-blur-sm text-primary-400 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 border border-primary-500/30">
                          <CategoryIcon className="w-3 h-3" />
                          {opportunity.category}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-44 flex-shrink-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center">
                      <CategoryIcon className="w-14 h-14 text-primary-400/50" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col gap-3">
                    {opportunity.organization && (
                      <div className="flex items-center gap-2 text-dark-400 text-xs">
                        <Building2 className="w-3.5 h-3.5" />
                        <span className="font-medium truncate">{opportunity.organization}</span>
                      </div>
                    )}

                    <h3 className="text-base font-bold text-white line-clamp-2 group-hover:text-primary-300 transition-colors">
                      {opportunity.title}
                    </h3>

                    <p className="text-dark-400 text-sm line-clamp-3 flex-1">
                      {opportunity.description}
                    </p>

                    <div className="space-y-1.5">
                      {opportunity.deadline && (
                        <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1.5 rounded-lg">
                          <Clock className="w-3.5 h-3.5" />
                          <span className="font-medium">Deadline: {opportunity.deadline}</span>
                        </div>
                      )}
                      {opportunity.location && (
                        <div className="flex items-center gap-2 text-xs text-dark-400">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{opportunity.location}</span>
                        </div>
                      )}
                    </div>

                    <a
                      href={opportunity.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => { fetch(`/api/opportunities/${opportunity.id}`) }}
                      className="mt-auto w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white rounded-xl text-sm font-semibold transition-all shadow-lg hover:shadow-primary-500/25"
                    >
                      <span>Apply Now</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Footer */}
        {opportunities.length >= 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-dark-400 mb-5 text-sm">
              And many more opportunities waiting for you!
            </p>
            <a
              href="/opportunities"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-dark-800/60 border border-dark-600 hover:border-primary-500/40 text-white text-sm font-semibold hover:bg-dark-700/60 transition-all"
            >
              View All Opportunities
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        )}
      </div>
    </section>
  )
}

