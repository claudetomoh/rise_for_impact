import type { Metadata } from 'next'
import Link from 'next/link'
import { Image as ImageIcon, Video, Play, ArrowRight, Clock } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/sections/footer'

export const metadata: Metadata = {
  title: 'Media Hub | Rise for Impact',
  description: 'Photos, videos, and media resources from Rise for Impact programmes, events, and community activities across Cameroon, Ghana, Nigeria, and Rwanda.',
}

const upcoming = [
  { label: 'Flagship Session Highlights', desc: 'Video recaps from our 2025 speaker sessions across four countries', icon: Video },
  { label: 'LinkedIn Workshop Gallery', desc: 'Photos from our career skills workshops in Cameroon and Ghana', icon: ImageIcon },
  { label: 'Community Event Coverage', desc: 'Impact Clinics, campus activities, and partner events', icon: Play },
]

export default function MediaPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-dark-950">

        {/* Hero */}
        <section className="relative pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0">
            <img src="/images/backgrounds/club-impact.jpeg" alt="" className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-b from-dark-950/85 via-dark-950/80 to-dark-950" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.10),transparent_55%)]" />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:3rem_3rem]" />
          <div className="container-premium relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/15 border border-teal-500/25 mb-6">
              <ImageIcon className="w-3.5 h-3.5 text-teal-400" />
              <span className="text-xs font-semibold text-teal-400 tracking-widest uppercase">Media Hub</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-5 leading-tight">
              Our story in<br />
              <span className="text-gradient">images & video.</span>
            </h1>
            <p className="text-xl text-dark-200 max-w-2xl leading-relaxed">
              Photos, videos, and media resources from our programmes, events, and communities across Africa.
            </p>
          </div>
        </section>

        {/* Coming Soon */}
        <section className="container-premium py-20">
          <div className="rounded-3xl bg-dark-900/60 border border-teal-500/15 overflow-hidden">
            <div className="p-10 md:p-14 text-center">
              <div className="w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mx-auto mb-6">
                <Clock className="w-7 h-7 text-teal-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">Media gallery launching soon</h2>
              <p className="text-dark-300 max-w-lg mx-auto mb-10">
                Our team is curating photos and videos from Fellowship programmes, Impact Clinics, and community events across all four countries.
              </p>
              <div className="grid sm:grid-cols-3 gap-5 max-w-2xl mx-auto mb-10">
                {upcoming.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="p-5 rounded-2xl bg-dark-800/60 border border-white/6 text-left space-y-2">
                      <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-teal-400" />
                      </div>
                      <div className="text-white text-sm font-semibold">{item.label}</div>
                      <div className="text-dark-400 text-xs leading-relaxed">{item.desc}</div>
                    </div>
                  )
                })}
              </div>
              <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/15 hover:bg-white/5 text-white font-semibold transition-all text-sm">
                Read our Blog in the meantime <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
