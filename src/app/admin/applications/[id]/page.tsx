'use client'

import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import AdminNav from '@/components/layout/admin-nav'

interface Application {
  id: number
  name: string
  email: string
  country: string
  message: string
  type: string
  status: string
  createdAt: string
}

export default function ApplicationDetailPage() {
  const { status: authStatus } = useSession()
  const router = useRouter()
  const params = useParams()
  const [application, setApplication] = useState<Application | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    if (authStatus === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [authStatus, router])

  useEffect(() => {
    if (authStatus === 'authenticated' && params.id) {
      fetch(`/api/applications/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setApplication(data)
          setIsLoading(false)
        })
        .catch(() => setIsLoading(false))
    }
  }, [authStatus, params.id])

  const exportToPDF = () => {
    if (!application) return
    
    // Create PDF content
    const printWindow = window.open('', '', 'height=800,width=600')
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Application - ${application.name}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 40px; line-height: 1.6; }
              h1 { color: #10b981; margin-bottom: 10px; }
              .header { border-bottom: 3px solid #10b981; padding-bottom: 20px; margin-bottom: 30px; }
              .section { margin: 20px 0; }
              .label { font-weight: bold; color: #374151; margin-top: 15px; }
              .value { color: #1f2937; }
              .status { display: inline-block; padding: 5px 15px; border-radius: 20px; font-weight: bold; }
              .status-pending { background: #fef3c7; color: #92400e; }
              .status-approved { background: #d1fae5; color: #065f46; }
              .status-rejected { background: #fee2e2; color: #991b1b; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Rise for Impact - Application Details</h1>
              <p style="color: #6b7280;">Generated on ${new Date().toLocaleDateString()}</p>
            </div>
            <div class="section">
              <div class="label">Applicant Name:</div>
              <div class="value">${application.name}</div>
            </div>
            <div class="section">
              <div class="label">Email:</div>
              <div class="value">${application.email}</div>
            </div>
            <div class="section">
              <div class="label">Country:</div>
              <div class="value">${application.country}</div>
            </div>
            <div class="section">
              <div class="label">Application Type:</div>
              <div class="value">${application.type}</div>
            </div>
            <div class="section">
              <div class="label">Status:</div>
              <div class="value">
                <span class="status status-${application.status}">${application.status.toUpperCase()}</span>
              </div>
            </div>
            <div class="section">
              <div class="label">Submitted:</div>
              <div class="value">${new Date(application.createdAt).toLocaleDateString()}</div>
            </div>
            <div class="section">
              <div class="label">Message:</div>
              <div class="value" style="white-space: pre-wrap;">${application.message}</div>
            </div>
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  const updateStatus = async (newStatus: string) => {
    if (!application) return
    
    setIsUpdating(true)
    try {
      // Update status
      const response = await fetch(`/api/applications/${application.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        const updated = await response.json()
        setApplication(updated)

        // Send email notification
        const emailBody = newStatus === 'approved' 
          ? 'We are pleased to inform you that your application has been approved! We will be in touch with you soon with next steps.'
          : newStatus === 'rejected'
          ? 'Thank you for your interest in Rise for Impact. Unfortunately, we are unable to proceed with your application at this time. We encourage you to apply again in the future.'
          : 'Your application status has been updated to pending. We are currently reviewing your submission and will get back to you soon.'

        await fetch('/api/notifications', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: application.email,
            subject: `Application Status Update - Rise for Impact`,
            body: emailBody,
            applicantName: application.name,
            status: newStatus,
          }),
        })

        alert(`Status updated successfully! Email notification sent to ${application.email}`)
      } else {
        alert('Failed to update status')
      }
    } catch (error) {
      alert('Error updating status')
    } finally {
      setIsUpdating(false)
    }
  }

  if (authStatus === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-emerald-600 text-xl">Loading...</div>
      </div>
    )
  }

  if (authStatus === 'unauthenticated' || !application) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-emerald-100 to-teal-50">
      <AdminNav />
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-emerald-600 mb-2">Application Details</h1>
              <p className="text-gray-600">Review and manage application</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={exportToPDF}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export PDF
              </button>
              <button
                onClick={() => router.push('/admin/applications')}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
              >
                Back to List
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="text-sm font-semibold text-gray-500 uppercase">Full Name</label>
              <p className="text-lg text-gray-900 mt-1">{application.name}</p>
            </div>
            
            <div>
              <label className="text-sm font-semibold text-gray-500 uppercase">Email</label>
              <p className="text-lg text-gray-900 mt-1">
                <a href={`mailto:${application.email}`} className="text-emerald-600 hover:underline">
                  {application.email}
                </a>
              </p>
            </div>
            
            <div>
              <label className="text-sm font-semibold text-gray-500 uppercase">Country</label>
              <p className="text-lg text-gray-900 mt-1">{application.country}</p>
            </div>
            
            <div>
              <label className="text-sm font-semibold text-gray-500 uppercase">Application Type</label>
              <p className="text-lg text-gray-900 mt-1">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {application.type}
                </span>
              </p>
            </div>
            
            <div>
              <label className="text-sm font-semibold text-gray-500 uppercase">Status</label>
              <p className="text-lg text-gray-900 mt-1">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  application.status === 'pending' 
                    ? 'bg-yellow-100 text-yellow-700' 
                    : application.status === 'approved'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {application.status}
                </span>
              </p>
            </div>
            
            <div>
              <label className="text-sm font-semibold text-gray-500 uppercase">Submitted Date</label>
              <p className="text-lg text-gray-900 mt-1">
                {new Date(application.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>

          <div className="border-t pt-6">
            <label className="text-sm font-semibold text-gray-500 uppercase">Message</label>
            <div className="mt-2 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-800 whitespace-pre-wrap">
                {application.message || 'No message provided'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Update Status</h2>
          <div className="flex gap-4">
            <Button
              onClick={() => updateStatus('approved')}
              disabled={isUpdating || application.status === 'approved'}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              ✓ Approve
            </Button>
            <Button
              onClick={() => updateStatus('rejected')}
              disabled={isUpdating || application.status === 'rejected'}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              ✗ Reject
            </Button>
            <Button
              onClick={() => updateStatus('pending')}
              disabled={isUpdating || application.status === 'pending'}
              className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              ⟳ Set Pending
            </Button>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}
