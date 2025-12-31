'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, X, FileText, Users, Target, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

interface SearchResult {
  blogs: Array<{ id: number; title: string; excerpt: string; category: string; url: string; type: 'blog' }>
  programs: Array<{ id: number; title: string; description: string; url: string; type: 'program' }>
  team: Array<{ id: number; name: string; role: string; url: string; type: 'team' }>
  totalResults: number
}

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Search API call
  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (query.length >= 2) {
        setIsLoading(true)
        try {
          const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
          const data = await response.json()
          setResults(data)
        } catch (error) {
          console.error('Search error:', error)
        } finally {
          setIsLoading(false)
        }
      } else {
        setResults(null)
      }
    }, 300)

    return () => clearTimeout(searchTimeout)
  }, [query])

  const handleResultClick = (url: string) => {
    setIsOpen(false)
    setQuery('')
    setResults(null)
    window.location.href = url
  }

  return (
    <>
      {/* Search Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2.5 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 hover:from-primary-500/30 hover:to-accent-500/30 backdrop-blur-xl border border-primary-400/30 transition-all duration-300 group"
        aria-label="Search blogs, programs, and team members"
        title="Search (⌘K)"
      >
        <Search className="w-5 h-5 text-primary-200 group-hover:text-primary-100 transition-colors" />
      </button>

      {/* Search Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4"
            >
              <Card className="overflow-hidden">
                {/* Search Input */}
                <div className="flex items-center gap-3 p-4 border-b border-dark-700">
                  <Search className="w-5 h-5 text-dark-400" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search blogs, programs, team members..."
                    className="flex-1 bg-transparent text-white placeholder:text-dark-500 focus:outline-none"
                  />
                  {isLoading && <Loader2 className="w-5 h-5 text-primary-400 animate-spin" />}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-dark-800 rounded transition-colors"
                  >
                    <X className="w-5 h-5 text-dark-400" />
                  </button>
                </div>

                {/* Results */}
                <div className="max-h-96 overflow-y-auto p-4">
                  {query.length < 2 ? (
                    <div className="text-center py-8 text-dark-400">
                      <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p className="text-lg font-semibold text-white mb-2">Search Rise for Impact</p>
                      <p>Start typing to search...</p>
                      <p className="text-sm mt-3">Find blog posts, programs, and team members across the platform</p>
                      <div className="mt-4 text-xs space-y-1">
                        <p className="flex items-center gap-2 justify-center">
                          <FileText className="w-3 h-3" /> Blog posts & stories
                        </p>
                        <p className="flex items-center gap-2 justify-center">
                          <Target className="w-3 h-3" /> Programs & initiatives
                        </p>
                        <p className="flex items-center gap-2 justify-center">
                          <Users className="w-3 h-3" /> Team members & roles
                        </p>
                      </div>
                    </div>
                  ) : results && results.totalResults > 0 ? (
                    <div className="space-y-6">
                      {/* Blogs */}
                      {results.blogs.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 text-sm text-dark-400 mb-3">
                            <FileText className="w-4 h-4" />
                            <span>Blog Posts ({results.blogs.length})</span>
                          </div>
                          <div className="space-y-2">
                            {results.blogs.map((blog) => (
                              <button
                                key={blog.id}
                                onClick={() => handleResultClick(blog.url)}
                                className="w-full text-left p-3 rounded-lg hover:bg-dark-800 transition-colors group"
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div>
                                    <h4 className="text-white font-medium group-hover:text-primary-400 transition-colors">
                                      {blog.title}
                                    </h4>
                                    <p className="text-sm text-dark-400 line-clamp-1 mt-1">
                                      {blog.excerpt}
                                    </p>
                                  </div>
                                  <span className="text-xs text-primary-400 shrink-0">{blog.category}</span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Programs */}
                      {results.programs.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 text-sm text-dark-400 mb-3">
                            <Target className="w-4 h-4" />
                            <span>Programs ({results.programs.length})</span>
                          </div>
                          <div className="space-y-2">
                            {results.programs.map((program) => (
                              <button
                                key={program.id}
                                onClick={() => handleResultClick(program.url)}
                                className="w-full text-left p-3 rounded-lg hover:bg-dark-800 transition-colors group"
                              >
                                <h4 className="text-white font-medium group-hover:text-primary-400 transition-colors">
                                  {program.title}
                                </h4>
                                <p className="text-sm text-dark-400 line-clamp-1 mt-1">
                                  {program.description}
                                </p>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Team */}
                      {results.team.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 text-sm text-dark-400 mb-3">
                            <Users className="w-4 h-4" />
                            <span>Team Members ({results.team.length})</span>
                          </div>
                          <div className="space-y-2">
                            {results.team.map((member) => (
                              <button
                                key={member.id}
                                onClick={() => handleResultClick(member.url)}
                                className="w-full text-left p-3 rounded-lg hover:bg-dark-800 transition-colors group"
                              >
                                <h4 className="text-white font-medium group-hover:text-primary-400 transition-colors">
                                  {member.name}
                                </h4>
                                <p className="text-sm text-dark-400 mt-1">{member.role}</p>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : results && results.totalResults === 0 ? (
                    <div className="text-center py-8 text-dark-400">
                      <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No results found for "{query}"</p>
                      <p className="text-sm mt-2">Try different keywords</p>
                    </div>
                  ) : null}
                </div>

                {/* Footer */}
                <div className="border-t border-dark-700 px-4 py-3 flex items-center justify-between text-xs text-dark-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <kbd className="px-2 py-1 bg-dark-800 rounded">↑↓</kbd>
                      Navigate
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-2 py-1 bg-dark-800 rounded">↵</kbd>
                      Select
                    </span>
                  </div>
                  <span className="flex items-center gap-1">
                    <kbd className="px-2 py-1 bg-dark-800 rounded">ESC</kbd>
                    Close
                  </span>
                </div>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
