import type { Metadata } from 'next'
import '../styles/globals.css'
import { Providers } from './providers'
import { ScrollProgress } from '@/components/effects/scroll-progress'
import { ToastProvider } from '@/components/providers/toast-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  title: 'Rise for Impact | Empowering African Youth Leaders',
  description: 'Pan-African youth-led movement empowering 10,000+ young leaders across 8+ countries through leadership development, climate action, and community impact projects.',
  keywords: [
    'African youth leadership',
    'youth empowerment Africa',
    'climate action Africa',
    'social impact',
    'community development',
    'student leadership',
    'African changemakers',
    'leadership training',
    'civic innovation',
    'sustainable development Africa',
    'youth organizations',
    'pan-African movement'
  ],
  authors: [{ name: 'Rise for Impact' }],
  creator: 'Rise for Impact',
  publisher: 'Rise for Impact',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://riseforimpact.org',
    siteName: 'Rise for Impact',
    title: 'Rise for Impact | Empowering 10,000+ African Youth Leaders',
    description: 'Pan-African youth-led movement empowering young leaders across 8+ countries through leadership development, climate action, and community impact projects.',
    images: [
      {
        url: '/images/backgrounds/club-impact.jpeg',
        width: 1200,
        height: 630,
        alt: 'Rise for Impact - African Youth Leadership Movement',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rise for Impact | Empowering African Youth Leaders',
    description: 'Pan-African movement empowering 10,000+ young leaders across Africa',
    images: ['/images/backgrounds/club-impact.jpeg'],
    creator: '@riseforimpact',
  },
  verification: {
    google: 'your-google-verification-code',
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
              description: 'Pan-African youth-led movement empowering 10,000+ young leaders across 8+ countries through leadership development, climate action, and community impact projects.',
              foundingDate: '2024',
              areaServed: {
                '@type': 'Place',
                name: 'Africa'
              },
              numberOfEmployees: {
                '@type': 'QuantitativeValue',
                value: '10000+'
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
            <Analytics />
            <SpeedInsights />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
