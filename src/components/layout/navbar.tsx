'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Globe, Users, BookOpen, Video, FileText, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GlobalSearch } from '@/components/ui/global-search'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { cn } from '@/lib/utils'

const navigation = [
  {
    name: 'About',
    href: '/#mission-vision',
    scroll: true,
  },
  {
    name: 'Programs',
    href: '/#programs',
    scroll: true,
  },
  {
    name: 'Opportunities',
    href: '/opportunities',
    scroll: false,
  },
  {
    name: 'Team',
    href: '/#team',
    scroll: true,
  },
  {
    name: 'Regions & Clubs',
    href: '/#regions',
    scroll: true,
    dropdown: [
      { name: 'Cameroon Regions', href: '/#regions', icon: Globe, description: 'Northwest & Southwest' },
      { name: 'University Clubs', href: '/#clubs', icon: Users, description: 'Campus chapters' },
    ],
  },
  {
    name: 'Media Hub',
    href: '/#media',
    scroll: true,
    dropdown: [
      { name: 'Photo Gallery', href: '/#media', icon: Video, description: 'Images and videos' },
      { name: 'Blog & Stories', href: '/#blog', icon: FileText, description: 'Latest news and updates' },
    ],
  },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const id = href.replace('/#', '');
      const element = document.getElementById(id);
      // Always navigate to homepage with hash if not found, for all program sections
      if (element) {
        const navHeight = 64;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navHeight;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
      } else {
        // For all program sections, always navigate to homepage with hash
        window.location.href = href;
      }
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled 
          ? 'backdrop-blur-xl bg-gradient-to-r from-emerald-900/80 via-teal-900/75 to-emerald-950/80 shadow-lg shadow-emerald-900/20 border-b border-emerald-500/10' 
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group relative z-10">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="relative w-12 h-12 lg:w-14 lg:h-14"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/30 to-teal-400/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-70 group-hover:opacity-100" />
              <img 
                src="/images/logo.jpeg" 
                alt="Rise for Impact" 
                className="relative w-full h-full object-cover rounded-2xl shadow-2xl ring-2 ring-emerald-400/40 group-hover:ring-emerald-400/70 transition-all duration-300"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-brown-100 hover:text-white transition-all duration-300 hover:bg-white/5 group relative"
                >
                  <span className="relative z-10">{item.name}</span>
                  {item.dropdown && (
                    <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/10 to-accent-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>

                {/* Premium Dropdown */}
                <AnimatePresence>
                  {item.dropdown && activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-0 mt-2 w-80"
                    >
                      <div className="bg-gradient-to-br from-brown-900/98 via-brown-800/98 to-brown-900/98 backdrop-blur-2xl rounded-2xl shadow-2xl border border-primary-400/20 overflow-hidden">
                        <div className="p-2">
                          {item.dropdown.map((subItem, index) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="flex items-start gap-4 px-4 py-3.5 rounded-xl hover:bg-gradient-to-r hover:from-primary-500/10 hover:to-accent-500/10 transition-all duration-300 group relative overflow-hidden"
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-primary-400/0 via-primary-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              {subItem.icon && (
                                <div className="relative mt-0.5 p-2 rounded-lg bg-gradient-to-br from-primary-500/20 to-accent-500/20 group-hover:from-primary-500/30 group-hover:to-accent-500/30 transition-all duration-300">
                                  <subItem.icon className="w-5 h-5 text-primary-300 group-hover:text-primary-200 group-hover:scale-110 transition-all duration-300" />
                                </div>
                              )}
                              <div className="flex-1 relative z-10">
                                <div className="text-sm font-semibold text-white group-hover:text-primary-200 transition-colors duration-300">
                                  {subItem.name}
                                </div>
                                {subItem.description && (
                                  <div className="text-xs text-brown-300 mt-0.5 group-hover:text-brown-200 transition-colors duration-300">
                                    {subItem.description}
                                  </div>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <GlobalSearch />
            <ThemeToggle />
            <a href="/get-involved">
              <Button 
                variant="primary" 
                size="md"
                className="font-semibold shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/40 hover:scale-105 transition-all duration-300"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Get Involved
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 hover:from-primary-500/30 hover:to-accent-500/30 backdrop-blur-xl border border-primary-400/30 transition-all duration-300"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-primary-200" />
            ) : (
              <Menu className="w-6 h-6 text-primary-200" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden"
          >
            <div className="mx-4 my-4 bg-gradient-to-br from-brown-900/98 via-brown-800/98 to-brown-900/98 backdrop-blur-2xl rounded-3xl border border-primary-400/20 shadow-2xl">
              <div className="p-6 space-y-4">
                {navigation.map((item) => (
                  <div key={item.name} className="space-y-2">
                    <Link
                      href={item.href}
                      className="block px-4 py-3 rounded-xl text-brown-100 hover:text-white hover:bg-white/5 font-semibold transition-all duration-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.dropdown && (
                      <div className="pl-4 space-y-1.5 border-l-2 border-primary-400/20 ml-4">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-brown-300 hover:text-primary-200 hover:bg-white/5 transition-all duration-300"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {subItem.icon && <subItem.icon className="w-4 h-4 text-primary-400" />}
                            <div>
                              <div className="font-medium">{subItem.name}</div>
                              {subItem.description && (
                                <div className="text-xs text-brown-400 mt-0.5">{subItem.description}</div>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                <div className="pt-4 space-y-3 border-t border-primary-400/20">
                  <Link href="/login" className="block">
                    <Button 
                      variant="ghost" 
                      size="md" 
                      fullWidth
                      className="font-semibold"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/apply" className="block">
                    <Button 
                      variant="primary" 
                      size="md" 
                      fullWidth
                      className="font-semibold shadow-lg shadow-primary-500/25"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Apply Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
