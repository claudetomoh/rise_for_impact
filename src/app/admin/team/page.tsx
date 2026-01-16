'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface TeamMember {
  id: number
  name: string
  role: string
  category?: string
  country?: string
  countryFlag?: string
  focus?: string
  bio?: string
  image?: string
  linkedin?: string
  twitter?: string
  email?: string
  createdAt?: string
}

export default function TeamManagementPage() {
  const { status } = useSession()
  const router = useRouter()
  const [team, setTeam] = useState<TeamMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    category: 'coordinators',
    country: '',
    countryFlag: '',
    focus: '',
    bio: '',
    image: '',
    linkedin: '',
    twitter: '',
    email: '',
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [status, router])

  useEffect(() => {
    if (status === 'authenticated') {
      fetchTeam()
    }
  }, [status])

  const fetchTeam = () => {
    fetch('/api/team')
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to fetch team')
        return res.json()
      })
      .then((data) => {
        setTeam(data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching team:', error)
        setIsLoading(false)
      })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const url = editingId ? `/api/team/${editingId}` : '/api/team'
      const method = editingId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        resetForm()
        fetchTeam()
        alert(`Team member ${editingId ? 'updated' : 'created'} successfully!`)
      } else {
        alert(`Failed to ${editingId ? 'update' : 'create'} team member`)
      }
    } catch (error) {
      alert('Error saving team member')
    }
  }

  const handleEdit = (member: TeamMember) => {
    setFormData({
      name: member.name,
      role: member.role,
      category: member.category || 'coordinators',
      country: member.country || '',
      countryFlag: member.countryFlag || '',
      focus: member.focus || '',
      bio: member.bio || '',
      image: member.image || '',
      linkedin: member.linkedin || '',
      twitter: member.twitter || '',
      email: member.email || '',
    })
    setEditingId(member.id)
    setShowForm(true)
    // Scroll to form
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 100)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this team member?')) return

    try {
      const response = await fetch(`/api/team/${id}`, { method: 'DELETE' })
      if (response.ok) {
        fetchTeam()
        alert('Team member deleted successfully!')
      } else {
        alert('Failed to delete team member')
      }
    } catch (error) {
      alert('Error deleting team member')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      category: 'coordinators',
      country: '',
      countryFlag: '',
      focus: '',
      bio: '',
      image: '',
      linkedin: '',
      twitter: '',
      email: '',
    })
    setEditingId(null)
    setShowForm(false)
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
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-emerald-600 mb-2">Team Management</h1>
              <p className="text-gray-600">Manage team members and their profiles</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowForm(!showForm)}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors"
              >
                {showForm ? 'Cancel' : '+ Add Team Member'}
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
                {editingId ? 'Edit Team Member' : 'Add New Team Member'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      placeholder="John Doe"
                      className="text-gray-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role *
                    </label>
                    <Input
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      required
                      placeholder="Executive Director"
                      className="text-gray-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900 bg-white"
                    >
                      <option value="executive">Executive Board & Leadership</option>
                      <option value="coordinators">Team & Country Coordinators</option>
                      <option value="regional">Regional Coordinators</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <Input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder="Ghana"
                      className="text-gray-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country Flag (Emoji)
                    </label>
                    <Input
                      type="text"
                      value={formData.countryFlag}
                      onChange={(e) => setFormData({ ...formData, countryFlag: e.target.value })}
                      placeholder="🇬🇭"
                      maxLength={2}
                      className="text-gray-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Focus Area
                    </label>
                    <Input
                      type="text"
                      value={formData.focus}
                      onChange={(e) => setFormData({ ...formData, focus: e.target.value })}
                      placeholder="Leadership & Strategy"
                      className="text-gray-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@rise4impact.org"
                      className="text-gray-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      LinkedIn URL
                    </label>
                    <Input
                      type="text"
                      value={formData.linkedin}
                      onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                      placeholder="https://linkedin.com/in/johndoe"
                      className="text-gray-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Twitter/X URL
                    </label>
                    <Input
                      type="text"
                      value={formData.twitter}
                      onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                      placeholder="https://twitter.com/johndoe"
                      className="text-gray-900 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Image
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
                          className="h-32 w-32 object-cover rounded-lg border-2 border-gray-200"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900 bg-white"
                    placeholder="Brief biography..."
                  />
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    {editingId ? 'Update Team Member' : 'Add Team Member'}
                  </Button>
                  <Button type="button" onClick={resetForm} className="bg-gray-600 hover:bg-gray-700 text-white">
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.length === 0 ? (
              <div className="col-span-full bg-white rounded-2xl shadow-lg p-12 text-center">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <p className="text-gray-500 mb-4">No team members yet</p>
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Add First Team Member
                </Button>
              </div>
            ) : (
              team.map((member) => (
                <div key={member.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-80 bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center overflow-hidden">
                    {member.image ? (
                      <img src={member.image} alt={member.name} className="w-full h-full object-contain" />
                    ) : (
                      <div className="w-32 h-32 bg-emerald-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-emerald-600 font-medium mb-3">{member.role}</p>
                    {member.bio && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{member.bio}</p>
                    )}
                    {member.email && (
                      <p className="text-gray-500 text-sm mb-4">
                        <a href={`mailto:${member.email}`} className="hover:text-emerald-600">
                          {member.email}
                        </a>
                      </p>
                    )}
                    <div className="flex gap-3 mb-4">
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        </a>
                      )}
                      {member.twitter && (
                        <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleEdit(member)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(member.id)}
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
