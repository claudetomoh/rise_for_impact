'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Video, Mic, Image, Play, ExternalLink, Youtube, Music, MapPin } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AnimatedSection } from '@/components/animations/motion-wrappers'
import { SectionParallax } from '@/components/animations/parallax-background'
import { Lightbox } from '@/components/ui/lightbox'

const mediaTypes = [
  { name: 'Videos', icon: Video, count: 'Growing', color: 'from-red-500 to-red-600' },
  { name: 'Podcasts', icon: Mic, count: 'Coming Soon', color: 'from-purple-500 to-purple-600' },
  { name: 'Photos', icon: Image, count: '500+', color: 'from-blue-500 to-blue-600' },
  { name: 'Stories', icon: Youtube, count: 'Growing', color: 'from-pink-500 to-pink-600' }
]

const galleryCategories = [
  'All',
  'Community Projects',
  'Climate Action',
  'Leadership Training',
  'Club Meetings',
  'Impact Stories',
  'Events'
]

const galleryImages = [
  {
    src: '/images/backgrounds/club-impact.jpeg',
    title: 'Community Impact Project',
    description: 'Young leaders implementing sustainable solutions in their local communities across Africa.',
    location: 'Multiple Countries',
    date: '2024',
    category: 'Community Projects'
  },
  {
    src: '/images/backgrounds/ClubMeeting.jpeg',
    title: 'Leadership Workshop',
    description: 'Intensive leadership development session empowering the next generation of African changemakers.',
    location: 'University Campus',
    date: '2024',
    category: 'Leadership Training'
  },
  {
    src: '/images/backgrounds/ClubMeeting2.jpeg',
    title: 'Club Strategy Session',
    description: 'Rise for Impact club members planning impactful community interventions and programs.',
    location: 'University Campus',
    date: '2024',
    category: 'Club Meetings'
  },
  {
    src: '/images/backgrounds/Togetherness.jpg',
    title: 'Pan-African Unity',
    description: 'Bringing together young leaders from across 8+ African countries for collective impact.',
    location: 'Africa',
    date: '2024',
    category: 'Events'
  },
  {
    src: '/images/backgrounds/youthLead.jpeg',
    title: 'Youth Leadership Forum',
    description: 'Empowering youth voices in critical discussions about Africa\'s future and development.',
    location: 'Pan-African',
    date: '2024',
    category: 'Leadership Training'
  },
  {
    src: '/images/backgrounds/impact1.jpeg',
    title: 'Climate Action Initiative',
    description: 'Rise for Climate program mobilizing youth to address environmental challenges across the continent.',
    location: 'Multiple Locations',
    date: '2024',
    category: 'Climate Action'
  },
  {
    src: '/images/backgrounds/impact2.jpeg',
    title: 'Community Transformation',
    description: 'Real impact, real change - transforming communities through youth-led initiatives.',
    location: 'Local Communities',
    date: '2024',
    category: 'Impact Stories'
  },
  {
    src: '/images/backgrounds/fellowship.jpeg',
    title: 'Fellowship Program',
    description: 'Building a network of exceptional young leaders committed to driving sustainable change.',
    location: 'Pan-African',
    date: '2024',
    category: 'Leadership Training'
  },
  {
    src: '/images/backgrounds/club-hero.jpeg',
    title: 'Club Launch Event',
    description: 'Celebrating the expansion of Rise for Impact to new university campuses across Africa.',
    location: 'University Campus',
    date: '2024',
    category: 'Events'
  },
  {
    src: '/images/backgrounds/club-team.jpeg',
    title: 'Club Leadership Team',
    description: 'Dedicated student leaders driving impact in their university communities.',
    location: 'University Campus',
    date: '2024',
    category: 'Club Meetings'
  },
  {
    src: '/images/backgrounds/impact_clinic.jpeg',
    title: 'Impact Clinic Session',
    description: 'Hands-on workshops helping young leaders turn ideas into measurable community impact.',
    location: 'Training Center',
    date: '2024',
    category: 'Leadership Training'
  },
  {
    src: '/images/backgrounds/bg.jpeg',
    title: 'Movement Building',
    description: 'Growing the largest youth-led movement for social impact across Africa.',
    location: 'Pan-African',
    date: '2024',
    category: 'Impact Stories'
  }
]

const featuredMedia = [
  {
    type: 'video',
    title: 'Rise for Impact: Our Story',
    description: 'Discover how we\'re empowering young African leaders to create lasting change in their communities.',
    thumbnail: '/images/backgrounds/bg.jpeg',
    duration: '5:32',
    views: 'Coming Soon',
    category: 'Documentary'
  },
  {
    type: 'podcast',
    title: 'Youth Leadership in Africa',
    description: 'Conversations with young changemakers driving innovation and social impact across the continent.',
    thumbnail: '/images/backgrounds/youthLead.jpeg',
    duration: '45:00',
    episodes: 'Coming Soon',
    category: 'Podcast Series'
  },
  {
    type: 'video',
    title: 'Climate Action Movement',
    description: 'How our Rise for Climate program is mobilizing youth to address environmental challenges.',
    thumbnail: '/images/backgrounds/Togetherness.jpg',
    duration: '8:15',
    views: 'Coming Soon',
    category: 'Program Highlight'
  },
  {
    type: 'gallery',
    title: 'Community Impact Gallery',
    description: 'Visual stories from our projects across 8+ African countries showing real transformation.',
    thumbnail: '/images/backgrounds/club-impact.jpeg',
    photos: '500+',
    category: 'Photo Gallery'
  },
  {
    type: 'video',
    title: 'Youth Empowerment',
    description: 'Empowering young African leaders to break barriers and create opportunities in their communities.',
    thumbnail: '/images/backgrounds/ClubMeeting2.jpeg',
    duration: '6:45',
    views: 'Coming Soon',
    category: 'Impact Story'
  },
  {
    type: 'podcast',
    title: 'Entrepreneurship & Innovation',
    description: 'Young entrepreneurs share their journey from idea to impact, inspiring the next generation.',
    thumbnail: '/images/backgrounds/ClubMeeting.jpeg',
    duration: '38:20',
    episodes: 'Coming Soon',
    category: 'Podcast Series'
  }
]

export function MediaHub() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory)

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => setLightboxOpen(false)
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length)
  }
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length)
  }

  return (
    <section id="media" className="py-12 md:py-16 relative overflow-hidden">
      {/* Parallax Background */}
      <SectionParallax image="/images/backgrounds/impact2.jpeg" intensity={0.3} />
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/50 via-dark-800/40 to-dark-900/50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(244,63,94,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.08),transparent_50%)]" />

      <div className="container-premium relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20"
          >
            <Video className="w-4 h-4 text-pink-400" />
            <span className="text-sm font-medium text-pink-400">Media Hub</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-display font-bold">
            <span className="text-gradient">Media Hub</span>
          </h2>

          <p className="text-xl text-dark-300 max-w-3xl mx-auto leading-relaxed">
            Explore our visual journey of impact across Africa—from community projects to 
            leadership development, every photo tells a story of transformation.
          </p>
        </AnimatedSection>

        {/* Category Filter */}
        <AnimatedSection className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {galleryCategories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-glow'
                    : 'bg-dark-800/50 text-dark-300 hover:bg-dark-700 hover:text-white'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </AnimatedSection>

        {/* Gallery Grid - Masonry Style */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 mb-16">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.src}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="break-inside-avoid"
            >
              <Card 
                className="group cursor-pointer hover:scale-[1.02] transition-all duration-500 overflow-hidden"
                onClick={() => openLightbox(index)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  
                  {/* Overlay on Hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6"
                  >
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {image.title}
                      </h3>
                      <p className="text-dark-300 text-sm mb-3 line-clamp-2">
                        {image.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-dark-400">
                        {image.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>{image.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge variant="gradient" size="sm">
                      {image.category}
                    </Badge>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Gallery Stats */}
        <AnimatedSection className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="glass-card p-6 rounded-2xl text-center">
              <div className="text-4xl font-bold text-primary-400 mb-2">{galleryImages.length}</div>
              <div className="text-dark-400 text-sm">Photos</div>
            </div>
            <div className="glass-card p-6 rounded-2xl text-center">
              <div className="text-4xl font-bold text-accent-400 mb-2">8+</div>
              <div className="text-dark-400 text-sm">Countries</div>
            </div>
            <div className="glass-card p-6 rounded-2xl text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">50+</div>
              <div className="text-dark-400 text-sm">Projects</div>
            </div>
            <div className="glass-card p-6 rounded-2xl text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">10K+</div>
              <div className="text-dark-400 text-sm">Lives Impacted</div>
            </div>
          </div>
        </AnimatedSection>

        {/* YouTube Channel CTA */}
        <AnimatedSection>
          <div className="glass-card p-12 rounded-3xl text-center max-w-4xl mx-auto relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:2rem_2rem]" />
            
            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-center gap-4 mb-6">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center shadow-glow"
                >
                  <Youtube className="w-8 h-8 text-white" />
                </motion.div>
              </div>

              <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                Subscribe to Our Channel
              </h3>
              <p className="text-dark-300 text-lg mb-8 max-w-2xl mx-auto">
                Get the latest impact stories, leadership insights, and exclusive content 
                delivered directly to your feed.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="primary" size="lg" rightIcon={<Youtube />}>
                  Subscribe on YouTube
                </Button>
                <Button variant="outline" size="lg" rightIcon={<Mic />}>
                  Listen to Podcast
                </Button>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Lightbox */}
        {lightboxOpen && (
          <Lightbox
            images={filteredImages}
            currentIndex={currentImageIndex}
            onClose={closeLightbox}
            onNext={nextImage}
            onPrev={prevImage}
          />
        )}
      </div>
    </section>
  )
}
