'use client'

import { useSession, signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Target, 
  BookOpen, 
  FolderKanban, 
  UserCog, 
  Mail, 
  ImageIcon, 
  Globe, 
  LogOut,
  Menu,
  X,
  ChevronDown
} from 'lucide-react'

export default function AdminNav() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [contentExpanded, setContentExpanded] = useState(true)

  if (!session) return null

  const mainNavItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/applications', label: 'Applications', icon: FileText },
    { href: '/admin/volunteers', label: 'Volunteers', icon: Users },
  ]

  const contentItems = [
    { href: '/admin/opportunities', label: 'Opportunities', icon: Target },
    { href: '/admin/blogs', label: 'Blogs', icon: BookOpen },
    { href: '/admin/programs', label: 'Programs', icon: FolderKanban },
  ]

  const bottomItems = [
    { href: '/admin/team', label: 'Team', icon: UserCog },
    { href: '/admin/newsletter', label: 'Newsletter', icon: Mail },
    { href: '/admin/media-assets', label: 'Media', icon: ImageIcon },
    { href: '/', label: 'View Site', icon: Globe },
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden">
              <Image 
                src="/images/logo.jpeg" 
                alt="Rise for Impact"
                fill
                className="object-cover"
              />
            </div>
            <span className="font-bold text-gray-800">Admin</span>
          </Link>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-emerald-900 to-emerald-950 text-white z-40 transition-all duration-300 ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-emerald-800">
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden ring-2 ring-emerald-400 flex-shrink-0">
                <Image 
                  src="/images/logo.jpeg" 
                  alt="Rise for Impact"
                  fill
                  className="object-cover"
                />
              </div>
              {sidebarOpen && (
                <div>
                  <div className="text-sm font-bold">Rise for Impact</div>
                  <div className="text-xs text-emerald-300">Admin Panel</div>
                </div>
              )}
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            {/* Main Items */}
            <div className="space-y-1 mb-6">
              {mainNavItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      isActive(item.href)
                        ? 'bg-emerald-700 text-white shadow-lg'
                        : 'text-emerald-100 hover:bg-emerald-800'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
                  </Link>
                )
              })}
            </div>

            {/* Content Section */}
            <div className="mb-6">
              {sidebarOpen ? (
                <>
                  <button
                    onClick={() => setContentExpanded(!contentExpanded)}
                    className="flex items-center justify-between w-full px-3 py-2 text-emerald-300 hover:text-white text-xs font-semibold uppercase tracking-wider"
                  >
                    <span>Content</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${contentExpanded ? 'rotate-180' : ''}`} />
                  </button>
                  {contentExpanded && (
                    <div className="space-y-1 mt-1">
                      {contentItems.map((item) => {
                        const Icon = item.icon
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                              isActive(item.href)
                                ? 'bg-emerald-700 text-white shadow-lg'
                                : 'text-emerald-100 hover:bg-emerald-800'
                            }`}
                          >
                            <Icon className="w-5 h-5 flex-shrink-0" />
                            <span className="text-sm font-medium">{item.label}</span>
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-1">
                  {contentItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-center p-2.5 rounded-lg transition-all ${
                          isActive(item.href)
                            ? 'bg-emerald-700 text-white shadow-lg'
                            : 'text-emerald-100 hover:bg-emerald-800'
                        }`}
                        title={item.label}
                      >
                        <Icon className="w-5 h-5" />
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Bottom Items */}
            <div className="space-y-1">
              {sidebarOpen && (
                <div className="px-3 py-2 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
                  Other
                </div>
              )}
              {bottomItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      isActive(item.href)
                        ? 'bg-emerald-700 text-white shadow-lg'
                        : 'text-emerald-100 hover:bg-emerald-800'
                    } ${!sidebarOpen && 'justify-center'}`}
                    title={!sidebarOpen ? item.label : undefined}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-emerald-800">
            {sidebarOpen && (
              <div className="mb-3 px-2">
                <div className="text-xs text-emerald-300 mb-1">Logged in as</div>
                <div className="text-sm font-medium truncate">{session.user?.email}</div>
              </div>
            )}
            <button
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              className="flex items-center gap-3 w-full px-3 py-2.5 bg-red-600 hover:bg-red-700 rounded-lg transition-all text-sm font-medium"
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span>Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
