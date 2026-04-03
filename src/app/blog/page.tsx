import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import { User, ArrowRight, FileText, BookOpen } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/sections/footer'

export const metadata: Metadata = {
  title: 'Blog | Rise for Impact',
  description: 'Stories, insights, and updates from Rise for Impact — connecting young Africans to opportunities across Cameroon, Ghana, Nigeria, and Rwanda.',
}

export default async function BlogPage() {
  const blogs = await prisma.blogPost.findMany({
    orderBy: { id: 'desc' },
  })

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-dark-950">

        {/* Hero */}
        <section className="relative pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0">
            <img src="/images/backgrounds/fellowship.jpeg" alt="" className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-b from-dark-950/80 via-dark-950/75 to-dark-950" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.10),transparent_55%)]" />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:3rem_3rem]" />
          <div className="container-premium relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-500/15 border border-accent-500/25 mb-6">
              <FileText className="w-3.5 h-3.5 text-accent-400" />
              <span className="text-xs font-semibold text-accent-400 tracking-widest uppercase">Blog &amp; Insights</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-5 leading-tight">
              Latest{' '}
              <span className="text-gradient">Stories</span>
            </h1>
            <p className="text-xl text-dark-200 max-w-2xl leading-relaxed">
              Perspectives, updates, and insights from our team and community across Africa.
            </p>
          </div>
        </section>

        {/* Blog content */}
        <section className="container-premium py-16">
          {blogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 rounded-2xl bg-dark-800 border border-white/8 flex items-center justify-center mb-6">
                <BookOpen className="w-7 h-7 text-dark-400" />
              </div>
              <h2 className="text-xl font-display font-bold text-white mb-2">No posts yet</h2>
              <p className="text-dark-400 text-sm max-w-sm">
                We&apos;re working on our first stories. Check back soon or follow us on social media for updates.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.id}`}
                  className="group glass-card rounded-2xl overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500"
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
                      <span className="inline-block px-3 py-1 bg-primary-500/20 text-primary-400 text-xs font-semibold rounded-full border border-primary-500/20">
                        {blog.category}
                      </span>
                    )}
                    <h3 className="font-display font-bold text-xl text-white group-hover:text-primary-400 transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-dark-300 line-clamp-2">
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-dark-700/60">
                      {blog.author && (
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-dark-400" />
                          <span className="text-sm text-dark-400">{blog.author}</span>
                        </div>
                      )}
                      <span className="inline-flex items-center gap-1.5 text-xs text-primary-400 font-semibold">
                        Read more <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

      </main>
      <Footer />
    </>
  )
}
