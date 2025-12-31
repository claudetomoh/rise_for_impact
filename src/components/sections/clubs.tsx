'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { GraduationCap, Users, Award, Calendar, MapPin, ExternalLink } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AnimatedSection } from '@/components/animations/motion-wrappers'
import { SectionParallax } from '@/components/animations/parallax-background'

const clubs = [
  {
    name: 'Ashesi University Chapter',
    university: 'Ashesi University',
    location: 'Berekuso, Ghana',
    established: '2025',
    members: '400+',
    president: 'Sarah Mensah',
    image: '/images/backgrounds/club-team.jpeg',
    color: 'from-primary-500 to-primary-600',
    description: 'Our flagship university club driving innovation, leadership, and social impact at Ashesi University.',
    achievements: [
      'Leading community impact projects',
      'Monthly leadership circles',
      'Civic education workshops',
      'Growing partnerships with local organizations'
    ],
    focus: ['Leadership', 'Innovation', 'Community Service'],
    status: 'active',
    whatsappLink: 'https://chat.whatsapp.com/J6GBQ12tXM2LpsdgemrDt2'
  },
  {
    name: 'University of Buea Chapter',
    university: 'University of Buea',
    location: 'Buea, Cameroon',
    established: '2025',
    members: '200+',
    president: 'Emmanuel Tabe',
    image: '/images/backgrounds/buea-chapter.jpeg',
    color: 'from-accent-500 to-accent-600',
    description: 'Empowering students to create sustainable solutions for Southwest Cameroon communities.',
    achievements: [
      'Climate action initiatives',
      'Women empowerment workshops',
      'Community development projects',
      'Student leadership training'
    ],
    focus: ['Climate Action', 'Education', 'Gender Equality'],
    status: 'active',
    whatsappLink: 'https://chat.whatsapp.com/HRo4Qf39p3P7sSRQzGkmqT'
  },
  {
    name: 'University of Ghana Chapter',
    university: 'University of Ghana',
    location: 'Accra, Ghana',
    established: '2025',
    members: 'Launching',
    president: 'TBA',
    image: '/images/backgrounds/ClubMeeting2.jpeg',
    color: 'from-blue-500 to-blue-600',
    description: 'Building a community of student leaders committed to driving social impact across Ghana.',
    achievements: [
      'Recruiting founding members',
      'Establishing partnerships',
      'Planning launch activities'
    ],
    focus: ['Leadership', 'Social Impact', 'Community Development'],
    status: 'launching'
  },
  {
    name: 'Academic City Chapter',
    university: 'Academic City University College',
    location: 'Accra, Ghana',
    established: '2025',
    members: 'Launching',
    president: 'TBA',
    image: '/images/backgrounds/academic-city-club.jpeg',
    color: 'from-purple-500 to-purple-600',
    description: 'Connecting students with opportunities for innovation, entrepreneurship, and social change.',
    achievements: [
      'Establishing club structure',
      'Building student interest',
      'Connecting with university administration'
    ],
    focus: ['Innovation', 'Entrepreneurship', 'Technology'],
    status: 'launching'
  }
]

const stats = [
  { label: 'University Clubs', value: '4+', icon: GraduationCap },
  { label: 'Student Members', value: '1,000+', icon: Users },
  { label: 'Campus Projects', value: '15+', icon: Award }
]

export function Clubs() {
  return (
    <section id="clubs" className="py-8 md:py-12 relative overflow-hidden">
      {/* Parallax Background */}
      <SectionParallax image="/images/backgrounds/ClubMeeting.jpeg" intensity={0.3} />
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-800/50 via-dark-900/40 to-dark-800/50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(168,85,247,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.08),transparent_50%)]" />

      <div className="container-premium relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-8 md:mb-12 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20"
          >
            <GraduationCap className="w-3.5 h-3.5 text-primary-400" />
            <span className="text-xs md:text-sm font-medium text-primary-400">Campus Chapters</span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-display font-bold">
            <span className="text-white">Campus </span>
            <span className="text-gradient">Chapters</span>
          </h2>

          <p className="text-xl text-dark-300 max-w-3xl mx-auto leading-relaxed">
            Student-led chapters bringing leadership development and community impact 
            to universities across Africa.
          </p>
        </AnimatedSection>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16 max-w-4xl mx-auto">
          {stats.map((stat, index) => {
            const colors = [
              { icon: 'text-purple-400', gradient: 'from-purple-500/20 to-purple-600/10', border: 'border-purple-500/30', glow: 'shadow-purple-500/20' },
              { icon: 'text-blue-400', gradient: 'from-blue-500/20 to-blue-600/10', border: 'border-blue-500/30', glow: 'shadow-blue-500/20' },
              { icon: 'text-pink-400', gradient: 'from-pink-500/20 to-pink-600/10', border: 'border-pink-500/30', glow: 'shadow-pink-500/20' },
              { icon: 'text-emerald-400', gradient: 'from-emerald-500/20 to-emerald-600/10', border: 'border-emerald-500/30', glow: 'shadow-emerald-500/20' },
            ];
            const color = colors[index % colors.length];
            
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className={`relative group overflow-hidden rounded-2xl p-5 md:p-6 text-center backdrop-blur-xl border ${color.border} bg-gradient-to-br ${color.gradient} hover:shadow-2xl ${color.glow} transition-all duration-300`}
              >
                {/* Animated gradient background on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className={`absolute inset-0 bg-gradient-to-br ${color.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                
                {/* Decorative corner accent */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${color.gradient} rounded-bl-full opacity-30`} />
                
                <div className="relative z-10">
                  {/* Icon with animated background */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 rounded-xl bg-gradient-to-br ${color.gradient} flex items-center justify-center border ${color.border} shadow-lg ${color.glow}`}
                  >
                    <stat.icon className={`w-6 h-6 md:w-7 md:h-7 ${color.icon}`} />
                  </motion.div>
                  
                  {/* Value with gradient text */}
                  <div className="text-2xl md:text-3xl font-display font-bold mb-1 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  
                  {/* Label */}
                  <div className="text-dark-300 text-xs md:text-sm font-medium tracking-wide">
                    {stat.label}
                  </div>
                </div>
                
                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${color.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              </motion.div>
            );
          })}
        </div>

        {/* Clubs Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {clubs.map((club, index) => (
            <motion.div
              key={club.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group h-full hover:scale-[1.02] transition-all duration-500">
                {/* Image Header */}
                <div className="relative h-56 overflow-hidden rounded-t-3xl">
                  <img 
                    src={club.image}
                    alt={club.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent" />
                  
                  {/* Established Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge variant="gradient" size="sm">
                      Est. {club.established}
                    </Badge>
                  </div>

                  {/* University Logo/Badge */}
                  <div className="absolute bottom-4 left-4">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={`px-4 py-2 rounded-xl bg-gradient-to-r ${club.color} backdrop-blur-xl shadow-glow`}
                    >
                      <div className="text-white font-bold text-sm">{club.members}</div>
                      <div className="text-white/80 text-xs">Members</div>
                    </motion.div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-6">
                  <div>
                    <h3 className="text-2xl font-display font-bold text-white mb-2">
                      {club.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-dark-400 mb-3">
                      <MapPin className="w-4 h-4 text-primary-400" />
                      <span>{club.location}</span>
                    </div>
                    <p className="text-dark-300 leading-relaxed">
                      {club.description}
                    </p>
                  </div>

                  {/* Focus Areas */}
                  <div className="flex flex-wrap gap-2">
                    {club.focus.map((area) => (
                      <Badge key={area} variant="primary" size="sm">
                        {area}
                      </Badge>
                    ))}
                  </div>

                  {/* Achievements */}
                  <div>
                    <h4 className="text-sm font-semibold text-primary-400 mb-3">Key Achievements</h4>
                    <ul className="space-y-2">
                      {club.achievements.map((achievement) => (
                        <li key={achievement} className="flex items-start gap-2 text-sm text-dark-400">
                          <Award className="w-4 h-4 text-accent-400 flex-shrink-0 mt-0.5" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* President */}
                  <div className="pt-4 border-t border-dark-700">
                    <div className="text-xs text-dark-500 mb-1">Club President</div>
                    <div className="text-sm font-semibold text-white">{club.president}</div>
                  </div>

                  {club.whatsappLink ? (
                    <a href={club.whatsappLink} target="_blank" rel="noopener noreferrer">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        rightIcon={<ExternalLink />}
                        fullWidth
                        className="group-hover:bg-white/5"
                      >
                        Join WhatsApp Group
                      </Button>
                    </a>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      rightIcon={<ExternalLink />}
                      fullWidth
                      className="group-hover:bg-white/5"
                    >
                      Learn More
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection className="text-center">
          <div className="glass-card p-12 rounded-3xl max-w-4xl mx-auto">
            <GraduationCap className="w-16 h-16 mx-auto mb-6 text-primary-400" />
            <h3 className="text-3xl font-display font-bold text-white mb-4">
              Start a Club at Your University
            </h3>
            <p className="text-dark-300 text-lg mb-8 max-w-2xl mx-auto">
              Are you a student leader passionate about creating impact? Join our network 
              of university chapters and bring Rise for Impact to your campus.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/programs/campus-ambassadors">
                <Button variant="primary" size="lg">
                  Start a Chapter
                </Button>
              </Link>
              <a href="mailto:info@riseforimpact.org?subject=Join University Club">
                <Button variant="outline" size="lg">
                  Join Existing Club
                </Button>
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
