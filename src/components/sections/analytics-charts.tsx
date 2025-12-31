'use client'

import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface AnalyticsChartsProps {
  applications: Array<{
    id: number
    status: string
    type: string
    createdAt: string
  }>
}

const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6']

export default function AnalyticsCharts({ applications }: AnalyticsChartsProps) {
  // Status breakdown
  const statusData = [
    { name: 'Approved', value: applications.filter((app) => app.status === 'approved').length, color: '#10b981' },
    { name: 'Pending', value: applications.filter((app) => app.status === 'pending').length, color: '#f59e0b' },
    { name: 'Rejected', value: applications.filter((app) => app.status === 'rejected').length, color: '#ef4444' },
  ].filter((item) => item.value > 0)

  // Type breakdown
  const typeData = [
    { name: 'Volunteer', value: applications.filter((app) => app.type === 'volunteer').length },
    { name: 'Partner', value: applications.filter((app) => app.type === 'partner').length },
    { name: 'Donor', value: applications.filter((app) => app.type === 'donor').length },
  ].filter((item) => item.value > 0)

  // Monthly trend (last 6 months)
  const monthlyTrend = () => {
    const months = []
    const now = new Date()
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const monthName = date.toLocaleString('default', { month: 'short' })
      const year = date.getFullYear()
      
      const monthApps = applications.filter((app) => {
        const appDate = new Date(app.createdAt)
        return (
          appDate.getMonth() === date.getMonth() &&
          appDate.getFullYear() === date.getFullYear()
        )
      })

      months.push({
        month: `${monthName} ${year}`,
        applications: monthApps.length,
        approved: monthApps.filter((app) => app.status === 'approved').length,
        pending: monthApps.filter((app) => app.status === 'pending').length,
        rejected: monthApps.filter((app) => app.status === 'rejected').length,
      })
    }
    
    return months
  }

  const trendData = monthlyTrend()

  if (applications.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center text-gray-500">
        No data available for analytics
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Status Distribution */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Status Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-4 mt-4">
          {statusData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
              <span className="text-sm text-gray-600">{item.name}: {item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Type Distribution */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Type Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={typeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#10b981" name="Applications" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Trend */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:col-span-2">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Trends (Last 6 Months)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="applications" stroke="#3b82f6" name="Total" strokeWidth={2} />
            <Line type="monotone" dataKey="approved" stroke="#10b981" name="Approved" strokeWidth={2} />
            <Line type="monotone" dataKey="pending" stroke="#f59e0b" name="Pending" strokeWidth={2} />
            <Line type="monotone" dataKey="rejected" stroke="#ef4444" name="Rejected" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
