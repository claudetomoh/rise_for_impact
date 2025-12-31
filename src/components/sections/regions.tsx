'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, Users, Sparkles, TrendingUp, Globe } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AnimatedSection } from '@/components/animations/motion-wrappers'
import { SectionParallax } from '@/components/animations/parallax-background'

const regions = [
  {
    name: 'Cameroon Northwest',
    code: 'NW',
    description: 'Empowering young leaders to drive sustainable community transformation through leadership development and impactful programs.',
    members: '150+',
    projects: '3+',
    image: '/images/backgrounds/nw.jpeg',
    color: 'from-primary-500 to-primary-600',
    coordinator: {
      name: 'Chafor Ramson Njoyue',
      role: 'Regional Coordinator',
      focus: ['Community Building', 'Leadership Development', 'Youth Empowerment']
    },
    highlights: [
      'Rise Circles leadership training',
      'Impact Clinics for social innovation',
      'Community development projects',
      'Youth advocacy programs'
    ],
    exploreLink: '/#newsletter'
  },
  {
    name: 'Cameroon Southwest',
    code: 'SW',
    description: 'Building resilient communities in the Southwest Region through youth-led sustainable development initiatives.',
    members: '200+',
    projects: '5+',
    image: '/images/backgrounds/sw.jpeg',
    color: 'from-accent-500 to-accent-600',
    highlights: [
      'Community development projects',
      'Active youth engagement',
      'Impact Clinics',
      'Environmental conservation'
    ],
    exploreLink: 'https://chat.whatsapp.com/HRo4Qf39p3P7sSRQzGkmqT'
  }
]

const stats = [
  { label: 'Countries', value: '8+', icon: Globe },
  { label: 'Active Clubs', value: '4+', icon: MapPin },
  { label: 'Active Members', value: '10,000+', icon: Users },
  { label: 'Community Projects', value: '50+', icon: TrendingUp },
  { label: 'Campus Projects', value: '15+', icon: Sparkles }
]

export function Regions() {
  return (
    <section id="regions" className="py-8 md:py-12 relative overflow-hidden">
      {/* Parallax Background */}
      <SectionParallax image="/images/backgrounds/bg.jpeg" intensity={0.3} />
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/50 via-dark-800/40 to-dark-900/50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(34,197,94,0.08),transparent_50%)]" />

      <div className="container-premium relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-8 md:mb-12 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20"
          >
            <MapPin className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs md:text-sm font-medium text-blue-400">Our Regions</span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-display font-bold">
            <span className="text-white">Pan-African </span>
            <span className="text-gradient">Presence</span>
          </h2>

          <p className="text-xl text-dark-300 max-w-3xl mx-auto leading-relaxed">
            From local communities to continental impact, our regional chapters are 
            driving sustainable change across Africa.
          </p>
        </AnimatedSection>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 md:mb-12">
          {stats.map((stat, index) => {
            const colors = [
              { icon: 'text-blue-400', gradient: 'from-blue-500 to-blue-600', bg: 'from-blue-500/20 to-blue-600/10', border: 'border-blue-500/30', glow: 'shadow-blue-500/20' },
              { icon: 'text-emerald-400', gradient: 'from-emerald-500 to-emerald-600', bg: 'from-emerald-500/20 to-emerald-600/10', border: 'border-emerald-500/30', glow: 'shadow-emerald-500/20' },
              { icon: 'text-purple-400', gradient: 'from-purple-500 to-purple-600', bg: 'from-purple-500/20 to-purple-600/10', border: 'border-purple-500/30', glow: 'shadow-purple-500/20' },
              { icon: 'text-amber-400', gradient: 'from-amber-500 to-amber-600', bg: 'from-amber-500/20 to-amber-600/10', border: 'border-amber-500/30', glow: 'shadow-amber-500/20' },
            ];
            const color = colors[index % colors.length];
            
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring" }}
                whileHover={{ y: -6, scale: 1.03 }}
                className={`relative group overflow-hidden rounded-2xl backdrop-blur-xl border ${color.border} bg-gradient-to-br ${color.bg} hover:shadow-2xl ${color.glow} transition-all duration-300`}
              >
                {/* Shimmer Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
                
                {/* Content */}
                <div className="relative z-10 p-4 md:p-5 text-center">
                  {/* Icon with pulse */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.15 }}
                    transition={{ duration: 0.6, type: "spring" }}
                    className={`relative w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 rounded-xl bg-gradient-to-br ${color.gradient} flex items-center justify-center shadow-lg ${color.glow}`}
                  >
                    <stat.icon className={`w-5 h-5 md:w-6 md:h-6 ${color.icon}`} />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`absolute inset-0 rounded-xl bg-gradient-to-br ${color.gradient} opacity-50`}
                    />
                  </motion.div>
                  
                  {/* Value */}
                  <div className="text-2xl md:text-3xl font-display font-bold mb-1 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  
                  {/* Label */}
                  <div className="text-dark-300 text-xs md:text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
                
                {/* Corner accent */}
                <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${color.gradient} rounded-bl-full opacity-20`} />
              </motion.div>
            );
          })}
        </div>

        {/* Regions Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {regions.map((region, index) => (
            <motion.div
              key={region.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group h-full hover:scale-[1.02] transition-all duration-500 overflow-hidden">
                {/* Header with Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={region.image}
                    alt={region.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/80 to-transparent" />
                  
                  {/* Region Badge */}
                  <div className="absolute top-6 left-6">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${region.color} flex items-center justify-center shadow-glow`}
                    >
                      <span className="text-2xl font-bold text-white">{region.code}</span>
                    </motion.div>
                  </div>

                  {/* Stats Badges */}
                  <div className="absolute bottom-6 left-6 right-6 flex gap-3">
                    <Badge variant="gradient" size="sm">
                      <Users className="w-3 h-3 mr-1" />
                      {region.members} Members
                    </Badge>
                    <Badge variant="gradient" size="sm">
                      <Sparkles className="w-3 h-3 mr-1" />
                      {region.projects} Projects
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-6">
                  <div>
                    <h3 className="text-2xl font-display font-bold text-white mb-3">
                      {region.name}
                    </h3>
                    <p className="text-dark-300 leading-relaxed">
                      {region.description}
                    </p>
                  </div>

                  {/* Regional Coordinator */}
                  {region.coordinator && (
                    <div className="pt-4 border-t border-dark-700">
                      <h4 className="text-sm font-semibold text-primary-400 mb-3">Regional Coordinator</h4>
                      <div className="space-y-2">
                        <h5 className="font-bold text-white">{region.coordinator.name}</h5>
                        <div className="flex flex-wrap gap-1.5">
                          {region.coordinator.focus.map((item) => (
                            <span key={item} className="px-2 py-1 text-xs rounded-md bg-primary-500/10 text-primary-400 border border-primary-500/20">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Highlights */}
                  <div>
                    <h4 className="text-sm font-semibold text-primary-400 mb-3">Key Highlights</h4>
                    <ul className="space-y-2">
                      {region.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-2 text-sm text-dark-400">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-1.5 flex-shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {region.exploreLink ? (
                    region.exploreLink.startsWith('http') ? (
                      <a href={region.exploreLink} target="_blank" rel="noopener noreferrer" className="block">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          fullWidth
                          className="group-hover:bg-white/5"
                        >
                          Explore Region
                        </Button>
                      </a>
                    ) : (
                      <Link href={region.exploreLink}>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          fullWidth
                          className="group-hover:bg-white/5"
                        >
                          Explore Region
                        </Button>
                      </Link>
                    )
                  ) : (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      fullWidth
                      className="group-hover:bg-white/5"
                    >
                      Explore Region
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection className="text-center">
          <div className="glass-card p-12 rounded-3xl max-w-3xl mx-auto">
            <h3 className="text-3xl font-display font-bold text-white mb-4">
              Start a Chapter in Your Region
            </h3>
            <p className="text-dark-300 text-lg mb-8">
              Want to bring Rise for Impact to your community? We support passionate 
              leaders to establish new regional chapters.
            </p>
            <Link href="/get-involved">
              <Button variant="primary" size="lg">
                Apply to Start a Chapter
              </Button>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
