'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function AdminNav() {
  const { data: session } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  if (!session) return null

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/admin/applications', label: 'Applications', icon: '📝' },
    { href: '/admin/volunteers', label: 'Volunteers', icon: '🙋' },
    { href: '/admin/opportunities', label: 'Opportunities', icon: '🎯' },
    { href: '/admin/blogs', label: 'Content', icon: '✍️' },
    { href: '/admin/team', label: 'Team', icon: '👥' },
    { href: '/admin/programs', label: 'Programs', icon: '📋' },
    { href: '/admin/newsletter', label: 'Newsletter', icon: '📧' },
    { href: '/', label: 'View Site', icon: '🌐' },
  ]

  return (
    <nav className="bg-white border-b border-gray-200 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-8">
            <Link href="/admin/dashboard" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-emerald-500 group-hover:ring-emerald-600 transition-all">
                <Image 
                  src="/images/logo.jpeg" 
                  alt="Rise for Impact Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="text-sm text-gray-600 font-semibold">Admin Panel</div>
              </div>
            </Link>
            
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    pathname.startsWith(item.href) && item.href !== '/'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-700'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-xs text-gray-500">Logged in as</div>
              <div className="text-sm font-medium text-gray-700">
                {session.user?.email}
              </div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-all hover:shadow-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
