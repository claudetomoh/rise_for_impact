'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Eye,
  X,
  Upload,
  Image as ImageIcon,
  ExternalLink,
  DollarSign,
  Star,
  Clock,
  MapPin,
  Building2,
  Target,
  Gift,
  AlertCircle,
} from 'lucide-react'

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
  categories?: string | null // JSON string array: '["Scholarship", "Internship"]'
  location?: string | null
  isPaid: boolean
  isActive: boolean
  isFeatured: boolean
  views: number
  createdAt: string
  updatedAt: string
}

export default function OpportunitiesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [filteredOpportunities, setFilteredOpportunities] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all')
  const [filterType, setFilterType] = useState<'all' | 'paid' | 'free'>('all')
  const [showModal, setShowModal] = useState(false)
  const [editingOpportunity, setEditingOpportunity] = useState<Opportunity | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    organization: '',
    deadline: '',
    eligibility: '',
    benefits: '',
    applyLink: '',
    image: '',
    categories: [] as string[], // Array of selected categories
    location: '',
    isPaid: false,
    isActive: true,
    isFeatured: false,
  })

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [status, router])

  // Fetch opportunities
  useEffect(() => {
    fetchOpportunities()
  }, [])

  // Filter opportunities
  useEffect(() => {
    let filtered = opportunities

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (opp) => {
          const categoriesArray = opp.categories ? JSON.parse(opp.categories) : []
          return opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            opp.organization?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            categoriesArray.some((cat: string) => cat.toLowerCase().includes(searchQuery.toLowerCase()))
        }
      )
    }

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter((opp) =>
        filterStatus === 'active' ? opp.isActive : !opp.isActive
      )
    }

    // Type filter
    if (filterType !== 'all') {
      filtered = filtered.filter((opp) =>
        filterType === 'paid' ? opp.isPaid : !opp.isPaid
      )
    }

    setFilteredOpportunities(filtered)
  }, [searchQuery, filterStatus, filterType, opportunities])

  const fetchOpportunities = async () => {
    try {
      const response = await fetch('/api/opportunities')
      if (response.ok) {
        const data = await response.json()
        setOpportunities(data)
        setFilteredOpportunities(data)
      }
    } catch (error) {
      console.error('Error fetching opportunities:', error)
      toast.error('Failed to fetch opportunities')
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const formDataUpload = new FormData()
    formDataUpload.append('file', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      })

      if (response.ok) {
        const data = await response.json()
        setFormData({ ...formData, image: data.url })
        toast.success('Image uploaded successfully')
      } else {
        toast.error('Failed to upload image')
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      toast.error('Error uploading image')
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.title || !formData.description || !formData.applyLink) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      const url = editingOpportunity
        ? `/api/opportunities/${editingOpportunity.id}`
        : '/api/opportunities'

      const method = editingOpportunity ? 'PATCH' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success(
          editingOpportunity
            ? 'Opportunity updated successfully'
            : 'Opportunity created successfully! Email notifications sent.'
        )
        fetchOpportunities()
        handleCloseModal()
      } else {
        toast.error('Failed to save opportunity')
      }
    } catch (error) {
      console.error('Error saving opportunity:', error)
      toast.error('Error saving opportunity')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this opportunity?')) return

    try {
      const response = await fetch(`/api/opportunities/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success('Opportunity deleted successfully')
        fetchOpportunities()
      } else {
        toast.error('Failed to delete opportunity')
      }
    } catch (error) {
      console.error('Error deleting opportunity:', error)
      toast.error('Error deleting opportunity')
    }
  }

  const handleEdit = (opportunity: Opportunity) => {
    setEditingOpportunity(opportunity)
    const categoriesArray = opportunity.categories ? JSON.parse(opportunity.categories) : []
    setFormData({
      title: opportunity.title,
      description: opportunity.description,
      organization: opportunity.organization || '',
      deadline: opportunity.deadline || '',
      eligibility: opportunity.eligibility || '',
      benefits: opportunity.benefits || '',
      applyLink: opportunity.applyLink,
      image: opportunity.image || '',
      categories: categoriesArray,
      location: opportunity.location || '',
      isPaid: opportunity.isPaid,
      isActive: opportunity.isActive,
      isFeatured: opportunity.isFeatured,
    })
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingOpportunity(null)
    setFormData({
      title: '',
      description: '',
      organization: '',
      deadline: '',
      eligibility: '',
      benefits: '',
      applyLink: '',
      image: '',
      categories: [],
      location: '',
      isPaid: false,
      isActive: true,
      isFeatured: false,
    })
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading opportunities...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Opportunity Management
          </h1>
          <p className="text-gray-600">
            Post scholarships, internships, and opportunities for your audience
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Opportunities</p>
                <p className="text-2xl font-bold text-gray-900">{opportunities.length}</p>
              </div>
              <Target className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active</p>
                <p className="text-2xl font-bold text-green-600">
                  {opportunities.filter((o) => o.isActive).length}
                </p>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Featured</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {opportunities.filter((o) => o.isFeatured).length}
                </p>
              </div>
              <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Views</p>
                <p className="text-2xl font-bold text-purple-600">
                  {opportunities.reduce((sum, o) => sum + o.views, 0)}
                </p>
              </div>
              <Eye className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search opportunities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              {/* Type Filter */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="paid">Paid Ads</option>
                <option value="free">Free Posts</option>
              </select>

              {/* Create Button */}
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition font-medium"
              >
                <Plus className="w-5 h-5" />
                <span>New Opportunity</span>
              </button>
            </div>
          </div>
        </div>

        {/* Opportunities List */}
        {filteredOpportunities.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No opportunities found
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery
                ? 'Try adjusting your search or filters'
                : 'Start by creating your first opportunity'}
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              <Plus className="w-5 h-5" />
              Create Opportunity
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredOpportunities.map((opportunity) => (
              <div
                key={opportunity.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition"
              >
                {/* Image */}
                {opportunity.image ? (
                  <div className="relative h-48 bg-gray-100">
                    <img
                      src={opportunity.image}
                      alt={opportunity.title}
                      className="w-full h-full object-cover"
                    />
                    {opportunity.isFeatured && (
                      <div className="absolute top-3 right-3 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <Star className="w-4 h-4 fill-white" />
                        Featured
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <ImageIcon className="w-16 h-16 text-gray-400" />
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  {/* Category Badges */}
                  {opportunity.categories && JSON.parse(opportunity.categories).length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {JSON.parse(opportunity.categories).map((cat: string, idx: number) => (
                        <span key={idx} className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}

                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {opportunity.title}
                  </h3>

                  {opportunity.organization && (
                    <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                      <Building2 className="w-4 h-4" />
                      {opportunity.organization}
                    </p>
                  )}

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {opportunity.description}
                  </p>

                  {/* Meta Info */}
                  <div className="space-y-2 mb-4 text-sm">
                    {opportunity.deadline && (
                      <div className="flex items-center gap-2 text-red-600">
                        <Clock className="w-4 h-4" />
                        <span>Deadline: {opportunity.deadline}</span>
                      </div>
                    )}

                    {opportunity.location && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{opportunity.location}</span>
                      </div>
                    )}

                    {opportunity.isPaid && (
                      <div className="flex items-center gap-2 text-green-600 font-medium">
                        <DollarSign className="w-4 h-4" />
                        <span>Paid Advertisement</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-gray-500">
                      <Eye className="w-4 h-4" />
                      <span>{opportunity.views} views</span>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        opportunity.isActive
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {opportunity.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(opportunity)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>

                    <a
                      href={opportunity.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>

                    <button
                      onClick={() => handleDelete(opportunity.id)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-lg max-w-3xl w-full my-8">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingOpportunity ? 'Edit Opportunity' : 'Create New Opportunity'}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    placeholder="e.g., Fully Funded Scholarship to Harvard"
                    required
                  />
                </div>

                {/* Organization */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organization
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) =>
                      setFormData({ ...formData, organization: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    placeholder="e.g., Harvard University"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    placeholder="Describe the opportunity in detail..."
                    required
                  />
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Categories - Multi-Select */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Categories (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {['Scholarship', 'Internship', 'Job', 'Training', 'Competition', 'Fellowship', 'Grant', 'Other'].map((category) => (
                        <label
                          key={category}
                          className={`flex items-center gap-2 px-4 py-3 border-2 rounded-lg cursor-pointer transition-all ${
                            formData.categories.includes(category)
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-700 font-semibold'
                              : 'border-gray-300 bg-white hover:border-emerald-300'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={formData.categories.includes(category)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFormData({ ...formData, categories: [...formData.categories, category] })
                              } else {
                                setFormData({ ...formData, categories: formData.categories.filter(c => c !== category) })
                              }
                            }}
                            className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                          />
                          <span className="text-sm">{category}</span>
                        </label>
                      ))}
                    </div>
                    {formData.categories.length > 0 && (
                      <p className="mt-2 text-sm text-emerald-600 font-medium">
                        ✓ {formData.categories.length} {formData.categories.length === 1 ? 'category' : 'categories'} selected
                      </p>
                    )}
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      placeholder="e.g., USA, Remote, Global"
                    />
                  </div>

                  {/* Deadline */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Deadline
                    </label>
                    <input
                      type="text"
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      placeholder="e.g., December 31, 2025"
                    />
                  </div>

                  {/* Apply Link */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Application URL *
                    </label>
                    <input
                      type="url"
                      value={formData.applyLink}
                      onChange={(e) => setFormData({ ...formData, applyLink: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      placeholder="https://..."
                      required
                    />
                  </div>
                </div>

                {/* Eligibility */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Eligibility / Requirements
                  </label>
                  <textarea
                    value={formData.eligibility}
                    onChange={(e) =>
                      setFormData({ ...formData, eligibility: e.target.value })
                    }
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    placeholder="Who can apply? Requirements..."
                  />
                </div>

                {/* Benefits */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Benefits
                  </label>
                  <textarea
                    value={formData.benefits}
                    onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    placeholder="What participants will get..."
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Flyer / Image
                  </label>
                  <div className="flex items-center gap-4">
                    {formData.image && (
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 transition"
                      >
                        <Upload className="w-4 h-4" />
                        {isUploading ? 'Uploading...' : 'Upload Image'}
                      </label>
                      <p className="text-sm text-gray-500 mt-2">
                        Recommended: 1200x630px
                      </p>
                    </div>
                  </div>
                </div>

                {/* Toggles */}
                <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) =>
                        setFormData({ ...formData, isActive: e.target.checked })
                      }
                      className="w-5 h-5 text-blue-600 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Active (visible to public)
                    </span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) =>
                        setFormData({ ...formData, isFeatured: e.target.checked })
                      }
                      className="w-5 h-5 text-yellow-600 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Featured (show on homepage & send email)
                    </span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isPaid}
                      onChange={(e) =>
                        setFormData({ ...formData, isPaid: e.target.checked })
                      }
                      className="w-5 h-5 text-green-600 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Paid Advertisement
                    </span>
                  </label>
                </div>

                {/* Info Box */}
                {formData.isFeatured && formData.isActive && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-900 mb-1">
                        Email Notification
                      </p>
                      <p className="text-sm text-blue-700">
                        This opportunity will be emailed to all newsletter subscribers when
                        you save it.
                      </p>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition font-medium"
                  >
                    {editingOpportunity ? 'Update Opportunity' : 'Create Opportunity'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
