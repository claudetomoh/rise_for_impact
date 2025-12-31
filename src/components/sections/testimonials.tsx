'use client'

import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { AnimatedSection } from '@/components/animations/motion-wrappers'
import { SectionParallax } from '@/components/animations/parallax-background'

const testimonials = [
  {
    name: 'University Student',
    role: 'Rise Circle Participant',
    country: 'Cameroon',
    quote: 'Testimonials will be shared here as we continue building our community and gathering feedback from participants.',
    rating: 5,
    image: '/images/backgrounds/club-team.jpeg',
    isPlaceholder: true
  },
  {
    name: 'Climate Leader',
    role: 'Rise for Climate Program',
    country: 'Africa',
    quote: 'We\'re reaching out to our community members for their stories and experiences with Rise for Impact programs.',
    rating: 5,
    image: '/images/backgrounds/Togetherness.jpg',
    isPlaceholder: true
  },
  {
    name: 'Impact Project Leader',
    role: 'Impact Clinic Participant',
    country: 'Africa',
    quote: 'If you\'ve participated in our programs, we\'d love to hear your story. Reach out to share your experience!',
    rating: 5,
    image: '/images/backgrounds/impact1.jpeg',
    isPlaceholder: true
  },
  {
    name: 'Campus Ambassador',
    role: 'University Club Member',
    country: 'Africa',
    quote: 'Real testimonials from our growing community of young changemakers will be featured here soon.',
    rating: 5,
    image: '/images/backgrounds/ClubMeeting.jpeg',
    isPlaceholder: true
  },
  {
    name: 'Program Participant',
    role: 'Rise for Impact Community',
    country: 'Africa',
    quote: 'As a young organization, we\'re building authentic relationships and gathering genuine feedback from our participants.',
    rating: 5,
    image: '/images/backgrounds/ClubMeeting2.jpeg',
    isPlaceholder: true
  },
  {
    name: 'Youth Leader',
    role: 'Civic Education Initiative',
    country: 'Africa',
    quote: 'Your story could be featured here! Join our programs and help us document the impact we\'re creating together.',
    rating: 5,
    image: '/images/backgrounds/club-impact.jpeg',
    isPlaceholder: true
  }
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-12 md:py-16 relative overflow-hidden">
      {/* Parallax Background */}
      <SectionParallax image="/images/backgrounds/club-impact.jpeg" intensity={0.3} />
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/50 via-dark-800/40 to-dark-900/50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(34,197,94,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(245,158,11,0.08),transparent_50%)]" />

      <div className="container-premium relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20"
          >
            <Quote className="w-4 h-4 text-accent-400" />
            <span className="text-sm font-medium text-accent-400">Impact Stories</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-display font-bold">
            <span className="text-white">Stories That </span>
            <span className="text-gradient">Inspire</span>
          </h2>

          <p className="text-xl text-dark-300 max-w-3xl mx-auto leading-relaxed">
            Coming soon - Real stories from our community of young changemakers making impact across Africa.
          </p>
        </AnimatedSection>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group h-full hover:scale-[1.02] transition-all duration-500 relative overflow-hidden">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="w-20 h-20 text-primary-400" />
                </div>

                <div className="p-8 space-y-6 relative z-10">
                  {/* Rating */}
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-accent-400 text-accent-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-dark-200 leading-relaxed text-lg">
                    "{testimonial.quote}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-6 border-t border-dark-700">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary-500/30">
                      <img 
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-dark-400">
                        {testimonial.role}
                      </div>
                      <div className="text-xs text-primary-400 mt-1">
                        {testimonial.country}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Gradient */}
                <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-700" />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <AnimatedSection className="mt-20">
          <div className="glass-card p-12 rounded-3xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-display font-bold text-gradient mb-2">98%</div>
                <div className="text-dark-400">Satisfaction Rate</div>
              </div>
              <div>
                <div className="text-4xl font-display font-bold text-gradient mb-2">10K+</div>
                <div className="text-dark-400">Lives Impacted</div>
              </div>
              <div>
                <div className="text-4xl font-display font-bold text-gradient mb-2">500+</div>
                <div className="text-dark-400">Success Stories</div>
              </div>
              <div>
                <div className="text-4xl font-display font-bold text-gradient mb-2">8+</div>
                <div className="text-dark-400">Countries</div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
