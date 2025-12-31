'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useMemo } from 'react'
import AdminNav from '@/components/layout/admin-nav'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface VolunteerApplication {
  id: number
  fullName: string
  email: string
  phone?: string
  country?: string
  city?: string
  role: string
  experience?: string
  skills?: string
  availability?: string
  portfolio?: string
  linkedin?: string
  whyVolunteer?: string
  whatCanOffer?: string
  previousWork?: string
  heardFrom?: string
  additionalInfo?: string
  status: string
  createdAt: string
}

export default function VolunteersManagementPage() {
  const { status } = useSession()
  const router = useRouter()
  const [volunteers, setVolunteers] = useState<VolunteerApplication[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterRole, setFilterRole] = useState('all')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [status, router])

  useEffect(() => {
    if (status === 'authenticated') {
      fetchVolunteers()
    }
  }, [status])

  const fetchVolunteers = () => {
    fetch('/api/volunteers')
      .then((res) => res.json())
      .then((data) => {
        setVolunteers(data)
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      const response = await fetch(`/api/volunteers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        fetchVolunteers()
        alert('Status updated successfully!')
      } else {
        alert('Failed to update status')
      }
    } catch (error) {
      alert('Error updating status')
    }
  }

  const deleteVolunteer = async (id: number) => {
    if (!confirm('Are you sure you want to delete this volunteer application?')) return

    try {
      const response = await fetch(`/api/volunteers/${id}`, { method: 'DELETE' })
      if (response.ok) {
        fetchVolunteers()
        alert('Volunteer application deleted successfully!')
      } else {
        alert('Failed to delete volunteer application')
      }
    } catch (error) {
      alert('Error deleting volunteer application')
    }
  }

  // Filtered volunteers
  const filteredVolunteers = useMemo(() => {
    return volunteers.filter((vol) => {
      const matchesSearch = 
        vol.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vol.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vol.role.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = filterStatus === 'all' || vol.status === filterStatus
      const matchesRole = filterRole === 'all' || vol.role === filterRole
      return matchesSearch && matchesStatus && matchesRole
    })
  }, [volunteers, searchTerm, filterStatus, filterRole])

  // Get unique roles
  const uniqueRoles = useMemo(() => {
    return Array.from(new Set(volunteers.map(v => v.role)))
  }, [volunteers])

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Country', 'City', 'Role', 'Experience', 'Skills', 'Status', 'Date']
    const rows = filteredVolunteers.map((vol) => [
      vol.id,
      vol.fullName,
      vol.email,
      vol.phone || '',
      vol.country || '',
      vol.city || '',
      vol.role,
      vol.experience || '',
      vol.skills || '',
      vol.status,
      new Date(vol.createdAt).toLocaleDateString(),
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `volunteer_applications_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    URL.revokeObjectURL(url)
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
              <h1 className="text-4xl font-bold text-emerald-600 mb-2">Volunteer Applications</h1>
              <p className="text-gray-600">Manage volunteer applications and their details</p>
            </div>
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
            >
              Back to Dashboard
            </button>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Volunteers
                </label>
                <Input
                  type="text"
                  placeholder="Search by name, email, or role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="text-gray-900 bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Status
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900 bg-white"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="contacted">Contacted</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Role
                </label>
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900 bg-white"
                >
                  <option value="all">All Roles</option>
                  {uniqueRoles.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={exportToCSV}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export CSV
              </button>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredVolunteers.length} of {volunteers.length} applications
            </div>
          </div>

          {/* Volunteers Table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {filteredVolunteers.length === 0 ? (
              <div className="p-12 text-center">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p className="text-gray-500 mb-4">No volunteer applications yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-emerald-50 border-b border-emerald-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Skills</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {filteredVolunteers.map((vol) => (
                      <tr key={vol.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{vol.fullName}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{vol.email}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                            {vol.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <div className="max-w-xs truncate" title={vol.skills || ''}>
                            {vol.skills || 'N/A'}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <select
                            value={vol.status}
                            onChange={(e) => updateStatus(vol.id, e.target.value)}
                            className={`px-3 py-1 rounded-full text-xs font-medium border-none outline-none cursor-pointer ${
                              vol.status === 'pending' 
                                ? 'bg-yellow-100 text-yellow-700' 
                                : vol.status === 'contacted'
                                ? 'bg-blue-100 text-blue-700'
                                : vol.status === 'approved'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="contacted">Contacted</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(vol.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex gap-2">
                            <button
                              onClick={() => router.push(`/admin/volunteers/${vol.id}`)}
                              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors"
                            >
                              View Details
                            </button>
                            <button
                              onClick={() => deleteVolunteer(vol.id)}
                              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
