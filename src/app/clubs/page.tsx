import { PageWithNav } from '@/components/layout/page-with-nav'
import { PremiumPageLayout } from '@/components/layout/premium-page-layout'
import { GraduationCap } from 'lucide-react'
import Link from 'next/link'

export default function ClubsPage() {
  return (
    <PageWithNav>
      <PremiumPageLayout
        title="University Clubs"
        subtitle="Campus-based chapters bringing Rise for Impact to students"
        icon={<GraduationCap className="w-10 h-10 text-purple-400" />}
        gradient="purple"
      >
        <div className="space-y-8">
          <div className="text-center">
            <Link href="/#clubs" className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-xl transition-all">
              View All Clubs on Main Page
            </Link>
          </div>
        </div>
      </PremiumPageLayout>
    </PageWithNav>
  )
}
