import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create default admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  await prisma.admin.upsert({
    where: { email: 'admin@riseforimpact.org' },
    update: {},
    create: {
      email: 'admin@riseforimpact.org',
      password: hashedPassword,
      name: 'Admin User',
      role: 'admin',
    },
  })

  console.log('✅ Admin user created')

  // Clear existing data
  await prisma.program.deleteMany()
  await prisma.teamMember.deleteMany()
  await prisma.blogPost.deleteMany()
  
  console.log('🗑️  Cleared existing data')

  // Seed Programs
  const programs = [
    {
      title: 'Rise Circles',
      shortDesc: 'Leadership development through peer learning circles',
      description: 'Leadership development through peer learning circles where young leaders collaborate, share experiences, and develop essential skills.',
      longDesc: 'Rise Circles bring together young leaders in structured peer learning environments where they develop critical leadership competencies, share experiences, and collaborate on solving community challenges. Through monthly workshops and mentorship, participants build networks that last beyond the program.',
      focus: 'Leadership',
      duration: '6 months',
      image: '/images/backgrounds/ClubMeeting.jpeg',
      status: 'active',
    },
    {
      title: 'Impact Clinics',
      shortDesc: 'Community-driven initiatives addressing local challenges',
      description: 'Community-driven initiatives addressing local challenges through sustainable, youth-led solutions.',
      longDesc: 'Impact Clinics provide a structured approach to community development, where youth identify local challenges, design innovative solutions, and implement sustainable projects with measurable impact.',
      focus: 'Community Development',
      duration: '3-12 months',
      image: '/images/backgrounds/impact1.jpeg',
      status: 'active',
    },
    {
      title: 'Rise for Climate',
      shortDesc: 'Climate action and environmental stewardship programs',
      description: 'Climate action and environmental stewardship programs empowering youth to address climate challenges.',
      longDesc: 'Our climate program mobilizes young people to take concrete action against climate change through tree planting, environmental education, sustainable practices, and advocacy for policy change.',
      focus: 'Climate Action',
      duration: 'Ongoing',
      image: '/images/backgrounds/Togetherness.jpg',
      status: 'active',
    },
    {
      title: 'Rise for Impact Fellowship',
      shortDesc: 'Annual intensive program for young leaders',
      description: 'Annual intensive program equipping young leaders with essential skills in leadership, grant writing, storytelling, and public speaking.',
      longDesc: 'The Rise for Impact Fellowship is a transformative year-round program bringing together exceptional young leaders from across Africa. Fellows receive comprehensive training in leadership development, storytelling, grant writing, public speaking, and relationship building.',
      focus: 'Leadership & Skills Development',
      duration: '1 year',
      image: '/images/backgrounds/fellowship.jpeg',
      status: 'active',
    },
    {
      title: 'Campus Ambassadors Program',
      shortDesc: 'Empowering student leaders on university campuses',
      description: 'Empowering student leaders to establish and run Rise for Impact clubs on their university campuses.',
      longDesc: 'The Campus Ambassadors Program identifies and supports passionate student leaders to establish Rise for Impact chapters at their universities. Ambassadors receive training, resources, and ongoing support to build vibrant campus communities driving social impact.',
      focus: 'Campus Leadership',
      duration: 'Academic year',
      image: '/images/backgrounds/ClubMeeting2.jpeg',
      status: 'active',
    },
    {
      title: 'Opportunity Plug',
      shortDesc: 'Gateway to fellowships and scholarships',
      description: 'Your gateway to fellowships, scholarships, and opportunities across Africa with application guidance.',
      longDesc: 'Opportunity Plug is our dedicated platform for bringing the best fellowships, scholarships, grants, and leadership programs directly to young African changemakers. We provide guidance on crafting winning applications and maximizing success.',
      focus: 'Opportunities & Resources',
      duration: 'Ongoing',
      image: '/images/backgrounds/opportunity.jpeg',
      status: 'active',
    },
  ]

  for (const program of programs) {
    await prisma.program.create({ data: program })
  }

  console.log('✅ Programs seeded')

  // Seed Team Members
  const teamMembers = [
    {
      name: 'Claude Tomoh',
      role: 'Founder & Executive Director',
      category: 'executive',
      country: 'Cameroon',
      focus: 'Leadership & Strategy',
      image: '/images/team/Claude_Tomoh.png',
      linkedin: '#',
      bio: 'Guides strategy, operations, and vision for Rise for Impact across all countries.'
    },
    {
      name: 'Emmanuel Elikem Kpeli',
      role: 'Content Lead',
      category: 'executive',
      country: 'Ghana',
      focus: 'Content & Storytelling',
      image: '/images/team/Emmanuel.jpg',
      linkedin: '#',
      bio: 'Develops Rise for Impact narratives, editorial strategy, and storytelling standards.'
    },
    {
      name: 'Esther Owusu Boahemaa',
      role: 'Programs Lead',
      category: 'executive',
      country: 'Ghana',
      focus: 'Program Coordination',
      image: '/images/team/Esther.jpg',
      linkedin: '#',
      bio: 'Coordinates flagship programs and ensures quality learning across all country teams.'
    },
    {
      name: 'Uche-Ukah Chimzyterem',
      role: 'Communications Lead',
      category: 'executive',
      country: 'Nigeria',
      focus: 'Communications & PR',
      image: '/images/team/Uche.jpg',
      linkedin: '#',
      bio: 'Directs all internal and external communications, advocacy, and press relations.'
    },
    {
      name: 'Nawal Chefton',
      role: 'Country Coordinator',
      category: 'coordinators',
      country: 'Cameroon',
      focus: 'Public Speaking & Leadership',
      image: '/images/team/Nawal.JPG',
      linkedin: '#'
    },
    {
      name: 'Jessica A. Morris',
      role: 'Country Coordinator',
      category: 'coordinators',
      country: 'Liberia',
      focus: 'Community Building',
      image: '/images/team/Jessica.jpg',
      linkedin: '#'
    },
    {
      name: 'Kareen Ajatitton',
      role: 'Country Coordinator',
      category: 'coordinators',
      country: 'Nigeria',
      focus: 'Tech & Innovation',
      image: '/images/team/Kareen.jpg',
      linkedin: '#'
    },
    {
      name: 'Tito Moses',
      role: 'Country Coordinator',
      category: 'coordinators',
      country: 'Uganda',
      focus: 'Peace & Civic Mobilization',
      image: '/images/team/Moses.jpg',
      linkedin: '#'
    },
    {
      name: 'Jacques Balolage',
      role: 'Country Coordinator',
      category: 'coordinators',
      country: 'DRC',
      focus: 'Disability Inclusion',
      image: '/images/team/Jacques.webp',
      linkedin: '#'
    },
    {
      name: 'Regine Niyorukundo',
      role: 'Country Coordinator',
      category: 'coordinators',
      country: 'Rwanda',
      focus: 'Education & Civic Labs',
      image: "/images/team/Regine's pic.jpg",
      linkedin: '#'
    },
    {
      name: 'Akurugu Princess',
      role: 'Country Coordinator',
      category: 'coordinators',
      country: 'Ghana',
      focus: 'Youth Engagement',
      image: '/images/team/Princess.jpg',
      linkedin: '#'
    },
    {
      name: 'Johnson Pendaeli',
      role: 'Country Coordinator',
      category: 'coordinators',
      country: 'Tanzania',
      focus: 'Mental Health & Well-being',
      image: '/images/team/Johnson.Maturo_headshot.jpg',
      linkedin: '#'
    },
    {
      name: 'Chafor Ramson Njoyue',
      role: 'NorthWest Regional Coordinator',
      category: 'regional',
      country: 'Cameroon',
      focus: 'Community Building, Leadership Development',
      image: '/images/team/Ramson.jpeg',
      linkedin: '#'
    },
    {
      name: 'Neh Valerie',
      role: 'SouthWest Regional Coordinator',
      category: 'regional',
      country: 'Cameroon',
      focus: 'Software Engineer, Community Leader',
      image: '/images/team/Neh-Valerie.jpeg',
      linkedin: '#'
    }
  ]

  for (const member of teamMembers) {
    await prisma.teamMember.create({ data: member })
  }

  console.log('✅ Team members seeded')

  // Seed Blog Posts
  const blogs = [
    {
      title: 'Launching Rise for Impact Fellowship 2025',
      excerpt: 'We are excited to announce the launch of our flagship fellowship program for emerging African leaders.',
      content: 'Full blog content here...',
      category: 'Announcements',
      author: 'Claude Tomoh',
      url: '/#blog',
      published: true,
    },
    {
      title: 'Climate Action: Our Tree Planting Initiative',
      excerpt: 'Join us in our mission to plant 10,000 trees across Africa as part of Rise for Climate.',
      content: 'Full blog content here...',
      category: 'Climate',
      author: 'Emmanuel Elikem Kpeli',
      url: '/#blog',
      published: true,
    },
    {
      title: 'Impact Clinics: Stories from the Field',
      excerpt: 'Hear from youth leaders who are transforming their communities through our Impact Clinics program.',
      content: 'Full blog content here...',
      category: 'Impact Stories',
      author: 'Esther Owusu Boahemaa',
      url: '/#blog',
      published: true,
    }
  ]

  for (const blog of blogs) {
    await prisma.blogPost.create({ data: blog })
  }

  console.log('✅ Blog posts seeded')
  console.log('🎉 Database seeding complete!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
