import type { Metadata } from 'next'
import '../styles/globals.css'
import { Providers } from './providers'
import { ScrollProgress } from '@/components/effects/scroll-progress'
import { ToastProvider } from '@/components/providers/toast-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { AccessibilityWidget } from '@/components/ui/accessibility-widget'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  title: {
    default: 'Rise for Impact | Empowering African Youth Leaders',
    template: '%s | Rise for Impact'
  },
  description: 'Rise for Impact is a youth-focused social initiative connecting young Africans to opportunities, skills, and leadership pathways across Cameroon, Ghana, Nigeria, and Rwanda.',
  keywords: [
    'African youth', 'youth leadership Africa', 'social impact Africa',
    'youth opportunity access', 'pan-African social initiative', 'climate action youth',
    'civic education Africa', 'youth empowerment Cameroon', 'youth empowerment Ghana',
    'youth empowerment Nigeria', 'youth empowerment Rwanda', 'fellowship Africa',
    'scholarship Africa', 'Rise for Impact', 'youth networking Africa',
    'leadership development Africa', 'African youth organisation'
  ],
  authors: [{ name: 'Rise for Impact' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.riseforimpact.org',
    siteName: 'Rise for Impact',
    title: 'Rise for Impact | Connecting Young Africans to Real Opportunities',
    description: 'Rise for Impact is a youth-focused social initiative connecting young Africans to real opportunities, practical skills, and leadership pathways across Cameroon, Ghana, Nigeria, and Rwanda.',
    images: [
      {
        url: '/images/backgrounds/fellowship.jpeg',
        width: 1200,
        height: 630,
        alt: 'Rise for Impact Fellowship - Empowering African Youth Leaders'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rise for Impact | Empowering African Youth Leaders',
    description: 'Rise for Impact is a youth-focused social initiative connecting young Africans to real opportunities, practical skills, and leadership pathways across Cameroon, Ghana, Nigeria, and Rwanda.',
    images: ['/images/backgrounds/fellowship.jpeg'],
    creator: '@riseforimpact'
  },
  alternates: {
    canonical: 'https://riseforimpact.org',
  },
  category: 'Education & Social Impact',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="canonical" href="https://riseforimpact.org" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="theme-color" content="#22C55E" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Rise4Impact" />
        
        {/* Additional SEO */}
        <meta property="og:image:type" content="image/jpeg" />
        <meta name="geo.region" content="Africa" />
        <meta name="geo.placename" content="Pan-African" />
        
        {/* Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Rise for Impact',
              url: 'https://riseforimpact.org',
              logo: 'https://riseforimpact.org/images/logo.jpeg',
              description: 'Rise for Impact is a youth-focused social initiative founded in 2025 to connect young Africans to opportunities, practical skills, and leadership pathways across Cameroon, Ghana, Nigeria, and Rwanda.',
              foundingDate: '2025',
              areaServed: {
                '@type': 'Place',
                name: 'Africa'
              },
              sameAs: [
                'https://www.linkedin.com/company/rise-for-impact',
                'https://www.facebook.com/share/1HVFiDupbD/?mibextid=wwXIfr',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'General Inquiries',
                email: 'info@riseforimpact.org'
              }
            })
          }}
        />
      </head>
      <body className="min-h-screen font-sans" suppressHydrationWarning>
        <ScrollProgress />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <ToastProvider />
            {children}
            <AccessibilityWidget />
            <Analytics />
            <SpeedInsights />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
