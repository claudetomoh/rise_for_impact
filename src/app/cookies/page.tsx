import { PremiumPageLayout } from '@/components/layout/premium-page-layout'
import { Cookie } from 'lucide-react'

export default function CookiesPage() {
  return (
    <PremiumPageLayout
      title="Cookie Policy"
      subtitle="How we use cookies and similar technologies"
      icon={<Cookie className="w-10 h-10 text-orange-400" />}
      gradient="orange"
    >
      <div className="space-y-8 text-dark-200">
        <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
          <p className="text-sm"><strong className="text-white">Last updated:</strong> January 2026</p>
        </div>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">What Are Cookies</h2>
          <p className="leading-relaxed">
            Cookies are small text files stored on your device when you visit websites. They help us provide you with a better browsing experience by remembering your preferences and analyzing how you use our site.
          </p>
        </section>

        <section className="space-y-4 pt-4 border-t border-dark-700">
          <h2 className="text-2xl font-bold text-white">How We Use Cookies</h2>
          <p className="leading-relaxed mb-3">We use cookies to:</p>
          <ul className="space-y-2 pl-6">
            <li className="flex items-start gap-2">
              <span className="text-orange-400 mt-1">•</span>
              <span>Remember your preferences and settings</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-400 mt-1">•</span>
              <span>Analyze website traffic and user behavior</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-400 mt-1">•</span>
              <span>Improve user experience and site functionality</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-400 mt-1">•</span>
              <span>Provide relevant content and features</span>
            </li>
          </ul>
        </section>

        <section className="space-y-4 pt-4 border-t border-dark-700">
          <h2 className="text-2xl font-bold text-white">Types of Cookies We Use</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-700">
              <h3 className="font-bold text-white mb-2">Essential Cookies</h3>
              <p className="text-sm">Required for the website to function properly</p>
            </div>
            <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-700">
              <h3 className="font-bold text-white mb-2">Analytics Cookies</h3>
              <p className="text-sm">Help us understand how visitors use our website</p>
            </div>
            <div className="p-4 rounded-xl bg-dark-800/50 border border-dark-700">
              <h3 className="font-bold text-white mb-2">Preference Cookies</h3>
              <p className="text-sm">Remember your settings and preferences</p>
            </div>
          </div>
        </section>

        <section className="space-y-4 pt-4 border-t border-dark-700">
          <h2 className="text-2xl font-bold text-white">Managing Cookies</h2>
          <p className="leading-relaxed">
            You can control and manage cookies through your browser settings. Note that disabling certain cookies may affect website functionality and your user experience.
          </p>
        </section>

        <div className="pt-6 border-t border-dark-700">
          <div className="p-4 rounded-xl bg-dark-800/30 text-center">
            <p className="text-dark-400 text-sm italic">Complete cookie policy being finalized</p>
          </div>
        </div>
      </div>
    </PremiumPageLayout>
  )
}
