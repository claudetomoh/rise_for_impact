import { PremiumPageLayout } from '@/components/layout/premium-page-layout'
import { FileText } from 'lucide-react'

export default function TermsPage() {
  return (
    <PremiumPageLayout
      title="Terms of Service"
      subtitle="Terms and conditions for using Rise for Impact services"
      icon={<FileText className="w-10 h-10 text-purple-400" />}
      gradient="purple"
    >
      <div className="space-y-8 text-dark-200">
        <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
          <p className="text-sm"><strong className="text-white">Last updated:</strong> January 2026</p>
        </div>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Acceptance of Terms</h2>
          <p className="leading-relaxed">
            By accessing and using Rise for Impact's website and services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our services.
          </p>
        </section>

        <section className="space-y-4 pt-4 border-t border-dark-700">
          <h2 className="text-2xl font-bold text-white">Use of Services</h2>
          <p className="leading-relaxed">
            Our services are intended for youth leaders, students, and organizations committed to social impact in Africa. You agree to use our services only for lawful purposes and in accordance with these terms.
          </p>
        </section>

        <section className="space-y-4 pt-4 border-t border-dark-700">
          <h2 className="text-2xl font-bold text-white">Intellectual Property</h2>
          <p className="leading-relaxed">
            All content on this website, including text, graphics, logos, and images, is the property of Rise for Impact and protected by copyright laws. You may not reproduce, distribute, or create derivative works without our permission.
          </p>
        </section>

        <section className="space-y-4 pt-4 border-t border-dark-700">
          <h2 className="text-2xl font-bold text-white">User Responsibilities</h2>
          <p className="leading-relaxed mb-3">When using our services, you agree to:</p>
          <ul className="space-y-2 pl-6">
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">•</span>
              <span>Provide accurate and truthful information</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">•</span>
              <span>Respect other users and community members</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">•</span>
              <span>Not engage in any harmful or illegal activities</span>
            </li>
          </ul>
        </section>

        <section className="space-y-4 pt-4 border-t border-dark-700">
          <h2 className="text-2xl font-bold text-white">Limitation of Liability</h2>
          <p className="leading-relaxed">
            Rise for Impact shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services.
          </p>
        </section>

        <section className="space-y-4 pt-4 border-t border-dark-700">
          <h2 className="text-2xl font-bold text-white">Contact</h2>
          <p className="leading-relaxed">
            Questions about these terms? Contact us at: <a href="mailto:info@riseforimpact.org" className="text-purple-400 hover:underline">info@riseforimpact.org</a>
          </p>
        </section>

        <div className="pt-6 border-t border-dark-700">
          <div className="p-4 rounded-xl bg-dark-800/30 text-center">
            <p className="text-dark-400 text-sm italic">Complete terms of service being finalized with legal counsel</p>
          </div>
        </div>
      </div>
    </PremiumPageLayout>
  )
}
