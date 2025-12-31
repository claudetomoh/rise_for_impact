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
      <section className="py-20 bg-gradient-to-br from-orange-50 via-white to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading opportunities...</p>
          </div>
        </div>
      </section>
    )
  }

  if (opportunities.length === 0) {
    return null // Don't show section if no opportunities
  }

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 via-white to-yellow-50 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-orange-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <TrendingUp className="w-4 h-4" />
            Featured Opportunities
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Don't Miss Out on These{' '}
            <span className="bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
              Opportunities
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-orange-600 to-yellow-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-orange-50 border border-gray-200'
                }`}
              >
                {category === 'all' ? 'All' : category}
              </button>
            ))}
          </motion.div>
        )}

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredOpportunities.map((opportunity, index) => {
            const CategoryIcon =
              categoryIcons[opportunity.category || ''] || ExternalLink

            return (
              <motion.div
                key={opportunity.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col border border-gray-100">
                  {/* Image */}
                  {opportunity.image ? (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={opportunity.image}
                        alt={opportunity.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      
                      {/* Featured Badge */}
                      {opportunity.isFeatured && (
                        <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                          <Star className="w-3 h-3 fill-white" />
                          Featured
                        </div>
                      )}

                      {/* Category Badge */}
                      {opportunity.category && (
                        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-orange-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
                          <CategoryIcon className="w-3 h-3" />
                          {opportunity.category}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center">
                      <CategoryIcon className="w-16 h-16 text-white opacity-50" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Organization */}
                    {opportunity.organization && (
                      <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
                        <Building2 className="w-4 h-4" />
                        <span className="font-medium">{opportunity.organization}</span>
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors">
                      {opportunity.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                      {opportunity.description}
                    </p>

                    {/* Meta Info */}
                    <div className="space-y-2 mb-4">
                      {opportunity.deadline && (
                        <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                          <Clock className="w-4 h-4" />
                          <span className="font-medium">
                            Deadline: {opportunity.deadline}
                          </span>
                        </div>
                      )}

                      {opportunity.location && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{opportunity.location}</span>
                        </div>
                      )}
                    </div>

                    {/* Apply Button */}
                    <a
                      href={opportunity.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        // Track view
                        fetch(`/api/opportunities/${opportunity.id}`)
                      }}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-yellow-600 text-white rounded-xl font-semibold hover:from-orange-700 hover:to-yellow-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      <span>Apply Now</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Back to Home / View More */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12 space-y-4"
        >
          {/* Back to Home Button - Always visible */}
          <div>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-600 to-yellow-600 text-white rounded-xl font-semibold hover:from-orange-700 hover:to-yellow-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                />
              </svg>
              <span>Back to Homepage</span>
            </a>
          </div>

          {/* View More - Only if 6 or more opportunities */}
          {opportunities.length >= 6 && (
            <div>
              <p className="text-gray-600 mb-4">
                And many more opportunities waiting for you!
              </p>
              <a
                href="/opportunities"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-600 rounded-xl font-semibold hover:bg-orange-50 transition-all shadow-lg hover:shadow-xl border-2 border-orange-600 transform hover:-translate-y-1"
              >
                View All Opportunities
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
