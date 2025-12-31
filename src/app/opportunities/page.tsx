'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
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
  Filter,
  Search,
  ArrowLeft,
  Eye,
  Calendar,
  Target,
  Sparkles,
  Award,
  Flame,
  Zap,
  Users,
  DollarSign,
  Globe,
  ArrowUpRight,
  Bookmark,
  Share2,
  SlidersHorizontal,
  X,
} from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/sections/footer'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface Opportunity {
  id: number
  title: string
  description: string
  organization?: string | null
  deadline?: string | null
  eligibility?: string | null
  benefits?: string | null
  applyLink: string
  image?: string | null
  categories?: string | null // JSON string array
  location?: string | null
  isActive: boolean
  isFeatured: boolean
  views: number
  createdAt: string
}

const categoryIcons: { [key: string]: any } = {
  Scholarship: GraduationCap,
  Internship: Briefcase,
  Job: TrendingUp,
  Competition: Trophy,
  Training: Lightbulb,
  Fellowship: Award,
  Grant: Target,
  Other: Sparkles,
}

const categoryColors: { [key: string]: string } = {
  Scholarship: 'from-emerald-500 to-teal-600',
  Internship: 'from-green-500 to-emerald-600',
  Job: 'from-teal-500 to-cyan-600',
  Competition: 'from-emerald-600 to-green-700',
  Training: 'from-cyan-500 to-teal-600',
  Fellowship: 'from-teal-600 to-emerald-700',
  Grant: 'from-green-600 to-emerald-700',
  Other: 'from-gray-500 to-slate-600',
}

const categories = ['All', 'Scholarship', 'Internship', 'Job', 'Competition', 'Training', 'Fellowship', 'Grant', 'Other']

type SortOption = 'newest' | 'popular' | 'deadline'

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [showFeaturedOnly, setShowFeaturedOnly] = useState<boolean>(false)
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [savedOpportunities, setSavedOpportunities] = useState<Set<number>>(new Set())
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [locationFilter, setLocationFilter] = useState('')
  const [deadlineRange, setDeadlineRange] = useState<'all' | 'week' | 'month' | '3months'>('all')
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  useEffect(() => {
    fetchOpportunities()
    // Load saved opportunities from localStorage
    const saved = localStorage.getItem('savedOpportunities')
    if (saved) {
      setSavedOpportunities(new Set(JSON.parse(saved)))
    }
  }, [])

  const fetchOpportunities = async () => {
    try {
      const response = await fetch('/api/opportunities?activeOnly=true')
      if (response.ok) {
        const data = await response.json()
        setOpportunities(data)
      }
    } catch (error) {
      console.error('Error fetching opportunities:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleSaveOpportunity = (id: number) => {
    const newSaved = new Set(savedOpportunities)
    if (newSaved.has(id)) {
      newSaved.delete(id)
    } else {
      newSaved.add(id)
    }
    setSavedOpportunities(newSaved)
    localStorage.setItem('savedOpportunities', JSON.stringify(Array.from(newSaved)))
  }

  const filteredAndSortedOpportunities = useMemo(() => {
    let filtered = opportunities.filter((opp) => {
      // Parse categories array from JSON string
      const oppCategories: string[] = opp.categories ? JSON.parse(opp.categories) : []
      
      // Match if ANY of the opportunity's categories matches the selected category
      const matchesCategory = selectedCategory === 'All' || oppCategories.includes(selectedCategory)
      
      const matchesSearch =
        searchQuery === '' ||
        opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.organization?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        oppCategories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
        
      const matchesFeatured = !showFeaturedOnly || opp.isFeatured

      return matchesCategory && matchesSearch && matchesFeatured
    })

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.views - a.views
        case 'deadline':
          if (!a.deadline) return 1
          if (!b.deadline) return -1
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
        case 'newest':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })

    return filtered
  }, [opportunities, selectedCategory, searchQuery, showFeaturedOnly, sortBy])

  // Calculate urgency-focused stats
  const closingSoon = opportunities.filter((o) => {
    if (!o.deadline) return false
    const daysLeft = Math.ceil((new Date(o.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    return daysLeft > 0 && daysLeft <= 7
  }).length

  const newThisWeek = opportunities.filter((o) => {
    const createdDate = new Date(o.createdAt)
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    return createdDate >= weekAgo
  }).length

  const getTrendingBadge = (views: number) => {
    if (views > 100) return 'Hot'
    if (views > 50) return 'Trending'
    return null
  }

  const calculateDaysLeft = (deadline?: string | null) => {
    if (!deadline) return null
    const days = Math.ceil((new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    return days > 0 ? days : null
  }

  const toggleCategorySelection = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const clearAllFilters = () => {
    setSelectedCategory('All')
    setSearchQuery('')
    setShowFeaturedOnly(false)
    setSortBy('newest')
    setSelectedCategories([])
    setLocationFilter('')
    setDeadlineRange('all')
  }

  const activeFiltersCount = [
    selectedCategory !== 'All',
    searchQuery !== '',
    showFeaturedOnly,
    selectedCategories.length > 0,
    locationFilter !== '',
    deadlineRange !== 'all'
  ].filter(Boolean).length

  return (
    <>
      <Navbar />
      
      {/* Premium Hero Section with Glassmorphism */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Brand Overlay */}
        <div className="absolute inset-0">
          <img 
            src="/images/backgrounds/fellowship.jpeg" 
            alt="Opportunities" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/95 via-green-900/90 to-teal-900/95" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        {/* Floating Orbs Animation */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
            style={{background: 'radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 70%)'}}
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.15, 0.35, 0.15],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] rounded-full blur-3xl"
            style={{background: 'radial-gradient(circle, rgba(20,184,166,0.25) 0%, transparent 70%)'}}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-full text-sm font-bold mb-8 border border-white/30 shadow-2xl"
            >
              <Zap className="w-5 h-5 fill-emerald-300 text-emerald-300 animate-pulse" />
              <span className="bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
                Your Gateway to Success
              </span>
              <Sparkles className="w-5 h-5 text-emerald-300 animate-spin" style={{ animationDuration: '3s' }} />
            </motion.div>
            
            {/* Main Heading with Gradient */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight tracking-tight"
            >
              Discover Amazing
              <br />
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-emerald-200 via-teal-200 to-emerald-300 bg-clip-text text-transparent drop-shadow-2xl">
                  Opportunities
                </span>
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-500 opacity-30 blur-xl"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </span>
            </motion.h1>
            
            {/* Subtitle with Better Typography */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl md:text-2xl text-white/95 max-w-4xl mx-auto mb-12 leading-relaxed font-medium"
            >
              Handpicked <span className="font-bold text-emerald-100">scholarships</span>, <span className="font-bold text-emerald-100">internships</span>, <span className="font-bold text-emerald-100">fellowships</span>, and programs to accelerate your journey
            </motion.p>

            {/* Premium Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-6 mt-12"
            >
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl px-8 py-6 border border-white/20 hover:border-emerald-400/40 transition-all shadow-2xl hover:scale-105 transform duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <Target className="w-6 h-6 text-emerald-300" />
                    <div className="text-5xl font-black text-white">{opportunities.length}</div>
                  </div>
                  <div className="text-white/80 text-sm font-semibold">Total Opportunities</div>
                </div>
              </div>
              
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-400/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl px-8 py-6 border border-white/20 hover:border-orange-400/40 transition-all shadow-2xl hover:scale-105 transform duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-6 h-6 text-orange-300 animate-pulse" />
                    <div className="text-5xl font-black text-white">{closingSoon}</div>
                  </div>
                  <div className="text-white/80 text-sm font-semibold flex items-center gap-1">
                    <Zap className="w-4 h-4 text-orange-300" />
                    Closing This Week
                  </div>
                </div>
              </div>
              
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl px-8 py-6 border border-white/20 hover:border-cyan-400/40 transition-all shadow-2xl hover:scale-105 transform duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <Sparkles className="w-6 h-6 text-cyan-300 animate-pulse" />
                    <div className="text-5xl font-black text-white">{newThisWeek}</div>
                  </div>
                  <div className="text-white/80 text-sm font-semibold flex items-center gap-1">
                    <Star className="w-4 h-4 text-cyan-300 fill-cyan-300" />
                    New This Week
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-white rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Premium Search & Filter Section with Glassmorphism */}
      <section className="bg-white/80 backdrop-blur-xl py-8 sticky top-16 z-40 shadow-2xl border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Premium Search with Icon Animation - ENLARGED */}
            <div className="relative flex-1 w-full group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl blur-xl group-focus-within:blur-2xl transition-all opacity-0 group-focus-within:opacity-100"></div>
              <div className="relative">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6 group-focus-within:text-emerald-500 transition-all group-focus-within:scale-110" />
                <Input
                  type="text"
                  placeholder="🔍 Search by title, organization, category, location, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-16 pr-16 py-8 text-lg border-2 border-gray-200 focus:border-emerald-500 rounded-2xl shadow-xl hover:shadow-2xl focus:shadow-2xl transition-all bg-white font-semibold group-focus-within:scale-[1.01] w-full"
                />
                {searchQuery && (
                  <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    onClick={() => setSearchQuery('')}
                    className="absolute right-5 top-1/2 transform -translate-y-1/2 p-2.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all hover:scale-110"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                )}
              </div>
            </div>

            {/* Control Buttons Group */}
            <div className="flex gap-3 w-full lg:w-auto">
              {/* Sort Dropdown */}
              <div className="relative flex-1 lg:flex-initial">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full lg:w-auto appearance-none pl-4 pr-10 py-3.5 rounded-xl border-2 border-gray-200 hover:border-emerald-400 focus:border-emerald-500 bg-white shadow-lg hover:shadow-xl transition-all cursor-pointer font-semibold text-gray-700"
                >
                  <option value="newest">🆕 Newest First</option>
                  <option value="popular">🔥 Most Popular</option>
                  <option value="deadline">⏰ Deadline Soon</option>
                </select>
                <SlidersHorizontal className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>

              {/* Featured Toggle */}
              <Button
                onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                variant={showFeaturedOnly ? 'primary' : 'outline'}
                className={`whitespace-nowrap px-6 py-3.5 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all ${
                  showFeaturedOnly
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0'
                    : 'border-2 border-gray-200 hover:border-emerald-400 bg-white'
                }`}
              >
                <Star className={`w-4 h-4 mr-2 ${showFeaturedOnly ? 'fill-white' : ''}`} />
                Featured
              </Button>

              {/* Saved Filter */}
              <Button
                onClick={() => {
                  // Toggle show saved only
                  if (savedOpportunities.size > 0) {
                    setSearchQuery(savedOpportunities.size > 0 ? '⭐' : '')
                  }
                }}
                variant="outline"
                className="whitespace-nowrap px-6 py-3.5 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all border-2 border-gray-200 hover:border-emerald-400 bg-white"
              >
                <Bookmark className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Saved</span>
                {savedOpportunities.size > 0 && (
                  <span className="ml-2 bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                    {savedOpportunities.size}
                  </span>
                )}
              </Button>

              {/* Advanced Filters Toggle */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`whitespace-nowrap px-6 py-3.5 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all ${
                  showAdvancedFilters || activeFiltersCount > 2
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
                    : 'border-2 border-gray-200 hover:border-emerald-400 bg-white text-gray-700'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <span className="hidden sm:inline">Filters</span>
                  {activeFiltersCount > 2 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-white text-emerald-600 text-xs px-2 py-0.5 rounded-full font-black"
                    >
                      {activeFiltersCount - 2}
                    </motion.span>
                  )}
                </span>
              </motion.button>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          <AnimatePresence>
            {showAdvancedFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: 'auto', opacity: 1, marginTop: 24 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="bg-gradient-to-br from-emerald-50/80 to-teal-50/80 rounded-2xl p-6 border-2 border-emerald-200/50 shadow-inner backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                      <SlidersHorizontal className="w-5 h-5 text-emerald-600" />
                      Advanced Filters
                    </h3>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={clearAllFilters}
                      className="text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-white/50 transition-all"
                    >
                      <X className="w-4 h-4" />
                      Clear All
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Location Filter */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-emerald-600" />
                        Location
                      </label>
                      <Input
                        type="text"
                        placeholder="Filter by location..."
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                        className="w-full border-2 border-gray-200 focus:border-emerald-500 rounded-xl py-3 font-medium"
                      />
                    </div>

                    {/* Deadline Range */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-1">
                        <Clock className="w-4 h-4 text-emerald-600" />
                        Deadline
                      </label>
                      <select
                        value={deadlineRange}
                        onChange={(e) => setDeadlineRange(e.target.value as any)}
                        className="w-full appearance-none border-2 border-gray-200 focus:border-emerald-500 rounded-xl py-3 px-4 font-bold text-gray-700 cursor-pointer bg-white"
                      >
                        <option value="all">All Deadlines</option>
                        <option value="week">⚡ Within 1 Week</option>
                        <option value="month">📅 Within 1 Month</option>
                        <option value="3months">📆 Within 3 Months</option>
                      </select>
                    </div>

                    {/* View Mode */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-1">
                        <Eye className="w-4 h-4 text-emerald-600" />
                        View Mode
                      </label>
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setViewMode('grid')}
                          className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                            viewMode === 'grid'
                              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                              : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-emerald-400'
                          }`}
                        >
                          👁️ Grid
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setViewMode('list')}
                          className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                            viewMode === 'list'
                              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                              : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-emerald-400'
                          }`}
                        >
                          📋 List
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Premium Category Pills with Gradient Hover */}
          <div className="flex flex-wrap gap-3 mt-6">
            {categories.map((category) => {
              const Icon = categoryIcons[category] || Filter
              const isSelected = selectedCategory === category
              // Count opportunities that have this category in their categories array
              const count = category === 'All' 
                ? opportunities.length 
                : opportunities.filter(o => {
                    const oppCategories: string[] = o.categories ? JSON.parse(o.categories) : []
                    return oppCategories.includes(category)
                  }).length
              
              return (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-6 py-3 rounded-2xl font-bold transition-all flex items-center gap-2.5 shadow-lg hover:shadow-xl overflow-hidden ${
                    isSelected
                      ? `bg-gradient-to-r from-emerald-500 to-teal-600 text-white`
                      : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-emerald-400'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500"
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                  <Icon className={`w-5 h-5 relative z-10 ${isSelected ? 'animate-pulse' : ''}`} />
                  <span className="relative z-10">{category}</span>
                  {count > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`relative z-10 text-xs px-2.5 py-1 rounded-full font-black ${
                        isSelected 
                          ? 'bg-white/30 text-white'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {count}
                    </motion.span>
                  )}
                </motion.button>
              )
            })}
          </div>

          {/* Results Summary */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 flex items-center justify-between flex-wrap gap-3"
          >
            <div className="flex items-center gap-4 flex-wrap">
              <p className="text-sm text-gray-700 font-bold">
                Showing <span className="text-emerald-600 text-lg font-black">{filteredAndSortedOpportunities.length}</span> of <span className="font-black">{opportunities.length}</span> opportunities
                {searchQuery && ` for "${searchQuery}"`}
              </p>
              {savedOpportunities.size > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold"
                >
                  <Bookmark className="w-3.5 h-3.5 fill-emerald-600" />
                  {savedOpportunities.size} saved
                </motion.div>
              )}
            </div>
            
            {activeFiltersCount > 0 && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearAllFilters}
                className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 font-bold transition-all text-sm"
              >
                <X className="w-4 h-4" />
                Clear {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''}
              </motion.button>
            )}
          </motion.div>
        </div>
      </section>

      {/* Premium Opportunities Grid with Advanced Features */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-white to-teal-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-32">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="inline-block"
              >
                <div className="w-20 h-20 border-4 border-orange-200 border-t-orange-600 rounded-full"></div>
              </motion.div>
              <p className="text-gray-600 text-xl font-semibold mt-6">Discovering opportunities...</p>
            </div>
          ) : filteredAndSortedOpportunities.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-32 px-4"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Target className="w-32 h-32 text-gray-300 mx-auto mb-8" />
              </motion.div>
              <h3 className="text-3xl font-black text-gray-900 mb-4">No opportunities found</h3>
              <p className="text-gray-600 text-lg mb-10 max-w-md mx-auto">
                We couldn't find any matches. Try adjusting your filters or search query.
              </p>
              <Button
                onClick={() => {
                  setSelectedCategory('All')
                  setSearchQuery('')
                  setShowFeaturedOnly(false)
                  setSortBy('newest')
                }}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-6 text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all"
              >
                <Filter className="w-5 h-5 mr-2" />
                Reset All Filters
              </Button>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={sortBy + selectedCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredAndSortedOpportunities.map((opportunity, index) => {
                  const oppCategories: string[] = opportunity.categories ? JSON.parse(opportunity.categories) : []
                  const firstCategory = oppCategories.length > 0 ? oppCategories[0] : 'Other'
                  const CategoryIcon = categoryIcons[firstCategory] || ExternalLink
                  const isSaved = savedOpportunities.has(opportunity.id)
                  const trendingBadge = getTrendingBadge(opportunity.views || 0)
                  const daysLeft = opportunity.deadline ? calculateDaysLeft(opportunity.deadline) : null

                  return (
                    <motion.div
                      key={opportunity.id}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      whileHover={{ y: -8 }}
                      className="group relative"
                    >
                      {/* Premium Card with Glassmorphism */}
                      <div className="relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden h-full flex flex-col border-2 border-gray-100 hover:border-orange-300">
                        {/* Gradient Overlay on Hover */}
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-gradient-to-br ${categoryColors[firstCategory]}`}></div>

                        {/* Premium Image Section */}
                        {opportunity.image ? (
                          <div className="relative h-56 overflow-hidden">
                            <motion.img
                              src={opportunity.image}
                              alt={opportunity.title}
                              className="w-full h-full object-cover"
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.6 }}
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                            {/* Premium Badges - Top Right */}
                            <div className="absolute top-4 right-4 flex flex-col gap-2">
                              {/* Featured Badge */}
                              {opportunity.isFeatured && (
                                <motion.div
                                  initial={{ scale: 0, rotate: -180 }}
                                  animate={{ scale: 1, rotate: 0 }}
                                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5 shadow-2xl"
                                >
                                  <Star className="w-3.5 h-3.5 fill-white animate-pulse" />
                                  FEATURED
                                </motion.div>
                              )}

                              {/* Trending/Hot Badge */}
                              {trendingBadge && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: 0.1 }}
                                  className={`${
                                    trendingBadge === 'Hot' 
                                      ? 'bg-gradient-to-r from-red-500 to-pink-600' 
                                      : 'bg-gradient-to-r from-orange-500 to-amber-600'
                                  } text-white px-3 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5 shadow-2xl`}
                                >
                                  {trendingBadge === 'Hot' ? (
                                    <Flame className="w-3.5 h-3.5 fill-white animate-pulse" />
                                  ) : (
                                    <Zap className="w-3.5 h-3.5 fill-white" />
                                  )}
                                  {trendingBadge.toUpperCase()}
                                </motion.div>
                              )}

                              {/* Deadline Urgency Badge */}
                              {daysLeft && daysLeft <= 7 && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: 0.2 }}
                                  className="bg-gradient-to-r from-red-600 to-rose-700 text-white px-3 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5 shadow-2xl animate-pulse"
                                >
                                  <Clock className="w-3.5 h-3.5" />
                                  {daysLeft}D LEFT
                                </motion.div>
                              )}
                            </div>

                            {/* Category Badges - Top Left */}
                            {opportunity.categories && JSON.parse(opportunity.categories).length > 0 && (
                              <div className="absolute top-4 left-4 flex flex-wrap gap-2 max-w-[70%]">
                                {JSON.parse(opportunity.categories).map((cat: string, idx: number) => {
                                  const Icon = categoryIcons[cat] || ExternalLink
                                  return (
                                    <motion.div
                                      key={idx}
                                      initial={{ x: -50, opacity: 0 }}
                                      animate={{ x: 0, opacity: 1 }}
                                      transition={{ delay: 0.2 + idx * 0.1 }}
                                      className={`bg-gradient-to-r ${categoryColors[cat] || categoryColors.Other} text-white px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-2xl backdrop-blur-sm border border-white/30`}
                                    >
                                      <Icon className="w-3.5 h-3.5" />
                                      {cat.toUpperCase()}
                                    </motion.div>
                                  )
                                })}
                              </div>
                            )}

                            {/* Bookmark Button - Bottom Right on Image */}
                            <motion.button
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleSaveOpportunity(opportunity.id)
                              }}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className={`absolute bottom-4 right-4 p-3 rounded-full shadow-2xl backdrop-blur-md transition-all ${
                                isSaved
                                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                                  : 'bg-white/90 text-gray-700 hover:bg-white'
                              }`}
                            >
                              <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-white' : ''}`} />
                            </motion.button>
                          </div>
                        ) : (
                          <div className={`h-56 bg-gradient-to-br ${opportunity.categories && JSON.parse(opportunity.categories).length > 0 ? categoryColors[JSON.parse(opportunity.categories)[0]] : categoryColors.Other} flex items-center justify-center relative`}>
                            {opportunity.categories && JSON.parse(opportunity.categories).length > 0 && (() => {
                              const Icon = categoryIcons[JSON.parse(opportunity.categories)[0]] || ExternalLink
                              return <Icon className="w-24 h-24 text-white/40" />
                            })()}
                            {/* Same badges for non-image cards */}
                            <div className="absolute top-4 right-4 flex flex-col gap-2">
                              {opportunity.isFeatured && (
                                <div className="bg-white/20 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5">
                                  <Star className="w-3.5 h-3.5 fill-white" />
                                  FEATURED
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Premium Content Section */}
                        <div className="p-6 flex-1 flex flex-col relative z-10">
                          {/* Organization with Icon */}
                          {opportunity.organization && (
                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 }}
                              className="flex items-center gap-2 text-gray-600 text-sm mb-3"
                            >
                              <Building2 className="w-4 h-4 text-emerald-500" />
                              <span className="font-bold">{opportunity.organization}</span>
                            </motion.div>
                          )}

                          {/* Premium Title with Gradient on Hover */}
                          <motion.h3
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-xl font-black text-gray-900 mb-3 line-clamp-2 group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-teal-600 group-hover:bg-clip-text group-hover:text-transparent transition-all"
                          >
                            {opportunity.title}
                          </motion.h3>

                          {/* Description with Better Typography */}
                          <p className="text-gray-600 text-sm mb-5 line-clamp-3 flex-1 leading-relaxed">
                            {opportunity.description}
                          </p>

                          {/* Premium Meta Info Grid */}
                          <div className="space-y-2.5 mb-5">
                            {opportunity.deadline && (
                              <div className="flex items-center gap-2 text-sm">
                                <div className={`p-2 rounded-lg ${daysLeft && daysLeft <= 7 ? 'bg-red-100' : 'bg-orange-100'}`}>
                                  <Clock className={`w-4 h-4 ${daysLeft && daysLeft <= 7 ? 'text-red-600' : 'text-orange-600'}`} />
                                </div>
                                <div>
                                  <div className="text-xs text-gray-500 font-semibold">Deadline</div>
                                  <div className={`font-black ${daysLeft && daysLeft <= 7 ? 'text-red-600' : 'text-gray-900'}`}>
                                    {new Date(opportunity.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    {daysLeft && daysLeft > 0 && (
                                      <span className="ml-2 text-xs">({daysLeft} days left)</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}

                            {opportunity.location && (
                              <div className="flex items-center gap-2 text-sm">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                  <MapPin className="w-4 h-4 text-blue-600" />
                                </div>
                                <div>
                                  <div className="text-xs text-gray-500 font-semibold">Location</div>
                                  <div className="font-black text-gray-900">{opportunity.location}</div>
                                </div>
                              </div>
                            )}

                            {/* Views Counter with Animation */}
                            {opportunity.views && opportunity.views > 0 && (
                              <div className="flex items-center gap-2 text-sm">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                  <Users className="w-4 h-4 text-purple-600" />
                                </div>
                                <div>
                                  <div className="text-xs text-gray-500 font-semibold">Interest</div>
                                  <div className="font-black text-gray-900">
                                    {opportunity.views.toLocaleString()} views
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Premium Action Buttons */}
                          <div className="flex gap-2 mt-auto pt-4 border-t border-gray-100">
                            <Button
                              onClick={() => opportunity.applyLink && window.open(opportunity.applyLink, '_blank')}
                              disabled={!opportunity.applyLink}
                              className={`flex-1 font-bold py-6 rounded-xl transition-all shadow-lg hover:shadow-xl ${
                                opportunity.applyLink
                                  ? `bg-gradient-to-r ${categoryColors[firstCategory]} text-white border-0`
                                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              }`}
                            >
                              Apply Now
                              <ArrowUpRight className="w-4 h-4 ml-2" />
                            </Button>

                            {/* Share Button */}
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => {
                                e.stopPropagation()
                                // Copy link to clipboard
                                if (opportunity.applyLink) {
                                  navigator.clipboard.writeText(opportunity.applyLink)
                                  // Could add toast notification here
                                }
                              }}
                              className="p-4 border-2 border-gray-200 hover:border-orange-400 rounded-xl hover:bg-orange-50 transition-all text-gray-700"
                              title="Share opportunity"
                            >
                              <Share2 className="w-5 h-5" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Premium Back to Home Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-20"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white rounded-2xl font-black text-lg hover:from-emerald-700 hover:via-teal-700 hover:to-emerald-800 transition-all shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 border-2 border-white/20"
            >
              <ArrowLeft className="w-6 h-6" />
              <span>Back to Homepage</span>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  )
}
