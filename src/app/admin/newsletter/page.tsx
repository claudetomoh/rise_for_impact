'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import AdminNav from '@/components/layout/admin-nav'

interface Subscriber {
  id: number
  email: string
  subscribedAt: string
  isActive: boolean
}

export default function NewsletterPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showComposeModal, setShowComposeModal] = useState(false)
  const [newsletterSubject, setNewsletterSubject] = useState('')
  const [newsletterContent, setNewsletterContent] = useState('')
  const [uploadedImages, setUploadedImages] = useState<{ file: File; preview: string; id: string }[]>([])
  const [recipientFilter, setRecipientFilter] = useState<'all' | 'active' | 'inactive' | 'custom'>('active')
  const [selectedEmails, setSelectedEmails] = useState<string[]>([])
  const [sending, setSending] = useState(false)
  const [sendingProgress, setSendingProgress] = useState(0)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [status, router])

  useEffect(() => {
    if (status === 'authenticated') {
      fetchSubscribers()
    }
  }, [status])

  const fetchSubscribers = async () => {
    try {
      const response = await fetch('/api/newsletter')
      const data = await response.json()
      setSubscribers(data)
    } catch (error) {
      console.error('Error fetching subscribers:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleStatus = async (id: number, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/newsletter?id=${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentStatus }),
      })

      if (response.ok) {
        fetchSubscribers()
      } else {
        alert('Failed to update subscriber status')
      }
    } catch (error) {
      console.error('Error updating subscriber:', error)
      alert('Error updating subscriber status')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this subscriber?')) return

    try {
      const response = await fetch(`/api/newsletter?id=${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchSubscribers()
        alert('Subscriber deleted successfully!')
      } else {
        alert('Failed to delete subscriber')
      }
    } catch (error) {
      console.error('Error deleting subscriber:', error)
      alert('Error deleting subscriber')
    }
  }

  const exportToCSV = () => {
    const headers = ['Email', 'Subscribed At', 'Status']
    const rows = filteredSubscribers.map(sub => [
      sub.email,
      new Date(sub.subscribedAt).toLocaleString(),
      sub.isActive ? 'Active' : 'Inactive'
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).substring(7)
    }))

    setUploadedImages(prev => [...prev, ...newImages])
  }

  const removeImage = (id: string) => {
    setUploadedImages(prev => {
      const image = prev.find(img => img.id === id)
      if (image) URL.revokeObjectURL(image.preview)
      return prev.filter(img => img.id !== id)
    })
  }

  const insertImageToContent = (imageUrl: string) => {
    const imageTag = `<img src="${imageUrl}" alt="Newsletter image" style="max-width: 100%; height: auto; border-radius: 8px; margin: 20px 0;" />`
    setNewsletterContent(prev => prev + '\n' + imageTag)
  }

  const handleSendNewsletter = async () => {
    if (!newsletterSubject.trim() || !newsletterContent.trim()) {
      alert('Please provide both subject and content')
      return
    }

    // Filter recipients based on selection
    let targetRecipients: Subscriber[] = []
    if (recipientFilter === 'all') {
      targetRecipients = subscribers
    } else if (recipientFilter === 'active') {
      targetRecipients = subscribers.filter(s => s.isActive)
    } else if (recipientFilter === 'inactive') {
      targetRecipients = subscribers.filter(s => !s.isActive)
    } else if (recipientFilter === 'custom') {
      targetRecipients = subscribers.filter(s => selectedEmails.includes(s.email))
    }

    if (targetRecipients.length === 0) {
      alert('No recipients selected. Please select at least one recipient.')
      return
    }

    if (!confirm(`Send newsletter to ${targetRecipients.length} subscriber(s)?`)) {
      return
    }

    setSending(true)
    setSendingProgress(0)

    try {
      // Convert uploaded images to base64
      const imagePromises = uploadedImages.map(async (img) => {
        return new Promise<{ id: string; data: string }>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => {
            resolve({ id: img.id, data: reader.result as string })
          }
          reader.readAsDataURL(img.file)
        })
      })

      const base64Images = await Promise.all(imagePromises)
      
      // Replace preview URLs with base64 in content
      let finalContent = newsletterContent
      uploadedImages.forEach((img, index) => {
        finalContent = finalContent.replace(img.preview, base64Images[index].data)
      })

      const response = await fetch('/api/newsletter/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: newsletterSubject,
          content: finalContent,
          recipients: targetRecipients.map(r => r.email),
        }),
      })

      if (response.ok) {
        const result = await response.json()
        alert(`Newsletter sent successfully to ${result.sent} subscribers!`)
        setShowComposeModal(false)
        setNewsletterSubject('')
        setNewsletterContent('')
        setUploadedImages([])
      } else {
        const error = await response.json()
        alert(`Failed to send newsletter: ${error.error}`)
      }
    } catch (error) {
      console.error('Error sending newsletter:', error)
      alert('Error sending newsletter')
    } finally {
      setSending(false)
      setSendingProgress(0)
    }
  }

  const filteredSubscribers = subscribers.filter(sub => {
    const matchesSearch = sub.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' ||
                         (statusFilter === 'active' && sub.isActive) ||
                         (statusFilter === 'inactive' && !sub.isActive)
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: subscribers.length,
    active: subscribers.filter(s => s.isActive).length,
    inactive: subscribers.filter(s => !s.isActive).length,
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-emerald-600 text-xl">Loading...</div>
      </div>
    )
  }

  if (status === 'unauthenticated') return null

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Newsletter Subscribers</h1>
              <p className="text-gray-600">Manage email subscriptions and send newsletters</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowComposeModal(true)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Compose Newsletter
              </button>
              <button
                onClick={exportToCSV}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export CSV
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">Total Subscribers</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">Active</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.active}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">Inactive</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.inactive}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by email..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 bg-white"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Subscribers Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Subscribed At
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredSubscribers.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center">
                        <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <p className="text-gray-500">No subscribers found</p>
                      </td>
                    </tr>
                  ) : (
                    filteredSubscribers.map((subscriber) => (
                      <tr key={subscriber.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                              </svg>
                            </div>
                            <span className="text-sm font-medium text-gray-900">{subscriber.email}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(subscriber.subscribedAt).toLocaleDateString()} at{' '}
                          {new Date(subscriber.subscribedAt).toLocaleTimeString()}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleToggleStatus(subscriber.id, subscriber.isActive)}
                            className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
                              subscriber.isActive
                                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                : 'bg-red-100 text-red-700 hover:bg-red-200'
                            }`}
                          >
                            {subscriber.isActive ? 'Active' : 'Inactive'}
                          </button>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => handleDelete(subscriber.id)}
                            className="text-red-600 hover:text-red-700 font-medium text-sm transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600 text-center">
            Showing {filteredSubscribers.length} of {subscribers.length} subscribers
          </div>
        </div>
      </div>

      {/* Compose Newsletter Modal */}
      {showComposeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Compose Newsletter</h2>
                <button
                  onClick={() => setShowComposeModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Send to {stats.active} active subscribers
              </p>
            </div>

            <div className="p-6 space-y-6">
              {/* Recipient Selection */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border-2 border-emerald-200">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-4">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Select Recipients *
                </label>
                
                <div className="space-y-3">
                  {/* Radio Options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <label className="flex items-center gap-3 p-4 bg-white border-2 border-emerald-200 rounded-lg cursor-pointer hover:border-emerald-400 transition-all duration-200 has-[:checked]:border-emerald-500 has-[:checked]:bg-emerald-50">
                      <input
                        type="radio"
                        name="recipientFilter"
                        value="active"
                        checked={recipientFilter === 'active'}
                        onChange={(e) => setRecipientFilter(e.target.value as any)}
                        className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">Active Subscribers</p>
                        <p className="text-xs text-gray-600">{stats.active} subscribers</p>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-4 bg-white border-2 border-emerald-200 rounded-lg cursor-pointer hover:border-emerald-400 transition-all duration-200 has-[:checked]:border-emerald-500 has-[:checked]:bg-emerald-50">
                      <input
                        type="radio"
                        name="recipientFilter"
                        value="all"
                        checked={recipientFilter === 'all'}
                        onChange={(e) => setRecipientFilter(e.target.value as any)}
                        className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">All Subscribers</p>
                        <p className="text-xs text-gray-600">{stats.total} subscribers</p>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-4 bg-white border-2 border-emerald-200 rounded-lg cursor-pointer hover:border-emerald-400 transition-all duration-200 has-[:checked]:border-emerald-500 has-[:checked]:bg-emerald-50">
                      <input
                        type="radio"
                        name="recipientFilter"
                        value="inactive"
                        checked={recipientFilter === 'inactive'}
                        onChange={(e) => setRecipientFilter(e.target.value as any)}
                        className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">Inactive Subscribers</p>
                        <p className="text-xs text-gray-600">{stats.inactive} subscribers</p>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-4 bg-white border-2 border-emerald-200 rounded-lg cursor-pointer hover:border-emerald-400 transition-all duration-200 has-[:checked]:border-emerald-500 has-[:checked]:bg-emerald-50">
                      <input
                        type="radio"
                        name="recipientFilter"
                        value="custom"
                        checked={recipientFilter === 'custom'}
                        onChange={(e) => setRecipientFilter(e.target.value as any)}
                        className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">Custom Selection</p>
                        <p className="text-xs text-gray-600">Choose specific emails</p>
                      </div>
                    </label>
                  </div>

                  {/* Custom Email Selection */}
                  {recipientFilter === 'custom' && (
                    <div className="mt-4 p-4 bg-white border-2 border-emerald-300 rounded-lg max-h-64 overflow-y-auto">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-semibold text-gray-700">
                          Select Subscribers ({selectedEmails.length} selected)
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedEmails(subscribers.map(s => s.email))}
                            className="text-xs px-3 py-1 bg-emerald-100 text-emerald-700 rounded-md hover:bg-emerald-200 font-semibold"
                          >
                            Select All
                          </button>
                          <button
                            onClick={() => setSelectedEmails([])}
                            className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 font-semibold"
                          >
                            Clear
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {subscribers.map((subscriber) => (
                          <label
                            key={subscriber.id}
                            className="flex items-center gap-3 p-2 hover:bg-emerald-50 rounded-lg cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={selectedEmails.includes(subscriber.email)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedEmails(prev => [...prev, subscriber.email])
                                } else {
                                  setSelectedEmails(prev => prev.filter(email => email !== subscriber.email))
                                }
                              }}
                              className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                            />
                            <span className="text-sm text-gray-700 flex-1">{subscriber.email}</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${subscriber.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                              {subscriber.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recipient Count Display */}
                  <div className="flex items-center gap-2 p-3 bg-emerald-100 border border-emerald-300 rounded-lg">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm font-semibold text-emerald-800">
                      Newsletter will be sent to {
                        recipientFilter === 'all' ? stats.total :
                        recipientFilter === 'active' ? stats.active :
                        recipientFilter === 'inactive' ? stats.inactive :
                        selectedEmails.length
                      } recipient(s)
                    </p>
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div className="relative">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  Subject Line *
                </label>
                <input
                  type="text"
                  value={newsletterSubject}
                  onChange={(e) => setNewsletterSubject(e.target.value)}
                  placeholder="Enter your newsletter subject..."
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-gray-900 bg-white transition-all duration-200 text-lg font-medium placeholder:text-gray-400"
                />
              </div>

              {/* Media Upload Section */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-dashed border-blue-200">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Media & Attachments
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center justify-center py-8 px-4 border-2 border-blue-300 border-dashed rounded-lg hover:bg-blue-50 transition-all duration-200 bg-white"
                >
                  <svg className="w-12 h-12 text-blue-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-blue-600 font-semibold mb-1">Click to upload images or flyers</p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </label>

                {/* Uploaded Images Preview */}
                {uploadedImages.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                    {uploadedImages.map((img) => (
                      <div key={img.id} className="relative group">
                        <img
                          src={img.preview}
                          alt="Uploaded"
                          className="w-full h-32 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 rounded-lg flex items-center justify-center gap-2">
                          <button
                            onClick={() => insertImageToContent(img.preview)}
                            className="opacity-0 group-hover:opacity-100 px-3 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg"
                          >
                            Insert
                          </button>
                          <button
                            onClick={() => removeImage(img.id)}
                            className="opacity-0 group-hover:opacity-100 px-3 py-2 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-all duration-200 shadow-lg"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Content */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Newsletter Content *
                </label>
                <div className="relative">
                  <textarea
                    value={newsletterContent}
                    onChange={(e) => setNewsletterContent(e.target.value)}
                    placeholder="Write your newsletter content here... Use HTML tags for rich formatting!&#10;&#10;Examples:&#10;<h1>Heading</h1>&#10;<p>Paragraph text</p>&#10;<strong>Bold text</strong>&#10;<a href='url'>Link</a>"
                    rows={15}
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 text-gray-900 bg-white font-mono text-sm transition-all duration-200 placeholder:text-gray-400"
                  />
                </div>
                <div className="flex items-start gap-2 mt-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-xs text-amber-800">
                    <p className="font-semibold mb-1">Pro Tips:</p>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>Use HTML tags: &lt;h1&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;a href="..."&gt;</li>
                      <li>Upload images above, then click "Insert" to add them to your content</li>
                      <li>Images will be automatically embedded in the email</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Live Preview Section */}
              {(newsletterContent || uploadedImages.length > 0) && (
                <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-4">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Live Preview
                  </label>
                  <div className="bg-white rounded-lg p-8 shadow-inner max-h-96 overflow-y-auto border border-gray-300">
                    <div 
                      className="prose prose-sm max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900 prose-img:rounded-lg prose-img:shadow-md"
                      dangerouslySetInnerHTML={{ __html: newsletterContent }}
                    />
                  </div>
                </div>
              )}

              {/* Sending Progress */}
              {sending && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                    <span className="text-sm font-medium text-blue-900">
                      Sending newsletter...
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => setShowComposeModal(false)}
                disabled={sending}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleSendNewsletter}
                disabled={sending || !newsletterSubject.trim() || !newsletterContent.trim()}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                {sending ? 'Sending...' : `Send to ${stats.active} Subscribers`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
