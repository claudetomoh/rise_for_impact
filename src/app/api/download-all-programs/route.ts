import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Since jsPDF is a client-side library, we'll redirect to a client-side page that handles the PDF generation
    // Alternatively, we could use a server-side PDF library like pdfkit
    
    // For now, let's return the program data that the client can use to generate the PDF
    const programs = [
      {
        id: 'rise-circles',
        title: 'Rise Circles',
        description: 'Leadership development through peer learning circles where young leaders collaborate, share experiences, and develop essential skills.',
        duration: '1-day on-site kickoff + 2-3 months online mentorship',
        frequency: 'Monthly virtual workshops',
        locations: 'Cameroon, Ghana, Nigeria',
        features: [
          '1-day intensive on-site launch event with all participants',
          'Structured peer learning sessions with 8-12 participants',
          'Monthly virtual workshops on leadership, communication, and problem-solving',
          'Ongoing online mentorship from experienced leaders',
          'Networking opportunities with fellow emerging leaders across Africa',
          'Certificate of completion',
          'Lifelong access to Rise for Impact alumni network'
        ]
      },
      {
        id: 'impact-clinics',
        title: 'Impact Clinics',
        description: 'Intensive project incubation program providing hands-on support to turn social impact ideas into reality.',
        duration: '2-day on-site bootcamp + 3 months virtual incubation',
        frequency: 'Weekly virtual sessions',
        locations: 'Cameroon, Ghana, Nigeria',
        features: [
          '2-day intensive on-site bootcamp for project ideation and design thinking',
          'Weekly virtual project development and mentorship sessions',
          'One-on-one mentorship from industry experts and changemakers',
          'Access to design thinking and project management tools',
          'Pitch preparation and presentation skills training',
          'Connections to funding opportunities and potential partners',
          'Virtual demo day to showcase projects to investors and stakeholders'
        ]
      },
      {
        id: 'rise-for-climate',
        title: 'Rise for Climate',
        description: 'Empowering youth to drive climate action and environmental sustainability in their communities.',
        duration: '1-2 days on-site summit + 4 months online engagement',
        frequency: 'Bi-weekly virtual sessions',
        locations: 'Pan-African',
        features: [
          '1-2 day regional climate summit with hands-on activities (tree planting, waste management)',
          'Climate science and environmental sustainability training',
          'Community-based climate action project development and implementation',
          'Bi-weekly virtual mentorship from climate experts and environmental advocates',
          'Tools and resources for climate advocacy and awareness campaigns',
          'Regional climate action network connections across Africa',
          'Virtual participation in climate conferences and forums'
        ]
      },
      {
        id: 'fellowship',
        title: 'Rise Fellowship',
        description: 'Comprehensive leadership development program for exceptional young change-makers across Africa.',
        duration: '2-5 days on-site intensive + 3-6 months virtual mentorship',
        frequency: 'Immersive on-site experience then ongoing virtual engagement',
        locations: 'Pan-African (rotating host cities)',
        features: [
          '2-5 day intensive on-site fellowship conference with all cohort members',
          'Full scholarship covering program costs (accommodation, meals, materials)',
          'Intensive leadership, grant writing, storytelling, and public speaking training',
          '3-6 months of personalized virtual mentorship from African and global leaders',
          'Real-world project implementation experience with funding opportunities',
          'International exposure and networking with changemakers across Africa',
          'Career development, placement support, and professional connections',
          'Lifelong membership in exclusive Rise Fellows community and alumni network'
        ]
      },
      {
        id: 'campus-ambassadors',
        title: 'Campus Ambassadors Program',
        description: 'Empowering student leaders to establish and run Rise for Impact clubs on their university campuses.',
        duration: '1 academic year',
        frequency: 'Monthly check-ins',
        locations: 'Universities across Africa',
        features: [
          'Ambassador training & certification program',
          'Club establishment toolkit with templates and guides',
          'Monthly stipend for club activities',
          'Access to Rise for Impact programs and resources',
          'National ambassadors network and peer learning',
          'Leadership development workshops and training',
          'Recognition and certificates for outstanding performance'
        ]
      },
      {
        id: 'opportunity-plug',
        title: 'Opportunity Plug',
        description: 'Curated platform connecting young Africans to opportunities, scholarships, and programs.',
        duration: 'Ongoing',
        frequency: 'Weekly updates',
        locations: 'Pan-African',
        features: [
          'Weekly curated opportunities newsletter',
          'Scholarships, fellowships, and grants database',
          'Job and internship opportunities',
          'Conferences, competitions, and events calendar',
          'Application tips and deadline reminders',
          'Success stories and testimonials',
          'Community forum for opportunity sharing'
        ]
      }
    ]

    // Return JSON data - the client will handle PDF generation
    return NextResponse.json({ 
      success: true,
      programs,
      message: 'Program data ready for PDF generation'
    })
  } catch (error) {
    console.error('Error in download-all-programs:', error)
    return NextResponse.json(
      { error: 'Failed to prepare program data' },
      { status: 500 }
    )
  }
}
