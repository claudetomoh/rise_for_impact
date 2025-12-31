'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Users, BookOpen, Globe, Sprout, GraduationCap, Heart, Award, Megaphone, ArrowRight, CheckCircle2, X, Calendar, MapPin, Target, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AnimatedSection, FadeIn } from '@/components/animations/motion-wrappers'
import { SectionParallax } from '@/components/animations/parallax-background'

interface Program {
  id: number | string
  title: string
  description?: string
  shortDesc?: string
  longDesc?: string
  longDescription?: string
  location?: string
  locations?: string
  image?: string
  startDate?: string
  endDate?: string
  status?: string
  participants?: number
  applicationsOpen?: boolean
  applicationUrl?: string
  duration?: string
  focus?: string
  frequency?: string
  icon?: any
  color?: string
  glowColor?: string
  features?: string[]
  impact?: string
}

const programs = [
  {
    id: 'rise-circles',
    title: 'Rise Circles',
    icon: Users,
    color: 'from-primary-500 to-primary-600',
    glowColor: 'primary-500',
    description: 'Leadership development through peer learning circles where young leaders collaborate, share experiences, and develop essential skills.',
    longDescription: 'Rise Circles bring together young leaders in structured peer learning environments where they develop critical leadership competencies, share experiences, and collaborate on solving community challenges. Through monthly workshops and mentorship, participants build networks that last beyond the program.',
    features: [
      'Monthly leadership workshops',
      'Peer mentorship programs',
      'Collaborative projects',
      'Skill-building sessions'
    ],
    impact: 'Growing community',
    duration: '6 months',
    frequency: 'Weekly meetings',
    locations: '8+ countries',
    image: '/images/backgrounds/ClubMeeting.jpeg'
  },
  {
    id: 'impact-clinics',
    title: 'Impact Clinics',
    icon: Sprout,
    color: 'from-accent-500 to-accent-600',
    glowColor: 'accent-500',
    description: 'Community-driven initiatives addressing local challenges through sustainable, youth-led solutions.',
    longDescription: 'Impact Clinics provide a structured approach to community development, where youth identify local challenges, design innovative solutions, and implement sustainable projects with measurable impact.',
    features: [
      'Community needs assessment',
      'Project design & planning',
      'Implementation support',
      'Impact measurement'
    ],
    impact: 'Active programs',
    duration: '3-12 months',
    frequency: 'Project-based',
    locations: 'Multiple communities',
    image: '/images/backgrounds/impact1.jpeg'
  },
  {
    id: 'rise-for-climate',
    title: 'Rise for Climate',
    icon: Globe,
    color: 'from-blue-500 to-blue-600',
    glowColor: 'blue-500',
    description: 'Climate action and environmental stewardship programs empowering youth to address climate challenges.',
    longDescription: 'Our climate program mobilizes young people to take concrete action against climate change through tree planting, environmental education, sustainable practices, and advocacy for policy change.',
    features: [
      'Climate education workshops',
      'Tree planting campaigns',
      'Sustainable practices training',
      'Advocacy initiatives'
    ],
    impact: 'Growing environmental impact',
    duration: 'Ongoing',
    frequency: 'Monthly campaigns',
    locations: '8+ countries',
    image: '/images/backgrounds/Togetherness.jpg'
  },
  {
    id: 'fellowship',
    title: 'Rise for Impact Fellowship',
    icon: Award,
    color: 'from-yellow-500 to-yellow-600',
    glowColor: 'yellow-500',
    description: 'Annual intensive program equipping young leaders with essential skills in leadership, grant writing, storytelling, and public speaking.',
    longDescription: 'The Rise for Impact Fellowship is a transformative year-round program bringing together exceptional young leaders from across Africa. Fellows receive comprehensive training in leadership development, storytelling, grant writing, public speaking, and relationship building to make them more competitive and effective changemakers.',
    features: [
      'Leadership development training',
      'Grant writing workshops',
      'Storytelling & communication skills',
      'Public speaking masterclasses',
      'Networking opportunities',
      'Mentorship from experts'
    ],
    impact: 'Applications opening soon',
    duration: '1 year',
    frequency: 'Quarterly convening',
    locations: 'Regional cohorts',
    image: '/images/backgrounds/fellowship.jpeg'
  },
  {
    id: 'campus-ambassadors',
    title: 'Campus Ambassadors Program',
    icon: Megaphone,
    color: 'from-indigo-500 to-indigo-600',
    glowColor: 'indigo-500',
    description: 'Empowering student leaders to establish and run Rise for Impact clubs on their university campuses.',
    longDescription: 'The Campus Ambassadors Program identifies and supports passionate student leaders to establish Rise for Impact chapters at their universities. Ambassadors receive training, resources, and ongoing support to build vibrant campus communities driving social impact.',
    features: [
      'Ambassador training & certification',
      'Club establishment toolkit',
      'Monthly resources & support',
      'Inter-campus networking',
      'Leadership development',
      'Event planning support'
    ],
    impact: 'Applications opening soon',
    duration: 'Academic year',
    frequency: 'Ongoing support',
    locations: 'Universities across Africa',
    image: '/images/backgrounds/ClubMeeting2.jpeg'
  },
  {
    id: 'opportunity-plug',
    title: 'Opportunity Plug',
    icon: Briefcase,
    color: 'from-orange-500 to-orange-600',
    glowColor: 'orange-500',
    description: 'Your gateway to fellowships, scholarships, and opportunities across Africa. We curate and share the latest opportunities with application guidance.',
    longDescription: 'Opportunity Plug is our dedicated platform for bringing the best fellowships, scholarships, grants, and leadership programs directly to young African changemakers. We not only share opportunities but provide guidance on crafting winning applications, meeting deadlines, and maximizing your chances of success.',
    features: [
      'Curated opportunities database',
      'Application deadline tracking',
      'Step-by-step application guidance',
      'Success tips & resources',
      'Fellowship match recommendations',
      'Regular opportunity updates'
    ],
    impact: 'Connecting youth to opportunities',
    duration: 'Ongoing',
    frequency: 'Daily updates',
    locations: 'Pan-African & Global',
    image: '/images/backgrounds/club-team.jpeg'
  }
]

export function Programs() {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null)
  const [filter, setFilter] = useState<string>('all')
  const [dbPrograms, setDbPrograms] = useState<Program[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch programs from the database
    fetch('/api/programs')
      .then((res) => res.json())
      .then((data) => {
        setDbPrograms(data)
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [])

  // Merge static programs with database programs (filter out duplicates by title)
  const staticProgramTitles = programs.map(p => p.title.toLowerCase())
  const allPrograms = [
    ...programs, 
    ...dbPrograms
      .filter(dbProg => !staticProgramTitles.includes(dbProg.title.toLowerCase()))
      .map(dbProg => ({
        ...dbProg,
        icon: Users, // Default icon
        color: 'from-emerald-500 to-emerald-600',
        glowColor: 'emerald-500',
        description: dbProg.description || dbProg.shortDesc || '',
        longDescription: dbProg.longDesc || dbProg.description || '',
        features: [],
        impact: dbProg.applicationsOpen ? 'Applications Open!' : (dbProg.status || 'Active'),
        duration: dbProg.duration || '',
        frequency: '',
        locations: dbProg.location || '',
        id: `db-${dbProg.id}`,
      }))
  ]

  const categories = ['all', 'Leadership', 'Community', 'Climate', 'Education']

  return (
    <section id="programs" className="py-12 md:py-16 relative overflow-hidden">
      {/* Parallax Background */}
      <SectionParallax image="/images/backgrounds/ClubMeeting2.jpeg" intensity={0.3} />
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/50 via-dark-800/40 to-dark-900/50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(34,197,94,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(59,130,246,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="container-premium relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20"
          >
            <Sprout className="w-4 h-4 text-primary-400" />
            <span className="text-sm font-medium text-primary-400">Our Programs</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-display font-bold">
            <span className="text-gradient">Empowering Through Action</span>
          </h2>

          <p className="text-xl text-dark-300 max-w-3xl mx-auto leading-relaxed">
            Our comprehensive programs are designed to develop leadership skills, 
            drive sustainable impact, and create lasting change across Africa.
          </p>
        </AnimatedSection>

        {/* Filter Tabs */}
        <AnimatedSection className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  filter === category
                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg'
                    : 'glass-card text-dark-300 hover:text-white'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </AnimatedSection>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {isLoading ? (
            <div className="col-span-full text-center py-12">
              <div className="text-primary-400 text-lg">Loading programs...</div>
            </div>
          ) : (
            allPrograms.map((program, index) => {
              const Icon = program.icon || Users
              const isDbProgram = typeof program.id === 'string' && program.id.startsWith('db-')
              const dbProgramData = isDbProgram ? dbPrograms.find(p => `db-${p.id}` === program.id) : null
              
              return (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="group h-full hover:scale-[1.02] transition-all duration-500">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden rounded-t-3xl">
                      <img 
                        src={program.image || '/images/backgrounds/ClubMeeting.jpeg'}
                        alt={program.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent`} />
                      
                      {/* Icon */}
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`absolute top-4 left-4 w-14 h-14 rounded-2xl bg-gradient-to-br ${program.color} flex items-center justify-center shadow-glow`}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </motion.div>

                      {/* Application Status Badge */}
                      {dbProgramData?.applicationsOpen && (
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-green-500 text-white animate-pulse shadow-lg">
                            🎯 Applications Open!
                          </Badge>
                        </div>
                      )}
                      {!dbProgramData?.applicationsOpen && dbProgramData && (
                        <div className="absolute top-4 right-4">
                          <Badge variant="gradient" size="sm">
                            {program.impact}
                          </Badge>
                        </div>
                      )}
                      {!dbProgramData && (
                        <div className="absolute top-4 right-4">
                          <Badge variant="gradient" size="sm">
                            {program.impact}
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-display font-bold text-white">
                    {program.title}
                  </h3>
                  
                  <p className="text-dark-300 leading-relaxed">
                    {program.description}
                  </p>

                  {/* Additional Info for DB Programs */}
                  {dbProgramData && (
                    <div className="space-y-2 text-sm">
                      {dbProgramData.location && (
                        <div className="flex items-center gap-2 text-dark-400">
                          <MapPin className="w-4 h-4 text-primary-400" />
                          <span>{dbProgramData.location}</span>
                        </div>
                      )}
                      {dbProgramData.participants && dbProgramData.participants > 0 && (
                        <div className="flex items-center gap-2 text-dark-400">
                          <Users className="w-4 h-4 text-primary-400" />
                          <span>{dbProgramData.participants} participants</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Features */}
                  {program.features && program.features.length > 0 && (
                    <ul className="space-y-2">
                      {program.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-dark-400">
                          <CheckCircle2 className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* CTA */}
                  {dbProgramData?.applicationsOpen && dbProgramData?.applicationUrl ? (
                    <a
                      href={dbProgramData.applicationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button 
                        variant="gradient"
                        size="sm" 
                        rightIcon={<ArrowRight />}
                        className="w-full mt-4 animate-pulse"
                      >
                        Apply Now
                      </Button>
                    </a>
                  ) : (
                    <Link href={`/programs/${program.id}`}>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        rightIcon={<ArrowRight />}
                        className="w-full mt-4 group-hover:bg-white/5"
                      >
                        Learn More
                      </Button>
                    </Link>
                  )}
                </div>

                {/* Decorative Glow */}
                <div className={`absolute -bottom-16 -right-16 w-48 h-48 bg-gradient-to-br ${program.color} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700`} />
              </Card>
            </motion.div>
          )
        })
        )}
      </div>

      {/* Program Detail Modal */}
      <AnimatePresence>
        {selectedProgram && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/90 backdrop-blur-xl"
            onClick={() => setSelectedProgram(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-4xl w-full max-h-[90vh] overflow-y-auto glass-card rounded-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Image */}
              <div className="relative h-64 overflow-hidden rounded-t-3xl">
                <img 
                  src={selectedProgram.image}
                  alt={selectedProgram.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent" />
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProgram(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-dark-900/80 backdrop-blur-sm flex items-center justify-center hover:bg-dark-900 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                {/* Icon */}
                <div className={`absolute bottom-6 left-6 w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedProgram.color} flex items-center justify-center shadow-glow`}>
                  <selectedProgram.icon className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-8">
                {/* Title & Stats */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant="gradient" size="lg">
                      {selectedProgram.impact}
                    </Badge>
                  </div>
                  <h3 className="text-4xl font-display font-bold text-white mb-4">
                    {selectedProgram.title}
                  </h3>
                  <p className="text-xl text-dark-300 leading-relaxed">
                    {selectedProgram.longDescription || selectedProgram.description}
                  </p>
                </div>

                {/* Program Details */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="glass-card p-4 rounded-2xl">
                    <Calendar className="w-6 h-6 text-primary-400 mb-2" />
                    <div className="text-sm text-dark-500 mb-1">Duration</div>
                    <div className="text-white font-semibold">{selectedProgram.duration || '6 months'}</div>
                  </div>
                  <div className="glass-card p-4 rounded-2xl">
                    <Target className="w-6 h-6 text-accent-400 mb-2" />
                    <div className="text-sm text-dark-500 mb-1">Frequency</div>
                    <div className="text-white font-semibold">{selectedProgram.frequency || 'Weekly'}</div>
                  </div>
                  <div className="glass-card p-4 rounded-2xl">
                    <MapPin className="w-6 h-6 text-blue-400 mb-2" />
                    <div className="text-sm text-dark-500 mb-1">Locations</div>
                    <div className="text-white font-semibold">{selectedProgram.locations || 'Multiple'}</div>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="text-xl font-display font-bold text-white mb-4">Program Features</h4>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {selectedProgram.features?.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-dark-300">
                        <CheckCircle2 className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4 pt-6 border-t border-dark-700">
                  <Button variant="primary" size="lg" rightIcon={<ArrowRight />} fullWidth>
                    Apply to This Program
                  </Button>
                  <Button variant="outline" size="lg" fullWidth>
                    Download Program Guide
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom CTA */}
        <AnimatedSection className="text-center">
          <div className="glass-card p-8 md:p-12 rounded-3xl max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Ready to Make an Impact?
            </h3>
            <p className="text-dark-300 text-lg mb-8 max-w-2xl mx-auto">
              Join one of our programs and become part of a movement driving positive change across Africa.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/#programs">
                <Button variant="primary" size="lg" rightIcon={<ArrowRight />}>
                  Apply to a Program
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg"
                onClick={async () => {
                  try {
                    const response = await fetch('/api/download-all-programs')
                    const data = await response.json()
                    
                    if (data.success && data.programs) {
                      // Generate comprehensive PDF with all programs
                      const { jsPDF } = await import('jspdf')
                      const pdf = new jsPDF()
                      const margin = 20
                      const pageWidth = pdf.internal.pageSize.getWidth()
                      const pageHeight = pdf.internal.pageSize.getHeight()
                      let yPos = margin

                      // Load and add logo
                      const logoImg = new Image()
                      logoImg.src = '/images/logo.jpeg'
                      await new Promise((resolve, reject) => {
                        logoImg.onload = resolve
                        logoImg.onerror = reject
                      })

                      // Header
                      pdf.setFillColor(34, 197, 94)
                      pdf.rect(0, 0, pageWidth, 50, 'F')
                      
                      // Add logo image
                      pdf.addImage(logoImg, 'JPEG', margin, 10, 30, 30)
                      
                      pdf.setTextColor(255, 255, 255)
                      pdf.setFontSize(24)
                      pdf.setFont('helvetica', 'bold')
                      pdf.text('RISE FOR IMPACT', margin + 35, 28)
                      pdf.setFontSize(12)
                      pdf.text('Complete Program Guide', margin + 35, 38)
                      
                      yPos = 65

                      // Add each program
                      data.programs.forEach((program: any, index: number) => {
                        if (index > 0) {
                          pdf.addPage()
                          yPos = margin
                        }

                        // Program title
                        pdf.setTextColor(0, 0, 0)
                        pdf.setFontSize(18)
                        pdf.setFont('helvetica', 'bold')
                        pdf.text(program.title, margin, yPos)
                        yPos += 10

                        // Description
                        pdf.setFontSize(10)
                        pdf.setFont('helvetica', 'normal')
                        const descLines = pdf.splitTextToSize(program.description, pageWidth - 2 * margin)
                        pdf.text(descLines, margin, yPos)
                        yPos += descLines.length * 6 + 10

                        // Details
                        pdf.setFontSize(12)
                        pdf.setFont('helvetica', 'bold')
                        pdf.text('Program Details', margin, yPos)
                        yPos += 8

                        pdf.setFontSize(10)
                        pdf.setFont('helvetica', 'normal')
                        const details = [
                          `Duration: ${program.duration}`,
                          `Frequency: ${program.frequency}`,
                          `Location: ${program.locations}`
                        ]
                        details.forEach(detail => {
                          pdf.text(detail, margin, yPos)
                          yPos += 6
                        })
                        yPos += 8

                        // Features
                        if (program.features && program.features.length > 0) {
                          pdf.setFontSize(12)
                          pdf.setFont('helvetica', 'bold')
                          pdf.text('Key Features', margin, yPos)
                          yPos += 8

                          pdf.setFontSize(10)
                          pdf.setFont('helvetica', 'normal')
                          program.features.forEach((feature: string) => {
                            if (yPos > pageHeight - 40) {
                              pdf.addPage()
                              yPos = margin
                            }
                            pdf.text('•', margin, yPos)
                            const featureLines = pdf.splitTextToSize(feature, pageWidth - 2 * margin - 10)
                            pdf.text(featureLines, margin + 5, yPos)
                            yPos += featureLines.length * 6 + 2
                          })
                        }
                      })

                      // Footer on last page
                      pdf.setFillColor(34, 197, 94)
                      pdf.rect(0, pageHeight - 30, pageWidth, 30, 'F')
                      pdf.setTextColor(255, 255, 255)
                      pdf.setFontSize(9)
                      pdf.text('Visit: www.riseforimpact.org | Email: info@riseforimpact.org', margin, pageHeight - 17)
                      pdf.setFontSize(7)
                      pdf.text(`© ${new Date().getFullYear()} Rise for Impact. All rights reserved.`, margin, pageHeight - 10)

                      pdf.save('rise-for-impact-programs.pdf')
                    }
                  } catch (error) {
                    console.error('Error generating PDF:', error)
                    alert('Failed to generate PDF. Please try again.')
                  }
                }}
              >
                Download Program Guide
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Program Detail Modal */}
      <AnimatePresence>
        {selectedProgram && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/90 backdrop-blur-xl"
            onClick={() => setSelectedProgram(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-4xl w-full max-h-[90vh] overflow-y-auto glass-card rounded-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Image */}
              <div className="relative h-64 overflow-hidden rounded-t-3xl">
                <img 
                  src={selectedProgram.image}
                  alt={selectedProgram.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent" />
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProgram(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-dark-900/80 backdrop-blur-sm flex items-center justify-center hover:bg-dark-900 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                {/* Icon */}
                <div className={`absolute bottom-6 left-6 w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedProgram.color} flex items-center justify-center shadow-glow`}>
                  <selectedProgram.icon className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-8">
                {/* Title & Stats */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant="gradient" size="lg">
                      {selectedProgram.impact}
                    </Badge>
                  </div>
                  <h3 className="text-4xl font-display font-bold text-white mb-4">
                    {selectedProgram.title}
                  </h3>
                  <p className="text-xl text-dark-300 leading-relaxed">
                    {selectedProgram.longDescription || selectedProgram.description}
                  </p>
                </div>

                {/* Program Details */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="glass-card p-4 rounded-2xl">
                    <Calendar className="w-6 h-6 text-primary-400 mb-2" />
                    <div className="text-sm text-dark-500 mb-1">Duration</div>
                    <div className="text-white font-semibold">{selectedProgram.duration || '6 months'}</div>
                  </div>
                  <div className="glass-card p-4 rounded-2xl">
                    <Target className="w-6 h-6 text-accent-400 mb-2" />
                    <div className="text-sm text-dark-500 mb-1">Frequency</div>
                    <div className="text-white font-semibold">{selectedProgram.frequency || 'Weekly'}</div>
                  </div>
                  <div className="glass-card p-4 rounded-2xl">
                    <MapPin className="w-6 h-6 text-blue-400 mb-2" />
                    <div className="text-sm text-dark-500 mb-1">Locations</div>
                    <div className="text-white font-semibold">{selectedProgram.locations || 'Multiple'}</div>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="text-xl font-display font-bold text-white mb-4">Program Features</h4>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {selectedProgram.features?.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-dark-300">
                        <CheckCircle2 className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4 pt-6 border-t border-dark-700">
                  {selectedProgram.id === 'opportunity-plug' ? (
                    <a href="/opportunities" className="flex-1">
                      <Button variant="primary" size="lg" rightIcon={<ArrowRight />} fullWidth>
                        Browse Opportunities
                      </Button>
                    </a>
                  ) : (
                    <Button variant="primary" size="lg" rightIcon={<ArrowRight />} fullWidth>
                      Apply to This Program
                    </Button>
                  )}
                  <Button variant="outline" size="lg" fullWidth>
                    Download Program Guide
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
