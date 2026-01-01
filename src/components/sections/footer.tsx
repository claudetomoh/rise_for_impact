'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  MessageCircle,
  Mail,
  MapPin,
  Phone,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const footerLinks = {
  about: [
    { name: 'Our Story', href: '/#about' },
    { name: 'Mission & Vision', href: '/#mission' },
    { name: 'Team', href: '/#team' },
    { name: 'Partners', href: '/partners' },
    { name: 'Annual Reports', href: '/reports' },
  ],
  programs: [
    { name: 'Rise Circles', href: '/#programs' },
    { name: 'Impact Clinics', href: '/#programs' },
    { name: 'Rise for Climate', href: '/#programs' },
    { name: 'All Programs', href: '/#programs' },
  ],
  regions: [
    { name: 'Cameroon Northwest', href: '/#regions' },
    { name: 'Cameroon Southwest', href: '/#regions' },
    { name: 'University Clubs', href: '/#clubs' },
    { name: 'All Regions', href: '/regions' },
  ],
  resources: [
    { name: 'Blog', href: '/blog' },
    { name: 'Media Hub', href: '/#media' },
    { name: 'Press Kit', href: '/press' },
  ],
}

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/company/rise-for-impact', label: 'LinkedIn' },
  { icon: Facebook, href: 'https://www.facebook.com/share/1HVFiDupbD/?mibextid=wwXIfr', label: 'Facebook' },
  { icon: MessageCircle, href: 'https://whatsapp.com/channel/0029Vb6V96K65yD3HeLLCm2p', label: 'WhatsApp Channel', color: 'hover:bg-green-500' },
  { icon: MessageCircle, href: 'https://chat.whatsapp.com/B80mZmR3H5P9Lzl505AVlK', label: 'WhatsApp Group', color: 'hover:bg-green-600' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
]

export function Footer() {
  return (
    <footer className="relative bg-dark-950 border-t border-dark-800">
      {/* Main Footer Content */}
      <div className="container-premium py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className="relative w-14 h-14"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/30 to-teal-400/30 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300" />
                <img 
                  src="/images/logo.jpeg" 
                  alt="Rise for Impact Logo" 
                  className="relative w-full h-full object-cover rounded-2xl shadow-2xl ring-2 ring-emerald-400/30 group-hover:ring-emerald-400/60 transition-all duration-300"
                />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xl font-display font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Rise for Impact
                </span>
                <span className="text-xs text-emerald-300/70 font-medium">Empowering African Youth</span>
              </div>
            </Link>

            <p className="text-emerald-100/60 leading-relaxed font-medium">
              A pan-African youth-led organization empowering young leaders 
              to drive sustainable development through leadership development, 
              climate action, and civic education.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 rounded-xl glass flex items-center justify-center hover:bg-emerald-500/25 transition-all duration-300 shadow-lg hover:shadow-emerald-500/30"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-emerald-100/70 hover:text-emerald-300 transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* About Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-lg">About</h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-dark-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-lg">Programs</h4>
            <ul className="space-y-3">
              {footerLinks.programs.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-dark-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Regions Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-lg">Regions</h4>
            <ul className="space-y-3">
              {footerLinks.regions.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-dark-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-lg">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-dark-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="glass-card p-6 rounded-2xl mb-12">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-primary-400" />
              </div>
              <div>
                <div className="text-white font-medium mb-1">Email</div>
                <a href="mailto:info@riseforimpact.org" className="text-dark-400 hover:text-primary-400 transition-colors text-sm">
                  info@riseforimpact.org
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent-500/20 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-accent-400" />
              </div>
              <div>
                <div className="text-white font-medium mb-1">Phone</div>
                <div className="space-y-1">
                  <a href="tel:+233538034157" className="text-dark-400 hover:text-primary-400 transition-colors text-sm block">
                    +233 538 034 157
                  </a>
                  <a href="tel:+237673031205" className="text-dark-400 hover:text-primary-400 transition-colors text-sm block">
                    +237 673 031 205
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <div className="text-white font-medium mb-1">Location</div>
                <div className="text-dark-400 text-sm space-y-1">
                  <p>Eastern Region, Ghana</p>
                  <p>Yaoundé, Cameroon</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-dark-800">        
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-dark-400 text-sm">
              © {new Date().getFullYear()} Rise for Impact. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-dark-400 hover:text-primary-400 transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-dark-400 hover:text-primary-400 transition-colors text-sm">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-dark-400 hover:text-primary-400 transition-colors text-sm">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
