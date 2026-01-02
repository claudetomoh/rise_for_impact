import { Navbar } from '@/components/layout/navbar'
import { Hero } from '@/components/sections/hero'
import { ImpactStats } from '@/components/sections/impact-stats'
import { MissionVision } from '@/components/sections/mission-vision'
import { Programs } from '@/components/sections/programs'
import { Regions } from '@/components/sections/regions'
import { Clubs } from '@/components/sections/clubs'
import OpportunitiesSection from '@/components/sections/opportunities'
import { Team } from '@/components/sections/team'
import { MediaHub } from '@/components/sections/media-hub'
import { Blog } from '@/components/sections/blog'
import { ContactForm } from '@/components/sections/contact'
import { CallToAction } from '@/components/sections/cta'
import { Footer } from '@/components/sections/footer'
import { ParallaxBackground } from '@/components/animations/parallax-background'
import { SkipToContent } from '@/components/ui/skip-to-content'
import { ScrollToTop } from '@/components/ui/scroll-to-top'
import { ScrollProgress } from '@/components/ui/scroll-progress'

const backgroundImages = [
  '/images/backgrounds/impact1.jpeg',
  '/images/backgrounds/impact2.jpeg',
  '/images/backgrounds/Togetherness.jpg',
  '/images/backgrounds/ClubMeeting.jpeg',
  '/images/backgrounds/ClubMeeting2.jpeg',
  '/images/backgrounds/club-team.jpeg',
]

export default function Home() {
  return (
    <>
      <SkipToContent />
      <ScrollProgress />
      <main id="main-content" className="relative min-h-screen">
        {/* Global Parallax Background - Changes as you scroll */}
        <ParallaxBackground images={backgroundImages} />

        <Navbar />
        <Hero />
        <ImpactStats />
        <MissionVision />
        <Programs />
        <Regions />
        <Clubs />
        <OpportunitiesSection />
        <Team />
        <MediaHub />
        <Blog />
        <ContactForm />
        {/* CTA Section */}
        <CallToAction />
        {/* Footer */}
        <Footer />
      </main>
      <ScrollToTop />
    </>
  )
}
