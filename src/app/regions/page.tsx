import { PageWithNav } from '@/components/layout/page-with-nav'
import { PremiumPageLayout } from '@/components/layout/premium-page-layout'
import { Globe, MapPin, Users } from 'lucide-react'
import Image from 'next/image'

export default function RegionsPage() {
  const countries = [
    { name: 'Cameroon', flag: '🇨🇲', coordinator: 'Nawal Chefton', regions: 2 },
    { name: 'Ghana', flag: '🇬🇭', coordinator: 'Akurugu Princess' },
    { name: 'Nigeria', flag: '🇳🇬', coordinator: 'Kareen Ajatitton' },
    { name: 'Uganda', flag: '🇺🇬', coordinator: 'Tito Moses' },
    { name: 'DRC', flag: '🇨🇩', coordinator: 'Jacques Balolage' },
    { name: 'Rwanda', flag: '🇷🇼', coordinator: 'Regine Niyorukundo' },
    { name: 'Tanzania', flag: '🇹🇿', coordinator: 'Johnson Pendaeli' },
    { name: 'Liberia', flag: '🇱🇷', coordinator: 'Jessica A. Morris' },
  ]

  return (
    <PageWithNav>
      <PremiumPageLayout
        title="Our Regional Presence"
        subtitle="Active in 8+ African countries with dedicated coordinators"
        icon={<Globe className="w-10 h-10 text-emerald-400" />}
        gradient="emerald"
      >
        <div className="space-y-12">
          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
              <div className="text-4xl font-bold text-emerald-400 mb-2">8+</div>
              <div className="text-sm text-dark-300 font-medium">Countries</div>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
              <div className="text-4xl font-bold text-blue-400 mb-2">10+</div>
              <div className="text-sm text-dark-300 font-medium">Regional Chapters</div>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
              <div className="text-4xl font-bold text-purple-400 mb-2">10K+</div>
              <div className="text-sm text-dark-300 font-medium">Youth Engaged</div>
            </div>
          </div>

          {/* Northwest Region */}
          <div id="northwest" className="scroll-mt-20">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
              <div className="flex items-start gap-6 mb-6">
                <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 bg-emerald-500/20">
                  <Image
                    src="/images/team/Ramson.jpeg"
                    alt="Chafor Ramson Njoyue"
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Cameroon Northwest Region</h3>
                  <p className="text-emerald-400 font-semibold mb-2">Regional Coordinator: Chafor Ramson Njoyue</p>
                  <p className="text-dark-200">Leading community-driven initiatives focused on youth empowerment and sustainable development in Northwest Cameroon.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Southwest Region */}
          <div id="southwest" className="scroll-mt-20">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
              <div className="flex items-start gap-6 mb-6">
                <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 bg-blue-500/20">
                  <Image
                    src="/images/team/Neh-Valerie.jpeg"
                    alt="Neh Valerie"
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Cameroon Southwest Region</h3>
                  <p className="text-blue-400 font-semibold mb-2">Regional Coordinator: Neh Valerie</p>
                  <p className="text-dark-200">Software engineer and community leader passionate about leveraging technology for social impact in Southwest Cameroon.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Country Coordinators */}
          <div className="pt-6 border-t border-dark-700">
            <h3 className="text-2xl font-bold text-white mb-6 font-display flex items-center gap-3">
              <MapPin className="w-6 h-6 text-emerald-400" />
              Country Coordinators
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {countries.map((country, index) => (
                <div key={index} className="p-4 rounded-xl bg-dark-800/50 border border-dark-700 hover:border-emerald-500/50 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{country.flag}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white group-hover:text-emerald-400 transition-colors">{country.name}</h4>
                        {country.regions && (
                          <span className="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full">{country.regions} regions</span>
                        )}
                      </div>
                      <p className="text-sm text-dark-300">{country.coordinator}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PremiumPageLayout>
    </PageWithNav>
  )
}
