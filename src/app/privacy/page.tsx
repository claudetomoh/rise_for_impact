import { PremiumPageLayout } from '@/components/layout/premium-page-layout'
import { Shield } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <PremiumPageLayout
      title="Privacy Policy"
      subtitle="How we collect, use, and protect your personal information"
      icon={<Shield className="w-10 h-10 text-blue-400" />}
      gradient="blue"
    >
      <div className="space-y-8 text-dark-200">
        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <p className="text-sm"><strong className="text-white">Last updated:</strong> January 2026</p>
        </div>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Introduction</h2>
          <p className="leading-relaxed">
            Rise for Impact ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
          </p>
        </section>

        <section className="space-y-4 pt-4 border-t border-dark-700">
          <h2 className="text-2xl font-bold text-white">Information We Collect</h2>
          <p className="leading-relaxed mb-3">We collect information you provide when you:</p>
          <ul className="space-y-2 pl-6">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-1">•</span>
              <span>Apply for our fellowship programs or other opportunities</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-1">•</span>
              <span>Subscribe to our newsletter</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-1">•</span>
              <span>Contact us via forms or email</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-1">•</span>
              <span>Attend our events or programs</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-1">•</span>
              <span>Use our website (cookies, analytics data)</span>
            </li>
          </ul>
        </section>

        <section className="space-y-4 pt-4 border-t border-dark-700">
          <h2 className="text-2xl font-bold text-white">How We Use Your Information</h2>
          <p className="leading-relaxed mb-3">We use your information to:</p>
          <ul className="space-y-2 pl-6">
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>Process applications and communicate about programs</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>Send newsletters and program updates</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>Improve our services and user experience</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>Comply with legal obligations</span>
            </li>
          </ul>
        </section>

        <section className="space-y-4 pt-4 border-t border-dark-700">
          <h2 className="text-2xl font-bold text-white">Data Security</h2>
          <p className="leading-relaxed">
            We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>
        </section>

        <section className="space-y-4 pt-4 border-t border-dark-700">
          <h2 className="text-2xl font-bold text-white">Your Rights</h2>
          <p className="leading-relaxed">
            You have the right to access, update, or delete your personal information. Contact us at <a href="mailto:info@riseforimpact.org" className="text-blue-400 hover:underline">info@riseforimpact.org</a> to exercise these rights.
          </p>
        </section>

        <section className="space-y-4 pt-4 border-t border-dark-700">
          <h2 className="text-2xl font-bold text-white">Contact Us</h2>
          <p className="leading-relaxed">
            For privacy concerns or questions, contact us at: <a href="mailto:info@riseforimpact.org" className="text-blue-400 hover:underline">info@riseforimpact.org</a>
          </p>
        </section>

        <div className="pt-6 border-t border-dark-700">
          <div className="p-4 rounded-xl bg-dark-800/30 text-center">
            <p className="text-dark-400 text-sm italic">Complete privacy policy being finalized with legal counsel</p>
          </div>
        </div>
      </div>
    </PremiumPageLayout>
  )
}
