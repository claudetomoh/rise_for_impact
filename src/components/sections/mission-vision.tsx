'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Target, Eye, Heart, Lightbulb, Users, Globe } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AnimatedSection } from '@/components/animations/motion-wrappers'
import { SectionParallax } from '@/components/animations/parallax-background'

const coreValues = [
  {
    icon: Lightbulb,
    title: 'Bold Innovation',
    description: 'We don\'t wait for solutions—we create them. From climate action to opportunity access, we\'re building the future Africa deserves.',
    color: 'from-yellow-500 to-yellow-600'
  },
  {
    icon: Users,
    title: 'Youth Power',
    description: 'Africa\'s 1.4 billion young people aren\'t the leaders of tomorrow—we\'re the changemakers of today, right now.',
    color: 'from-primary-500 to-primary-600'
  },
  {
    icon: Globe,
    title: 'Pan-African Unity',
    description: 'Borders don\'t limit impact. We\'re one continent, one movement, 8+ countries strong and growing.',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Target,
    title: 'Action Over Words',
    description: 'We measure success in real impact: communities transformed, leaders developed, opportunities unlocked.',
    color: 'from-red-500 to-red-600'
  }
]

export function MissionVision() {
  return (
    <section id="mission-vision" className="py-8 md:py-12 relative overflow-hidden">
      {/* Parallax Background */}
      <SectionParallax image="/images/backgrounds/club-impact.jpeg" intensity={0.3} />
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/50 via-dark-800/40 to-dark-900/50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(34,197,94,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.08),transparent_50%)]" />

      <div className="container-premium relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-8 md:mb-12 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20"
          >
            <Target className="w-3.5 h-3.5 text-primary-400" />
            <span className="text-xs md:text-sm font-medium text-primary-400">Our Purpose</span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-display font-bold">
            <span className="text-gradient">Mission & Vision</span>
          </h2>

          <p className="text-xl text-dark-300 max-w-3xl mx-auto leading-relaxed">
            Guided by purpose, driven by impact—building a movement of young African leaders.
          </p>
        </AnimatedSection>

        {/* About Introduction */}
        <AnimatedSection delay={0.1} className="mb-12 md:mb-16">
          <Card className="group hover:scale-[1.01] transition-all duration-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-accent-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative p-8 md:p-12 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 shadow-lg shadow-primary-500/30">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  Who We Are
                </h3>
              </div>

              <div className="space-y-4 text-base md:text-lg text-dark-200 leading-relaxed">
                <p>
                  <span className="text-white font-semibold">Rise for Impact</span> is a bold, youth-led 
                  pan-African movement reshaping the future of leadership development across the continent. 
                  Born from the conviction that Africa's young people shouldn't wait for opportunities—they 
                  should create them—we've built a dynamic ecosystem where ambition meets action.
                </p>
                
                <p>
                  With <span className="text-primary-400 font-semibold">10,000+ young leaders</span> across{' '}
                  <span className="text-accent-400 font-semibold">8+ countries</span> and{' '}
                  <span className="text-blue-400 font-semibold">4+ active university clubs</span>, we're 
                  not just talking about change—we're engineering it through transformative programs, hands-on 
                  community projects, and a relentless focus on climate action, education, and economic opportunity. 
                  From Cameroon to Ghana, Kenya to Nigeria, Rise for Impact is proving that when you combine 
                  Africa's largest asset—its youth—with world-class training and real-world opportunities, 
                  extraordinary impact becomes inevitable.
                </p>

                <div className="pt-4 border-t border-dark-700/50">
                  <p className="text-sm md:text-base text-primary-400 font-medium italic">
                    We are the generation that won't wait for permission to lead. We are Rise for Impact.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </AnimatedSection>

        {/* Mission & Vision Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12 md:mb-16">
          {/* Mission */}
          <AnimatedSection>
            <Card className="group h-full hover:scale-[1.02] transition-all duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative p-6 md:p-8 space-y-4 md:space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg shadow-primary-500/50">
                    <Target className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <div>
                    <Badge variant="primary" size="lg">Mission</Badge>
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  Our Mission
                </h3>

                <p className="text-base md:text-lg text-dark-300 leading-relaxed">
                  To unleash the power of African youth by providing radical access to leadership 
                  development, game-changing opportunities, and a movement where every young person 
                  can rise, lead, and transform their community.
                </p>

                <div className="pt-4 border-t border-dark-700">
                  <p className="text-sm text-dark-400 italic">
                    "We're not just building leaders—we're building a generation that refuses to wait 
                    for change and instead creates it."
                  </p>
                </div>
              </div>
            </Card>
          </AnimatedSection>

          {/* Vision */}
          <AnimatedSection delay={0.2}>
            <Card className="group h-full hover:scale-[1.02] transition-all duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative p-6 md:p-8 space-y-4 md:space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-gradient-to-br from-accent-500 to-accent-600 shadow-lg shadow-accent-500/50">
                    <Eye className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <div>
                    <Badge variant="warning" size="lg">Vision</Badge>
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  Our Vision
                </h3>

                <p className="text-base md:text-lg text-dark-300 leading-relaxed">
                  An Africa where every young person—regardless of background, location, or 
                  circumstances—has the skills, network, and opportunities to become a world-class 
                  leader driving sustainable prosperity across the continent and beyond.
                </p>

                <div className="pt-4 border-t border-dark-700">
                  <p className="text-sm text-dark-400 italic">
                    "By 2030, Rise for Impact will be the defining movement for youth-led transformation 
                    in Africa—1 million young leaders, 50+ countries, unstoppable impact."
                  </p>
                </div>
              </div>
            </Card>
          </AnimatedSection>
        </div>

        {/* Core Values */}
        <AnimatedSection className="space-y-8 md:space-y-10">
          <div className="text-center space-y-3">
            <h3 className="text-2xl md:text-4xl font-display font-bold text-white">
              Our Core Values
            </h3>
            <p className="text-lg text-dark-300 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group h-full hover:scale-105 transition-all duration-500 text-center relative overflow-hidden">
                  {/* Hover effect overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  <div className="relative p-8 space-y-4 flex flex-col items-center">
                    {/* Icon container - centered and professional */}
                    <div className="relative">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500`}>
                        <value.icon className="w-10 h-10 text-white" />
                      </div>
                      {/* Glow effect */}
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${value.color} blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
                    </div>
                    
                    <h4 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors pt-2">
                      {value.title}
                    </h4>
                    
                    <p className="text-sm text-dark-300 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Call to Action */}
        <AnimatedSection className="mt-20 text-center">
          <div className="glass-card p-8 md:p-12 rounded-3xl">
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">
              Join Us in Building Africa's Future
            </h3>
            <p className="text-lg text-dark-300 mb-8 max-w-2xl mx-auto">
              Whether you're a young leader ready to make an impact, an organization seeking to partner, 
              or a supporter of our mission—there's a place for you in the Rise for Impact movement.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/get-involved">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Get Involved
                </motion.button>
              </Link>
              <Link href="/#newsletter">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-xl bg-dark-700 text-white font-semibold hover:bg-dark-600 transition-all"
                >
                  Learn More
                </motion.button>
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
