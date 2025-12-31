'use client'

import { useState, useEffect, use } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Download, 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Users, 
  Target, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  AlertCircle,
  Sparkles
} from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/sections/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import jsPDF from 'jspdf'

interface ProgramData {
  id: string
  title: string
  description: string
  longDescription: string
  features: string[]
  impact: string
  duration: string
  frequency: string
  locations: string
  image: string
  color: string
  applicationsOpen?: boolean
  status?: string
}

const programsData: Record<string, ProgramData> = {
  'rise-circles': {
    id: 'rise-circles',
    title: 'Rise Circles',
    description: 'Leadership development through peer learning circles where young leaders collaborate, share experiences, and develop essential skills.',
    longDescription: `Rise Circles bring together young leaders in structured peer learning environments where they develop critical leadership competencies, share experiences, and collaborate on solving community challenges. Through monthly workshops and mentorship, participants build networks that last beyond the program.

Our approach combines experiential learning with peer-to-peer knowledge sharing, creating a supportive environment where emerging leaders can explore challenges, test ideas, and develop solutions together. Each circle consists of 8-12 carefully selected participants who meet regularly over a 6-month period.`,
    features: [
      'Monthly leadership workshops led by experienced facilitators',
      'Peer mentorship programs with personalized guidance',
      'Collaborative community impact projects',
      'Skill-building sessions in communication, project management, and teamwork',
      'Access to a network of 500+ alumni leaders across Africa',
      'Certificate of completion and leadership portfolio development'
    ],
    impact: 'Growing community',
    duration: '2-3 months',
    frequency: 'Weekly meetings (2 hours each)',
    locations: '8+ countries across Africa',
    image: '/images/backgrounds/ClubMeeting.jpeg',
    color: 'from-primary-500 to-primary-600',
    applicationsOpen: false,
    status: 'Applications open Q2 2026'
  },
  'impact-clinics': {
    id: 'impact-clinics',
    title: 'Impact Clinics',
    description: 'Community-driven initiatives addressing local challenges through sustainable, youth-led solutions.',
    longDescription: `Impact Clinics provide a structured approach to community development, where youth identify local challenges, design innovative solutions, and implement sustainable projects with measurable impact.

We guide young changemakers through the entire project lifecycle - from identifying community needs and designing evidence-based interventions, to implementing projects and measuring their impact. Each clinic receives technical support, mentorship from experienced development practitioners, and connections to potential funders and partners.`,
    features: [
      'Comprehensive community needs assessment training',
      'Project design & planning workshops with expert facilitators',
      'Connections to funding opportunities and grant resources',
      'Implementation support and technical assistance',
      'Impact measurement tools and frameworks',
      'Documentation and storytelling support for showcasing results',
      'Networking with other clinic leaders and potential funders'
    ],
    impact: 'Active programs',
    duration: '3-12 months (flexible based on project scope)',
    frequency: 'Project-based with monthly check-ins',
    locations: 'Multiple communities across Africa',
    image: '/images/backgrounds/impact1.jpeg',
    color: 'from-accent-500 to-accent-600',
    applicationsOpen: false,
    status: 'Applications opening soon'
  },
  'rise-for-climate': {
    id: 'rise-for-climate',
    title: 'Rise for Climate',
    description: 'Climate action and environmental stewardship programs empowering youth to address climate challenges.',
    longDescription: `Our climate program mobilizes young people to take concrete action against climate change through tree planting, environmental education, sustainable practices, and advocacy for policy change.

Rise for Climate combines grassroots environmental action with leadership development, empowering youth to become climate champions in their communities. Through hands-on projects, advocacy training, and partnerships with environmental organizations, participants develop the knowledge and skills to drive meaningful climate action.`,
    features: [
      'Climate education workshops covering science, policy, and solutions',
      'Tree planting campaigns with local community engagement',
      'Sustainable practices training (waste management, energy efficiency, etc.)',
      'Climate advocacy initiatives and policy engagement opportunities',
      'Access to climate funding and grants for local projects',
      'Regional and continental networking events',
      'Media training for effective climate communication'
    ],
    impact: 'Growing environmental impact',
    duration: 'Ongoing program with various campaigns',
    frequency: 'Monthly campaigns and quarterly convenings',
    locations: '8+ countries',
    image: '/images/backgrounds/Togetherness.jpg',
    color: 'from-blue-500 to-blue-600',
    applicationsOpen: false,
    status: 'Applications opening soon'
  },
  'fellowship': {
    id: 'fellowship',
    title: 'Rise for Impact Fellowship',
    description: 'Annual intensive program equipping young leaders with essential skills in leadership, grant writing, storytelling, and public speaking.',
    longDescription: `The Rise for Impact Fellowship is a transformative year-round program bringing together exceptional young leaders from across Africa. Fellows receive comprehensive training in leadership development, storytelling, grant writing, public speaking, and relationship building to make them more competitive and effective changemakers.

This flagship program is designed for emerging leaders who have demonstrated commitment to social impact and want to accelerate their leadership journey. Through a combination of virtual workshops, regional convenings, one-on-one coaching, and practical projects, fellows develop the skills and networks to amplify their impact.`,
    features: [
      'Comprehensive leadership development curriculum (20+ hours)',
      'Grant writing workshops with successful proposals as case studies',
      'Storytelling & communication skills masterclasses',
      'Public speaking training with performance coaching',
      'Networking opportunities with leaders, funders, and organizations',
      'One-on-one mentorship from experts in various fields',
      'Access to funding opportunities and partnership networks',
      'Quarterly regional convenings for in-person connection',
      'Fellowship certificate and alumni network membership'
    ],
    impact: 'Applications opening soon',
    duration: '3-6 months',
    frequency: 'Quarterly convenings + monthly virtual sessions',
    locations: 'Regional cohorts (East, West, Central, Southern Africa)',
    image: '/images/backgrounds/fellowship.jpeg',
    color: 'from-yellow-500 to-yellow-600',
    applicationsOpen: false,
    status: 'Applications open February 2026'
  },
  'campus-ambassadors': {
    id: 'campus-ambassadors',
    title: 'Campus Ambassadors Program',
    description: 'Empowering student leaders to establish and run Rise for Impact clubs on their university campuses.',
    longDescription: `The Campus Ambassadors Program identifies and supports passionate student leaders to establish Rise for Impact chapters at their universities. Ambassadors receive training, resources, and ongoing support to build vibrant campus communities driving social impact.

As a Campus Ambassador, you become the face of Rise for Impact on your campus, mobilizing fellow students around leadership development, community service, and social innovation. You'll receive comprehensive training, access to resources, and support from our team and a network of ambassadors across Africa.`,
    features: [
      'Ambassador training & certification program',
      'Club establishment toolkit with templates and guides',
      'Monthly resources package (activity ideas, event plans, etc.)',
      'Inter-campus networking opportunities',
      'Leadership development through program management',
      'Event planning support and funding access',
      'Recognition and recommendation letters for ambassadors',
      'Access to Rise for Impact programs and opportunities'
    ],
    impact: 'Applications opening soon',
    duration: 'Academic year (9-12 months)',
    frequency: 'Ongoing support with monthly ambassador calls',
    locations: 'Universities across Africa',
    image: '/images/backgrounds/ClubMeeting2.jpeg',
    color: 'from-indigo-500 to-indigo-600',
    applicationsOpen: false,
    status: 'Multiple cohorts: January, June, August & December 2026'
  },
  'opportunity-plug': {
    id: 'opportunity-plug',
    title: 'Opportunity Plug',
    description: 'Your gateway to fellowships, scholarships, and opportunities across Africa. We curate and share the latest opportunities with application guidance.',
    longDescription: `Opportunity Plug is our dedicated platform for bringing the best fellowships, scholarships, grants, and leadership programs directly to young African changemakers. We not only share opportunities but provide guidance on crafting winning applications, meeting deadlines, and maximizing your chances of success.

Every day, we scan hundreds of sources to curate the most relevant opportunities for African youth. Our team verifies each opportunity, provides application tips, and shares success stories to inspire and guide you. Whether you're looking for funding for your education, a fellowship to develop your skills, or a grant for your project, Opportunity Plug has you covered.`,
    features: [
      'Curated opportunities database updated daily',
      'Application deadline tracking and reminders',
      'Step-by-step application guidance and tips',
      'Success stories and resources from past recipients',
      'Fellowship match recommendations based on your profile',
      'Regular opportunity updates via email and social media',
      'Application review workshops and webinars',
      'Direct support from our opportunities team'
    ],
    impact: 'Connecting youth to opportunities',
    duration: 'Ongoing service',
    frequency: 'Daily opportunity updates',
    locations: 'Pan-African & Global opportunities',
    image: '/images/backgrounds/club-team.jpeg',
    color: 'from-orange-500 to-orange-600',
    applicationsOpen: true,
    status: 'Browse opportunities now!'
  }
}

export default function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const slug = resolvedParams.slug
  const router = useRouter()
  const program = programsData[slug]

  const [isDownloading, setIsDownloading] = useState(false)

  // Redirect Opportunity Plug to opportunities page
  useEffect(() => {
    if (slug === 'opportunity-plug') {
      router.push('/opportunities')
    }
  }, [slug, router])

  if (!program) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Program Not Found</h1>
            <p className="text-gray-600 mb-8">
              The program you're looking for doesn't exist or may have been moved.
            </p>
            <Link href="/#programs">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Programs
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // Show loading state while redirecting
  if (slug === 'opportunity-plug') {
    return null
  }

  const downloadProgramGuide = async () => {
    setIsDownloading(true)
    
    try {
      const pdf = new jsPDF()
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const margin = 20
      let yPos = margin

      // Load and add logo
      const logoImg = new Image()
      logoImg.src = '/images/logo.jpeg'
      await new Promise((resolve, reject) => {
        logoImg.onload = resolve
        logoImg.onerror = reject
      })

      // Add Rise for Impact logo/header
      pdf.setFillColor(34, 197, 94) // Green color
      pdf.rect(0, 0, pageWidth, 50, 'F')
      
      // Add logo image
      pdf.addImage(logoImg, 'JPEG', margin, 10, 30, 30)
      
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(24)
      pdf.setFont('helvetica', 'bold')
      pdf.text('RISE FOR IMPACT', margin + 35, 30)
      
      yPos = 65

      // Program Title
      pdf.setTextColor(0, 0, 0)
      pdf.setFontSize(20)
      pdf.setFont('helvetica', 'bold')
      const titleLines = pdf.splitTextToSize(program.title, pageWidth - 2 * margin)
      pdf.text(titleLines, margin, yPos)
      yPos += titleLines.length * 10 + 10

      // Description
      pdf.setFontSize(11)
      pdf.setFont('helvetica', 'normal')
      const descLines = pdf.splitTextToSize(program.description, pageWidth - 2 * margin)
      pdf.text(descLines, margin, yPos)
      yPos += descLines.length * 6 + 15

      // Program Details
      pdf.setFontSize(14)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Program Overview', margin, yPos)
      yPos += 10

      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      
      const details = [
        { label: 'Duration:', value: program.duration },
        { label: 'Frequency:', value: program.frequency },
        { label: 'Location:', value: program.locations },
        { label: 'Status:', value: program.status || 'Active' }
      ]

      details.forEach(detail => {
        pdf.setFont('helvetica', 'bold')
        pdf.text(detail.label, margin, yPos)
        pdf.setFont('helvetica', 'normal')
        pdf.text(detail.value, margin + 30, yPos)
        yPos += 7
      })

      yPos += 10

      // Long Description
      pdf.setFontSize(14)
      pdf.setFont('helvetica', 'bold')
      pdf.text('About This Program', margin, yPos)
      yPos += 10

      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      const longDescLines = pdf.splitTextToSize(program.longDescription, pageWidth - 2 * margin)
      longDescLines.forEach((line: string) => {
        if (yPos > pageHeight - 30) {
          pdf.addPage()
          yPos = margin
        }
        pdf.text(line, margin, yPos)
        yPos += 6
      })

      yPos += 10

      // Features
      if (program.features && program.features.length > 0) {
        if (yPos > pageHeight - 50) {
          pdf.addPage()
          yPos = margin
        }

        pdf.setFontSize(14)
        pdf.setFont('helvetica', 'bold')
        pdf.text('Key Features', margin, yPos)
        yPos += 10

        pdf.setFontSize(10)
        pdf.setFont('helvetica', 'normal')
        
        program.features.forEach((feature: string) => {
          if (yPos > pageHeight - 20) {
            pdf.addPage()
            yPos = margin
          }
          pdf.text('•', margin, yPos)
          const featureLines = pdf.splitTextToSize(feature, pageWidth - 2 * margin - 10)
          pdf.text(featureLines, margin + 5, yPos)
          yPos += featureLines.length * 6 + 3
        })
      }

      // Footer
      pdf.addPage()
      yPos = margin

      pdf.setFillColor(34, 197, 94)
      pdf.rect(0, pageHeight - 40, pageWidth, 40, 'F')
      
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      pdf.text('Rise for Impact - Empowering African Youth Leaders', margin, pageHeight - 25)
      pdf.text('Visit us: www.riseforimpact.org | Email: info@riseforimpact.org', margin, pageHeight - 17)
      
      pdf.setFontSize(8)
      pdf.text(`© ${new Date().getFullYear()} Rise for Impact. All rights reserved.`, margin, pageHeight - 10)

      // Save the PDF
      pdf.save(`${program.title.replace(/\s+/g, '-').toLowerCase()}-program-guide.pdf`)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Failed to generate PDF. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50">
      <Navbar />
      
      {/* Hero Section with Image */}
      <div className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-700 hover:scale-100"
          style={{ 
            backgroundImage: `url(${program.image})`,
            filter: 'brightness(0.5)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-primary-900/80" />
        
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-16">
          <Link href="/#programs">
            <Button variant="ghost" className="text-white hover:bg-white/20 backdrop-blur-sm border border-white/20 mb-6 w-fit transition-all hover:scale-105">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Programs
            </Button>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight">
              {program.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mb-8 leading-relaxed">
              {program.description}
            </p>
            
            <div className="flex flex-wrap gap-3">
              {program.applicationsOpen ? (
                <Badge className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 text-base shadow-lg shadow-green-500/50 animate-pulse">
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  {program.status}
                </Badge>
              ) : (
                <Badge className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 text-base shadow-lg shadow-amber-500/50">
                  <Clock className="w-5 h-5 mr-2" />
                  {program.status}
                </Badge>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Program Details Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="bg-primary-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                    <Calendar className="w-7 h-7 text-primary-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Duration</h3>
                  <p className="text-gray-600 text-base">{program.duration}</p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="bg-primary-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                    <Clock className="w-7 h-7 text-primary-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Frequency</h3>
                  <p className="text-gray-600 text-base">{program.frequency}</p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="bg-primary-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                    <MapPin className="w-7 h-7 text-primary-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Locations</h3>
                  <p className="text-gray-600 text-base">{program.locations}</p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="bg-primary-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                    <Target className="w-7 h-7 text-primary-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Impact</h3>
                  <p className="text-gray-600 text-base">{program.impact}</p>
                </motion.div>
              </div>

              {/* About Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-br from-white to-primary-50/30 rounded-2xl p-10 shadow-md border border-primary-100"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                  <div className="bg-primary-100 w-12 h-12 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-primary-600" />
                  </div>
                  About This Program
                </h2>
                <div className="prose prose-lg prose-gray max-w-none">
                  {program.longDescription.split('\n').map((paragraph, idx) => (
                    <p key={idx} className="text-gray-700 leading-relaxed mb-6 text-lg">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>

              {/* Key Features */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-2xl p-10 shadow-md border border-gray-100"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Key Features</h2>
                <div className="grid gap-5">
                  {program.features.map((feature, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + idx * 0.1 }}
                      className="flex items-start gap-4 p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 hover:shadow-md transition-all duration-300 hover:border-green-200"
                    >
                      <div className="bg-green-100 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      </div>
                      <p className="text-gray-700 text-base leading-relaxed">{feature}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Download Guide */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-primary-600 via-primary-500 to-emerald-500 rounded-2xl p-8 text-white shadow-2xl sticky top-4 border border-primary-400"
              >
                <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Program Guide</h3>
                <p className="text-primary-50 mb-6 text-base leading-relaxed">
                  Download the complete program guide with all details, requirements, and application information.
                </p>
                <Button
                  onClick={downloadProgramGuide}
                  disabled={isDownloading}
                  className="w-full bg-white text-primary-600 hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold py-6 text-base"
                >
                  <Download className="w-5 h-5 mr-2" />
                  {isDownloading ? 'Generating PDF...' : 'Download Program Guide'}
                </Button>
              </motion.div>

              {/* Application Status */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl p-8 shadow-md border border-gray-100"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">Application Status</h3>
                {program.applicationsOpen ? (
                  <div>
                    <div className="flex items-center gap-3 text-green-600 mb-6 bg-green-50 p-4 rounded-xl border border-green-100">
                      <div className="bg-green-100 w-10 h-10 rounded-lg flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <span className="font-bold text-base">{program.status}</span>
                    </div>
                    <Link href={`/apply?program=${program.id}`}>
                      <Button className="w-full py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all">
                        Apply Now
                        <ExternalLink className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-3 text-amber-600 mb-6 bg-amber-50 p-4 rounded-xl border border-amber-100">
                      <div className="bg-amber-100 w-10 h-10 rounded-lg flex items-center justify-center">
                        <AlertCircle className="w-6 h-6" />
                      </div>
                      <span className="font-bold text-base">{program.status}</span>
                    </div>
                    <p className="text-gray-600 text-base mb-6 leading-relaxed">
                      Applications for this program will open soon. Subscribe to our newsletter to get notified!
                    </p>
                    <Link href="/#newsletter">
                      <Button variant="outline" className="w-full py-6 text-base font-semibold border-2 hover:bg-primary-50 hover:border-primary-600 transition-all">
                        Get Notified
                      </Button>
                    </Link>
                  </div>
                )}
              </motion.div>

              {/* Contact */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-br from-gray-50 to-primary-50/30 rounded-2xl p-8 border border-gray-200 shadow-sm"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">Questions?</h3>
                <p className="text-gray-600 text-base mb-5 leading-relaxed">
                  Have questions about this program? We're here to help!
                </p>
                <a href="mailto:info@riseforimpact.org" className="text-primary-600 hover:text-primary-700 font-bold text-base inline-flex items-center gap-2 hover:gap-3 transition-all">
                  info@riseforimpact.org
                  <ExternalLink className="w-4 h-4" />
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
