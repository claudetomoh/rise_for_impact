'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import AdminNav from '@/components/layout/admin-nav'

interface Program {
  id: number
  title: string
  description: string
  location?: string
  image?: string
  startDate?: string
  endDate?: string
  status?: string
  participants?: number
  applicationsOpen?: boolean
  applicationUrl?: string
  createdAt?: string
}

export default function ProgramManagementPage() {
  const { status } = useSession()
  const router = useRouter()
  const [programs, setPrograms] = useState<Program[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    image: '',
    startDate: '',
    endDate: '',
    status: 'active',
    participants: 0,
    applicationsOpen: false,
    applicationUrl: '',
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [status, router])

  useEffect(() => {
    if (status === 'authenticated') {
      fetchPrograms()
    }
  }, [status])

  const fetchPrograms = () => {
    fetch('/api/programs')
      .then((res) => res.json())
      .then((data) => {
        setPrograms(data)
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const url = editingId ? `/api/programs/${editingId}` : '/api/programs'
      const method = editingId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          participants: parseInt(formData.participants.toString()) || 0,
        }),
      })

      if (response.ok) {
        resetForm()
        fetchPrograms()
        alert(`Program ${editingId ? 'updated' : 'created'} successfully!`)
      } else {
        alert(`Failed to ${editingId ? 'update' : 'create'} program`)
      }
    } catch (error) {
      alert('Error saving program')
    }
  }

  const handleEdit = (program: Program) => {
    setFormData({
      title: program.title,
      description: program.description,
      location: program.location || '',
      image: program.image || '',
      startDate: program.startDate || '',
      endDate: program.endDate || '',
      status: program.status || 'active',
      participants: program.participants || 0,
      applicationsOpen: program.applicationsOpen || false,
      applicationUrl: program.applicationUrl || '',
    })
    setEditingId(program.id)
    setShowForm(true)
    // Scroll to form
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 100)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      return
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file')
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        setFormData(prev => ({ ...prev, image: data.url }))
        alert('Image uploaded successfully!')
      } else {
        alert('Failed to upload image')
      }
    } catch (error) {
      alert('Error uploading image')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this program?')) return

    try {
      const response = await fetch(`/api/programs/${id}`, { method: 'DELETE' })
      if (response.ok) {
        fetchPrograms()
        alert('Program deleted successfully!')
      } else {
        alert('Failed to delete program')
      }
    } catch (error) {
      alert('Error deleting program')
    }
  }

  const toggleApplicationStatus = async (program: Program) => {
    try {
      const response = await fetch(`/api/programs/${program.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...program,
          applicationsOpen: !program.applicationsOpen,
        }),
      })

      if (response.ok) {
        fetchPrograms()
        alert(`Applications ${!program.applicationsOpen ? 'opened' : 'closed'} for ${program.title}`)
      } else {
        alert('Failed to update application status')
      }
    } catch (error) {
      alert('Error updating application status')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      location: '',
      image: '',
      startDate: '',
      endDate: '',
      status: 'active',
      participants: 0,
      applicationsOpen: false,
      applicationUrl: '',
    })
    setEditingId(null)
    setShowForm(false)
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-emerald-600 text-xl">Loading...</div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-emerald-100 to-teal-50">
      <AdminNav />
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-emerald-600 mb-2">Program Management</h1>
              <p className="text-gray-600">Manage programs and initiatives</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowForm(!showForm)}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors"
              >
                {showForm ? 'Cancel' : '+ Add Program'}
              </button>
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>

          {/* Add/Edit Form */}
          {showForm && (
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {editingId ? 'Edit Program' : 'Add New Program'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Program Title *
                    </label>
                    <Input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      placeholder="Climate Action Workshop"
                      className="text-gray-900 bg-white"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900 bg-white"
                      placeholder="Detailed description of the program..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <Input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Accra, Ghana"
                      className="text-gray-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900 bg-white"
                    >
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                      <option value="upcoming">Upcoming</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date
                    </label>
                    <Input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="text-gray-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date
                    </label>
                    <Input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className="text-gray-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Participants
                    </label>
                    <Input
                      type="number"
                      value={formData.participants}
                      onChange={(e) => setFormData({ ...formData, participants: parseInt(e.target.value) || 0 })}
                      min="0"
                      placeholder="0"
                      className="text-gray-900 bg-white"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Program Image
                    </label>
                    <div className="space-y-3">
                      <div className="flex gap-3 items-start">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={uploading}
                          className="flex-1"
                        />
                        {uploading && (
                          <span className="text-emerald-600 text-sm">Uploading...</span>
                        )}
                      </div>
                      <Input
                        type="text"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="Or enter image URL directly"
                        className="text-gray-900 bg-white"
                      />
                      {formData.image && (
                        <div className="mt-3">
                          <img 
                            src={formData.image} 
                            alt="Preview" 
                            className="h-48 w-full object-cover rounded-lg border-2 border-gray-200"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Application Settings */}
                  <div className="md:col-span-2 border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="applicationsOpen"
                          checked={formData.applicationsOpen}
                          onChange={(e) => setFormData({ ...formData, applicationsOpen: e.target.checked })}
                          className="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                        />
                        <label htmlFor="applicationsOpen" className="text-sm font-medium text-gray-700">
                          Applications Open
                        </label>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Application URL
                        </label>
                        <Input
                          type="text"
                          value={formData.applicationUrl}
                          onChange={(e) => setFormData({ ...formData, applicationUrl: e.target.value })}
                          placeholder="https://forms.google.com/..."                          className="text-gray-900 bg-white"                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    {editingId ? 'Update Program' : 'Add Program'}
                  </Button>
                  <Button type="button" onClick={resetForm} className="bg-gray-600 hover:bg-gray-700 text-white">
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Programs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.length === 0 ? (
              <div className="col-span-full bg-white rounded-2xl shadow-lg p-12 text-center">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <p className="text-gray-500 mb-4">No programs yet</p>
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Add First Program
                </Button>
              </div>
            ) : (
              programs.map((program) => (
                <div key={program.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                    {program.image ? (
                      <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-white text-6xl">📋</div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900 flex-1">{program.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        program.status === 'active' ? 'bg-green-100 text-green-700' :
                        program.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
                        program.status === 'completed' ? 'bg-gray-100 text-gray-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {program.status}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{program.description}</p>
                    {program.location && (
                      <p className="text-gray-500 text-sm mb-2 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {program.location}
                      </p>
                    )}
                    {program.participants !== undefined && program.participants > 0 && (
                      <p className="text-gray-500 text-sm mb-2 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        {program.participants} participants
                      </p>
                    )}
                    {program.startDate && (
                      <p className="text-gray-500 text-sm mb-4">
                        {new Date(program.startDate).toLocaleDateString()}
                        {program.endDate && ` - ${new Date(program.endDate).toLocaleDateString()}`}
                      </p>
                    )}

                    {/* Application Status Badge */}
                    <div className="mb-4 pb-4 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Applications:</span>
                        <button
                          onClick={() => toggleApplicationStatus(program)}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                            program.applicationsOpen
                              ? 'bg-green-100 text-green-700 hover:bg-green-200'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {program.applicationsOpen ? '✓ Open' : '✕ Closed'}
                        </button>
                      </div>
                      {program.applicationsOpen && program.applicationUrl && (
                        <a
                          href={program.applicationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-emerald-600 hover:text-emerald-700 mt-2 block truncate"
                        >
                          {program.applicationUrl}
                        </a>
                      )}
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button
                        onClick={() => handleEdit(program)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(program.id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
