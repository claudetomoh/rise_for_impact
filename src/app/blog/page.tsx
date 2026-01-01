import { PageWithNav } from '@/components/layout/page-with-nav'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, User, ArrowRight } from 'lucide-react'

export default async function BlogPage() {
  const blogs = await prisma.blogPost.findMany({
    orderBy: { id: 'desc' },
  })

  return (
    <PageWithNav>
      <main className="min-h-screen bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950 py-24">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Our Blog
            </h1>
            <p className="text-lg text-dark-300 max-w-2xl mx-auto">
              Stories, insights, and updates from Rise for Impact
            </p>
          </div>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.id}`}
                className="group glass-card rounded-2xl overflow-hidden hover:scale-105 transition-all duration-500"
              >
                {blog.image && (
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent" />
                  </div>
                )}
                <div className="p-6 space-y-3">
                  {blog.category && (
                    <span className="inline-block px-3 py-1 bg-primary-500/20 text-primary-400 text-xs font-semibold rounded-full">
                      {blog.category}
                    </span>
                  )}
                  <h3 className="font-display font-bold text-xl text-white group-hover:text-primary-400 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-dark-300 line-clamp-2">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-dark-700">
                    {blog.author && (
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-dark-400" />
                        <span className="text-sm text-dark-400">{blog.author}</span>
                      </div>
                    )}
                    <ArrowRight className="h-4 w-4 text-primary-400" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </PageWithNav>
  )
}
