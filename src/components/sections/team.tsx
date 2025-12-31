'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Linkedin, Twitter, Mail, MapPin, Users, Award, Globe, Briefcase, ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AnimatedSection } from '@/components/animations/motion-wrappers'
import { SectionParallax } from '@/components/animations/parallax-background'

interface TeamMember {
  id: number
  name: string
  role: string
  category: string
  country?: string
  countryFlag?: string
  focus?: string
  image?: string
  linkedin?: string
  twitter?: string
  bio?: string
}

export function Team() {
  const [activeTab, setActiveTab] = useState<'executive' | 'coordinators' | 'regional'>('executive')
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch('/api/team')
      if (response.ok) {
        const data = await response.json()
        setTeamMembers(data)
      }
    } catch (error) {
      console.error('Error fetching team members:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const executiveTeam = teamMembers.filter(m => m.category === 'executive')
  const teamAndCountryCoordinators = teamMembers.filter(m => m.category === 'coordinators')
  const regionalCoordinators = teamMembers.filter(m => m.category === 'regional')

  console.log('All team members:', teamMembers)
  console.log('Executive team:', executiveTeam)
  console.log('Coordinators:', teamAndCountryCoordinators)
  console.log('Regional:', regionalCoordinators)

  if (isLoading) {
    return (
      <section id="team" className="py-12 md:py-16 relative overflow-hidden">
        <SectionParallax image="/images/backgrounds/Togetherness.jpg" intensity={0.3} />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/95 via-dark-800/90 to-dark-900/95" />
        <div className="container-premium relative z-10">
          <div className="text-center text-white text-xl py-20">Loading team members...</div>
        </div>
      </section>
    )
  }


  return (
    <section id="team" className="py-12 md:py-16 relative overflow-hidden">
      {/* Parallax Background */}
      <SectionParallax image="/images/backgrounds/Togetherness.jpg" intensity={0.3} />
      
      {/* Additional overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/95 via-dark-800/90 to-dark-900/95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(34,197,94,0.08),transparent_70%)]" />

      <div className="container-premium relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20"
          >
            <Users className="w-4 h-4 text-primary-400" />
            <span className="text-sm font-medium text-primary-400">Our Team</span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-display font-bold">
            <span className="text-white">Leadership, operations, and </span>
            <span className="text-gradient">boots-on-the-ground coordinators.</span>
          </h2>

          <p className="text-xl text-dark-300 max-w-3xl mx-auto leading-relaxed">
            The executive board supervises the content, communications, and program teams before responsibility flows down to the country coordinators.
          </p>
        </AnimatedSection>

        {/* Tabs Navigation */}
        <AnimatedSection className="mb-16">
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { id: 'executive' as const, label: 'Executive Board & Leadership', icon: Users },
              { id: 'coordinators' as const, label: 'Team & Country Coordinators', icon: Globe },
              { id: 'regional' as const, label: 'Regional Coordinators', icon: Globe }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-xl shadow-primary-500/25'
                    : 'bg-dark-700/50 text-dark-300 hover:bg-dark-700 hover:text-white'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </motion.button>
            ))}
          </div>
        </AnimatedSection>

        {/* Team Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'executive' && (
            <motion.div
              key="executive"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-white mb-4">EXECUTIVE BOARD & LEADERSHIP</h3>
                <p className="text-lg text-dark-300 max-w-2xl mx-auto">
                  Guiding Rise for Impact with clarity and purpose.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {executiveTeam.map((member, index) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="group hover:scale-105 transition-all duration-500 overflow-hidden h-full border-2 border-primary-500/20 hover:border-primary-500/50">
                      {/* Premium Image Container */}
                      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-primary-100 via-emerald-50 to-teal-100">
                        {/* Image with proper framing */}
                        <div className="absolute inset-0 p-4">
                          <div className="w-full h-full rounded-2xl overflow-hidden border-4 border-white/50 shadow-2xl">
                            <img 
                              src={member.image}
                              alt={member.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                          </div>
                        </div>
                        
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent" />
                        
                        {/* Decorative corner accent */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-500/30 to-transparent rounded-bl-full" />
                        
                        {/* Social Links */}
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {member.linkedin && (
                            <a href={member.linkedin} className="p-2.5 rounded-xl bg-white/90 backdrop-blur-sm text-primary-600 hover:bg-primary-500 hover:text-white transition-colors shadow-lg">
                              <Linkedin className="w-4 h-4" />
                            </a>
                          )}
                          {member.twitter && (
                            <a href={member.twitter} className="p-2.5 rounded-xl bg-white/90 backdrop-blur-sm text-primary-600 hover:bg-primary-500 hover:text-white transition-colors shadow-lg">
                              <Twitter className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Content section with better spacing */}
                      <div className="p-6 space-y-3 bg-gradient-to-b from-dark-800/50 to-dark-900">
                        <h3 className="text-xl font-bold text-white group-hover:text-primary-300 transition-colors">
                          {member.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Badge variant="primary" className="text-xs">{member.role}</Badge>
                        </div>
                        {member.bio && (
                          <p className="text-sm text-dark-200 leading-relaxed">{member.bio}</p>
                        )}
                        {member.country && (
                          <div className="flex items-center gap-2 text-sm text-primary-400 pt-2 border-t border-dark-700">
                            <MapPin className="w-4 h-4" />
                            <span>{member.country}</span>
                          </div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'coordinators' && (
            <motion.div
              key="coordinators"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-white mb-4">TEAM & COUNTRY COORDINATORS</h3>
                <p className="text-lg text-dark-300 max-w-2xl mx-auto">
                  Leadership, operations, and boots-on-the-ground coordinators.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamAndCountryCoordinators.map((coordinator, index) => (
                  <motion.div
                    key={coordinator.name}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="group hover:scale-105 transition-all duration-500 overflow-hidden h-full border-2 border-accent-500/20 hover:border-accent-500/50">
                      {/* Premium Image Container */}
                      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-accent-100 via-orange-50 to-amber-100">
                        {/* Image with proper framing */}
                        <div className="absolute inset-0 p-4">
                          <div className="w-full h-full rounded-2xl overflow-hidden border-4 border-white/50 shadow-2xl">
                            <img 
                              src={coordinator.image}
                              alt={coordinator.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                          </div>
                        </div>
                        
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent" />
                        
                        {/* Decorative corner accent */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-accent-500/30 to-transparent rounded-bl-full" />
                      </div>

                      {/* Content section */}
                      <div className="p-6 space-y-3 bg-gradient-to-b from-dark-800/50 to-dark-900">
                        <h3 className="text-lg font-bold text-white group-hover:text-accent-300 transition-colors">
                          {coordinator.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Badge variant="warning" className="text-xs">{coordinator.role}</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-accent-400 pt-2 border-t border-dark-700">
                          <MapPin className="w-4 h-4" />
                          <span>{coordinator.country}</span>
                        </div>
                        {coordinator.focus && (
                          <p className="text-xs text-dark-200">Focus: {coordinator.focus}</p>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'regional' && (
            <motion.div
              key="regional"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-white mb-4">Regional Coordinators</h3>
                <p className="text-lg text-dark-300 max-w-2xl mx-auto">
                  Regional leaders coordinating multi-country initiatives.
                </p>
              </div>

              {regionalCoordinators.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {regionalCoordinators.map((coordinator, index) => (
                    <motion.div
                      key={coordinator.name}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="group hover:scale-105 transition-all duration-500 overflow-hidden h-full border-2 border-blue-500/20 hover:border-blue-500/50">
                        {/* Premium Image Container */}
                        <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-blue-100 via-cyan-50 to-sky-100">
                          {/* Image with proper framing */}
                          <div className="absolute inset-0 p-4">
                            <div className="w-full h-full rounded-2xl overflow-hidden border-4 border-white/50 shadow-2xl">
                              <img 
                                src={coordinator.image}
                                alt={coordinator.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                            </div>
                          </div>
                          
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent" />
                          
                          {/* Decorative corner accent */}
                          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/30 to-transparent rounded-bl-full" />
                          
                          {/* Regional Badge */}
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-blue-500/90 backdrop-blur-sm text-white shadow-lg">
                              <Globe className="w-3 h-3 mr-1" />
                              Regional
                            </Badge>
                          </div>
                        </div>

                        {/* Content section */}
                        <div className="p-6 space-y-4 bg-gradient-to-b from-dark-800/50 to-dark-900">
                          <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                            {coordinator.name}
                          </h3>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-blue-500/20 text-blue-300 border border-blue-500/30">
                              {coordinator.role}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-blue-400 pt-2 border-t border-dark-700">
                            <MapPin className="w-4 h-4" />
                            <span>{coordinator.country}</span>
                          </div>
                          {coordinator.focus && (
                            <p className="text-sm text-dark-200 leading-relaxed">{coordinator.focus}</p>
                          )}
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <Globe className="w-20 h-20 text-dark-600 mx-auto mb-6" />
                  <p className="text-xl text-dark-400">Regional coordinator positions opening soon.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Join Team CTA */}
        <AnimatedSection className="mt-20">
          <div className="glass-card p-12 rounded-3xl text-center max-w-3xl mx-auto">
            <h3 className="text-3xl font-display font-bold text-white mb-4">
              Want to Join Our Team?
            </h3>
            <p className="text-dark-300 text-lg mb-8">
              We're always looking for passionate individuals to join our mission 
              of empowering African youth.
            </p>
            <Link href="/get-involved">
              <Button variant="primary" size="lg" className="px-8">
                <Mail className="w-5 h-5 mr-2" />
                View Open Positions
              </Button>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
