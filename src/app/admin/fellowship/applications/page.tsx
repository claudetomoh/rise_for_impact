'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Search,
  Filter,
  Download,
  ExternalLink,
  Users,
  ChevronRight,
  RefreshCw,
  Award,
} from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import type { FellowshipApplicationRecord, ApplicationStatus } from '@/types/fellowship'

const STATUS_LABELS: Record<ApplicationStatus, string> = {
  draft: 'Draft',
  submitted: 'Submitted',
  shortlisted: 'Shortlisted',
  interview: 'Interview',
  accepted: 'Accepted',
  rejected: 'Rejected',
}

const STATUS_COLOURS: Record<ApplicationStatus, string> = {
  draft: 'bg-gray-100 text-gray-600 dark:bg-dark-700 dark:text-gray-400',
  submitted: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  shortlisted: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  interview: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  accepted: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  rejected: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
}

export default function FellowshipApplicationsPage() {
  const { status } = useSession()
  const router = useRouter()
  const [applications, setApplications] = useState<FellowshipApplicationRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [submittedOnly, setSubmittedOnly] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
  }, [status, router])

  const fetchApplications = () => {
    setIsLoading(true)
    const params = new URLSearchParams({ submittedOnly: String(submittedOnly) })
    fetch(`/api/fellowship/applications?${params}`)
      .then((r) => r.json())
      .then((data) => { setApplications(data); setIsLoading(false) })
      .catch(() => setIsLoading(false))
  }

  useEffect(() => {
    if (status === 'authenticated') fetchApplications()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, submittedOnly])

  const filtered = useMemo(() => {
    return applications.filter((a) => {
      const matchesSearch =
        !search ||
        (a.fullName || '').toLowerCase().includes(search.toLowerCase()) ||
        (a.email || '').toLowerCase().includes(search.toLowerCase()) ||
        (a.region || '').toLowerCase().includes(search.toLowerCase()) ||
        (a.cityTown || '').toLowerCase().includes(search.toLowerCase()) ||
        (a.impactArea || '').toLowerCase().includes(search.toLowerCase())
      const matchesStatus = filterStatus === 'all' || a.status === filterStatus
      return matchesSearch && matchesStatus
    })
  }, [applications, search, filterStatus])

  const exportCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Region', 'City/Town', 'Impact Area', 'Status', 'Submitted At', 'Score']
    const rows = filtered.map((a) => [
      a.id,
      a.fullName || '',
      a.email || '',
      a.region || '',
      a.cityTown || '',
      a.impactArea || '',
      a.status,
      a.submittedAt ? new Date(a.submittedAt).toLocaleDateString() : '',
      a.review?.totalScore ?? '',
    ])
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `fellowship_applications_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  // Cohort counts for quick stats
  const stats = useMemo(() => {
    const all = applications
    return {
      total: all.length,
      submitted: all.filter(a => a.status === 'submitted').length,
      shortlisted: all.filter(a => a.status === 'shortlisted').length,
      accepted: all.filter(a => a.status === 'accepted').length,
    }
  }, [applications])

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-6 h-6 text-gray-400 animate-spin" />
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Fellowship Applications</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Cameroon Cohort 2026 — {stats.total} {submittedOnly ? 'submitted' : 'total'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/fellowship/settings"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-dark-700 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-800 transition-colors"
          >
            Cohort Settings
          </Link>
          <Button onClick={exportCSV} variant="outline" className="flex items-center gap-2 text-sm">
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Submitted', value: stats.total, icon: Users },
          { label: 'Under Review', value: stats.submitted, icon: Filter },
          { label: 'Shortlisted', value: stats.shortlisted, icon: Award },
          { label: 'Accepted', value: stats.accepted, icon: Award },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}</span>
              <Icon className="w-4 h-4 text-gray-400" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">{value}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-xl p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, region, city, impact area…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-dark-700 bg-white dark:bg-dark-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/30"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-dark-700 bg-white dark:bg-dark-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/30"
        >
          <option value="all">All statuses</option>
          {(Object.keys(STATUS_LABELS) as ApplicationStatus[]).map((s) => (
            <option key={s} value={s}>{STATUS_LABELS[s]}</option>
          ))}
        </select>
        <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer px-1">
          <input
            type="checkbox"
            checked={submittedOnly}
            onChange={(e) => setSubmittedOnly(e.target.checked)}
            className="accent-primary-500"
          />
          Submitted only
        </label>
        <button onClick={fetchApplications} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors px-2">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-800 rounded-xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <Users className="w-8 h-8 mb-3" />
            <p className="text-sm font-medium">No applications found</p>
            <p className="text-xs mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-dark-800">
                  {['Applicant', 'Region', 'City / Town', 'Impact Area', 'Status', 'Score', 'Submitted', ''].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-dark-800">
                {filtered.map((app) => (
                  <tr
                    key={app.id}
                    onClick={() => router.push(`/admin/fellowship/applications/${app.id}`)}
                    className="hover:bg-gray-50 dark:hover:bg-dark-800/50 transition-colors cursor-pointer"
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900 dark:text-white">{app.fullName || '—'}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{app.email || '—'}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300 whitespace-nowrap">{app.region || '—'}</td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300 whitespace-nowrap">{app.cityTown || '—'}</td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300 capitalize whitespace-nowrap">
                      {app.impactArea ? app.impactArea.replace(/-/g, ' ') : '—'}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLOURS[app.status as ApplicationStatus]}`}>
                        {STATUS_LABELS[app.status as ApplicationStatus] || app.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {app.review ? (
                        <span className="text-gray-900 dark:text-white font-semibold">{app.review.totalScore}<span className="text-gray-400 font-normal">/100</span></span>
                      ) : (
                        <span className="text-gray-400 text-xs">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap text-xs">
                      {app.submittedAt ? new Date(app.submittedAt).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/fellowship/applications/${app.id}`}
                        className="inline-flex items-center gap-1 text-xs font-medium text-primary-500 hover:text-primary-600 transition-colors"
                      >
                        Review <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="text-xs text-gray-400 text-center">
        Showing {filtered.length} of {applications.length} applications
      </p>
    </div>
  )
}

