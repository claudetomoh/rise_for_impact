'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import AnalyticsCharts from '@/components/sections/analytics-charts'

interface Application {
  id: number
  name: string
  email: string
  status: string
  createdAt: string
  type: string
}

interface Blog {
  id: number
  title: string
  author: string
  createdAt: string
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState({
    applications: 0,
    programs: 0,
    team: 0,
    blogs: 0,
    volunteers: 0,
    pending: 0,
    approved: 0,
    volunteersPending: 0,
  })
  const [recentApplications, setRecentApplications] = useState<Application[]>([])
  const [allApplications, setAllApplications] = useState<Application[]>([])
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([])
  const [showAnalytics, setShowAnalytics] = useState(false)

  useEffect(() => {
    if (status === 'authenticated') {
      // Fetch statistics and recent data
      Promise.all([
        fetch('/api/apply').then(async (res) => {
          if (!res.ok) throw new Error('Failed to fetch applications')
          return res.json()
        }),
        fetch('/api/programs').then(async (res) => {
          if (!res.ok) throw new Error('Failed to fetch programs')
          return res.json()
        }),
        fetch('/api/team').then(async (res) => {
          if (!res.ok) throw new Error('Failed to fetch team')
          return res.json()
        }),
        fetch('/api/blogs').then(async (res) => {
          if (!res.ok) throw new Error('Failed to fetch blogs')
          return res.json()
        }),
        fetch('/api/volunteers').then(async (res) => {
          if (!res.ok) throw new Error('Failed to fetch volunteers')
          return res.json()
        }),
      ])
        .then(([applications, programs, team, blogs, volunteers]) => {
          const pending = applications.filter((app: Application) => app.status === 'pending').length
          const approved = applications.filter((app: Application) => app.status === 'approved').length
          const volunteersPending = volunteers.filter((vol: any) => vol.status === 'pending').length
          
          setStats({
            applications: applications.length || 0,
            programs: programs.length || 0,
            team: team.length || 0,
            blogs: blogs.length || 0,
            volunteers: volunteers.length || 0,
            pending,
            approved,
            volunteersPending,
          })
          
          // Get 5 most recent applications
          setRecentApplications(applications.slice(0, 5))
          
          // Store all applications for analytics
          setAllApplications(applications)
          
          // Get 3 most recent blogs
          setRecentBlogs(blogs.slice(0, 3))
        })
        .catch((error) => {
          console.error('Error fetching dashboard data:', error)
        })
    }
  }, [status])

  if (status === 'loading') {
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
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Dashboard Overview
            </h1>
            <p className="text-gray-600">Welcome back, {session?.user?.email}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
            {/* Total Applications */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">+{stats.pending} new</span>
              </div>
              <h3 className="text-gray-500 text-sm font-medium mb-1">Total Applications</h3>
              <p className="text-3xl font-bold text-gray-900">{stats.applications}</p>
              <p className="text-xs text-gray-500 mt-2">{stats.approved} approved • {stats.pending} pending</p>
            </div>

            {/* Programs */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
              </div>
              <h3 className="text-gray-500 text-sm font-medium mb-1">Active Programs</h3>
              <p className="text-3xl font-bold text-gray-900">{stats.programs}</p>
              <p className="text-xs text-gray-500 mt-2">Across all regions</p>
            </div>

            {/* Team Members */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-gray-500 text-sm font-medium mb-1">Team Members</h3>
              <p className="text-3xl font-bold text-gray-900">{stats.team}</p>
              <p className="text-xs text-gray-500 mt-2">Active contributors</p>
            </div>

            {/* Blog Posts */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-gray-500 text-sm font-medium mb-1">Blog Posts</h3>
              <p className="text-3xl font-bold text-gray-900">{stats.blogs}</p>
              <p className="text-xs text-gray-500 mt-2">Published articles</p>
            </div>

            {/* Volunteers */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-pink-600 bg-pink-50 px-2 py-1 rounded">+{stats.volunteersPending} new</span>
              </div>
              <h3 className="text-gray-500 text-sm font-medium mb-1">Volunteers</h3>
              <p className="text-3xl font-bold text-gray-900">{stats.volunteers}</p>
              <p className="text-xs text-gray-500 mt-2">Applications received</p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Recent Applications */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
                  <button
                    onClick={() => router.push('/admin/applications')}
                    className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    View all →
                  </button>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {recentApplications.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    No applications yet
                  </div>
                ) : (
                  recentApplications.map((app) => (
                    <div 
                      key={app.id} 
                      className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => router.push(`/admin/applications/${app.id}`)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-medium text-gray-900">{app.name}</h3>
                            <span className={`px-2 py-1 text-xs font-medium rounded ${
                              app.status === 'pending' 
                                ? 'bg-yellow-100 text-yellow-700' 
                                : app.status === 'approved'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {app.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{app.email}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {app.type} • {new Date(app.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={() => router.push('/admin/applications')}
                  className="w-full flex items-center gap-3 p-4 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors group"
                >
                  <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-gray-900">Applications</p>
                    <p className="text-xs text-gray-600">Review & approve</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <button
                  onClick={() => router.push('/admin/blogs')}
                  className="w-full flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors group"
                >
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-gray-900">Create Blog</p>
                    <p className="text-xs text-gray-600">Write new post</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <button
                  onClick={() => router.push('/admin/team')}
                  className="w-full flex items-center gap-3 p-4 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors group"
                >
                  <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-gray-900">Manage Team</p>
                    <p className="text-xs text-gray-600">Team members</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <button
                  onClick={() => router.push('/admin/programs')}
                  className="w-full flex items-center gap-3 p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors group"
                >
                  <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-gray-900">Manage Programs</p>
                    <p className="text-xs text-gray-600">Active programs</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <button
                  onClick={() => router.push('/admin/volunteers')}
                  className="w-full flex items-center gap-3 p-4 bg-pink-50 hover:bg-pink-100 rounded-lg transition-colors group"
                >
                  <div className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-gray-900">Volunteers</p>
                    <p className="text-xs text-gray-600">Manage applications</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <button
                  onClick={() => router.push('/')}
                  className="w-full flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
                >
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-gray-900">View Website</p>
                    <p className="text-xs text-gray-600">Public site</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Analytics Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Analytics & Insights</h2>
              <button
                onClick={() => setShowAnalytics(!showAnalytics)}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                {showAnalytics ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                    Hide Analytics
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Show Analytics
                  </>
                )}
              </button>
            </div>
            {showAnalytics && <AnalyticsCharts applications={allApplications} />}
          </div>

          {/* Recent Blogs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Blog Posts</h2>
                <button
                  onClick={() => router.push('/admin/blogs')}
                  className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Manage blogs →
                </button>
              </div>
            </div>
            <div className="p-6">
              {recentBlogs.length === 0 ? (
                <div className="text-center py-8">
                  <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <p className="text-gray-500 mb-4">No blog posts yet</p>
                  <button
                    onClick={() => router.push('/admin/blogs')}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Create First Post
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recentBlogs.map((blog) => (
                    <div key={blog.id} className="border border-gray-200 rounded-lg p-4 hover:border-emerald-300 hover:shadow-sm transition-all">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{blog.title}</h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{blog.author}</span>
                        <span>•</span>
                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
