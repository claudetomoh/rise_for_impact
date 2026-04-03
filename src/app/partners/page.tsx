'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/sections/footer'
import {
  Handshake, Building2, Globe, GraduationCap, Heart, Tv, Layers,
  CheckCircle2, ArrowRight, Send, Users, MapPin, Zap, BookOpen
} from 'lucide-react'

const partnerSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  organisation: z.string().min(2, 'Organisation name is required'),
  type: z.string().min(1, 'Please select a partnership type'),
  message: z.string().min(20, 'Please describe your partnership interest (at least 20 characters)'),
})

type PartnerForm = z.infer<typeof partnerSchema>

const partnerTypes = [
  { id: 'Funder / Donor', label: 'Funder / Donor', icon: Zap, color: 'from-yellow-500/20 to-amber-500/20', border: 'border-yellow-500/30', active: 'border-yellow-400 bg-yellow-500/20', text: 'text-yellow-400', desc: 'Grants, sponsorships, and philanthropic funding' },
  { id: 'University / Institution', label: 'University / Institution', icon: GraduationCap, color: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-500/30', active: 'border-blue-400 bg-blue-500/20', text: 'text-blue-400', desc: 'Campus clubs, academic partnerships, internships' },
  { id: 'NGO / Civil Society', label: 'NGO / Civil Society', icon: Heart, color: 'from-emerald-500/20 to-teal-500/20', border: 'border-emerald-500/30', active: 'border-emerald-400 bg-emerald-500/20', text: 'text-emerald-400', desc: 'Programme collaboration and co-delivery' },
  { id: 'Corporate / Business', label: 'Corporate / Business', icon: Building2, color: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-500/30', active: 'border-purple-400 bg-purple-500/20', text: 'text-purple-400', desc: 'CSR initiatives, mentorship, and skills support' },
  { id: 'Media / Content Partner', label: 'Media / Content Partner', icon: Tv, color: 'from-rose-500/20 to-orange-500/20', border: 'border-rose-500/30', active: 'border-rose-400 bg-rose-500/20', text: 'text-rose-400', desc: 'Coverage, storytelling, and visibility campaigns' },
  { id: 'Other', label: 'Other', icon: Layers, color: 'from-dark-700/60 to-dark-600/60', border: 'border-dark-500/30', active: 'border-white/40 bg-white/10', text: 'text-dark-200', desc: 'Something else entirely — we\'re open to ideas' },
]

const benefits = [
  'Direct reach to 500+ engaged youth across 4 African countries',
  'Named visibility in programme materials, social media, and events',
  'Co-creation opportunities — shape programmes aligned to your mission',
  'Transparent quarterly impact reports with measurable data',
  'Access to our network of youth coordinators and campus leaders',
  'Opportunity to host sessions, provide mentors, or offer opportunities',
]

const stats = [
  { value: '500+', label: 'Youth engaged', icon: Users },
  { value: '4', label: 'Active countries', icon: MapPin },
  { value: '4', label: 'Flagship sessions', icon: Zap },
  { value: '200+', label: 'Workshop participants', icon: BookOpen },
]

export default function PartnersPage() {
  const [submitted, setSubmitted] = useState(false)
  const [selectedType, setSelectedType] = useState('')

  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<PartnerForm>({
    resolver: zodResolver(partnerSchema),
  })

  const watchedType = watch('type')

  function selectType(id: string) {
    setSelectedType(id)
    setValue('type', id, { shouldValidate: true })
  }

  async function onSubmit(data: PartnerForm) {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          subject: `Partnership Inquiry — ${data.type} — ${data.organisation}`,
          message: `Organisation: ${data.organisation}\nPartnership type: ${data.type}\n\n${data.message}`,
        }),
      })
      if (!res.ok) throw new Error('Failed to send')
      setSubmitted(true)
      toast.success('Message sent! We\'ll be in touch shortly.')
    } catch {
      toast.error('Something went wrong. Please try again or email us directly.')
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-dark-950 pt-24 pb-20">
        <div className="container-premium space-y-20">

          {/* ── Hero ── */}
          <div className="text-center space-y-5 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
              <Handshake className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-xs font-medium text-blue-400">Partner With Us</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold">
              <span className="text-white">Build Impact </span>
              <span className="text-gradient">Together</span>
            </h1>
            <p className="text-lg text-dark-300 leading-relaxed">
              Rise for Impact works with funders, universities, NGOs, and businesses who share our
              belief that African youth deserve access to real opportunities. We partner to deliver
              verified, on-the-ground programmes across Cameroon, Ghana, Nigeria, and Rwanda.
            </p>
          </div>

          {/* ── Stats ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="glass-card p-6 rounded-2xl text-center">
                <Icon className="w-5 h-5 text-primary-400 mx-auto mb-3" />
                <div className="text-3xl font-display font-bold text-white">{value}</div>
                <div className="text-sm text-dark-400 mt-1">{label}</div>
              </div>
            ))}
          </div>

          {/* ── Why Partner ── */}
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl font-display font-bold text-white">Why partner with Rise for Impact?</h2>
              <p className="text-dark-300 leading-relaxed">
                We are a lean, purpose-driven organisation with direct reach to youth communities across
                four countries. Our programmes are grounded in real delivery — not promises. Partners gain
                concrete visibility, measurable impact data, and genuine co-creation in building the next
                generation of African leaders.
              </p>
              <ul className="space-y-3">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-dark-200 text-sm leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Explore our work</h3>
              {[
                { href: '/impact', label: '2025 Impact Report', desc: 'Verified numbers, real delivery', Icon: Zap },
                { href: '/programs', label: 'Our Programmes', desc: 'Circles, Clinics, Climate & more', Icon: BookOpen },
                { href: '/about', label: 'About Us', desc: 'Our story, team, and values', Icon: Globe },
              ].map(({ href, label, desc, Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center justify-between p-4 rounded-xl bg-dark-900/60 border border-white/8 hover:border-primary-500/40 hover:bg-dark-800/60 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-primary-400" />
                    <div>
                      <div className="text-sm font-semibold text-white">{label}</div>
                      <div className="text-xs text-dark-400">{desc}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-dark-400 group-hover:text-primary-400 transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* ── Inquiry Form ── */}
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-display font-bold text-white">Send a partnership enquiry</h2>
              <p className="text-dark-400">Select a partnership type, then tell us about yourself. We respond within 5 business days.</p>
            </div>

            {submitted ? (
              <div className="glass-card rounded-3xl p-12 text-center space-y-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
                <h3 className="text-2xl font-bold text-white">Enquiry received</h3>
                <p className="text-dark-300 max-w-md mx-auto">
                  Thank you for reaching out. A member of our team will get back to you within 5 business days.
                  In the meantime, explore our programmes or read the 2025 impact report.
                </p>
                <div className="flex gap-3 justify-center pt-2 flex-wrap">
                  <Link href="/impact" className="px-5 py-2.5 rounded-xl bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium hover:bg-primary-500/20 transition-all">View Impact Report</Link>
                  <Link href="/programs" className="px-5 py-2.5 rounded-xl bg-dark-800 border border-dark-600 text-dark-200 text-sm font-medium hover:bg-dark-700 transition-all">Explore Programmes</Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="glass-card rounded-3xl p-8 md:p-10 space-y-8">
                {/* Partnership type selector */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-white">Partnership type <span className="text-rose-400">*</span></label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {partnerTypes.map(({ id, label, icon: Icon, color, border, active, text, desc }) => {
                      const isActive = watchedType === id
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => selectType(id)}
                          className={`text-left p-4 rounded-xl border transition-all bg-gradient-to-br ${color} ${isActive ? active : border} hover:${active}`}
                        >
                          <Icon className={`w-5 h-5 mb-2 ${text}`} />
                          <div className={`text-xs font-semibold ${isActive ? 'text-white' : 'text-dark-200'}`}>{label}</div>
                          <div className="text-xs text-dark-400 mt-0.5 leading-tight">{desc}</div>
                        </button>
                      )
                    })}
                  </div>
                  <input type="hidden" {...register('type')} />
                  {errors.type && <p className="text-rose-400 text-xs">{errors.type.message}</p>}
                </div>

                {/* Fields */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-dark-200">Your name <span className="text-rose-400">*</span></label>
                    <input
                      {...register('name')}
                      placeholder="Full name"
                      className="w-full px-4 py-3 rounded-xl bg-dark-800/60 border border-dark-600 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500/60 focus:ring-1 focus:ring-primary-500/30 transition-all text-sm"
                    />
                    {errors.name && <p className="text-rose-400 text-xs">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-dark-200">Email address <span className="text-rose-400">*</span></label>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="you@organisation.org"
                      className="w-full px-4 py-3 rounded-xl bg-dark-800/60 border border-dark-600 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500/60 focus:ring-1 focus:ring-primary-500/30 transition-all text-sm"
                    />
                    {errors.email && <p className="text-rose-400 text-xs">{errors.email.message}</p>}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-dark-200">Organisation name <span className="text-rose-400">*</span></label>
                  <input
                    {...register('organisation')}
                    placeholder="Your organisation or institution"
                    className="w-full px-4 py-3 rounded-xl bg-dark-800/60 border border-dark-600 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500/60 focus:ring-1 focus:ring-primary-500/30 transition-all text-sm"
                  />
                  {errors.organisation && <p className="text-rose-400 text-xs">{errors.organisation.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-dark-200">Tell us about your interest <span className="text-rose-400">*</span></label>
                  <textarea
                    {...register('message')}
                    rows={5}
                    placeholder="Describe how you'd like to partner, what you bring to the table, and any specific programmes or regions you're interested in..."
                    className="w-full px-4 py-3 rounded-xl bg-dark-800/60 border border-dark-600 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500/60 focus:ring-1 focus:ring-primary-500/30 transition-all text-sm resize-none"
                  />
                  {errors.message && <p className="text-rose-400 text-xs">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white font-semibold transition-all shadow-lg hover:shadow-primary-500/25 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? 'Sending...' : 'Send partnership enquiry'}
                </button>
              </form>
            )}
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
