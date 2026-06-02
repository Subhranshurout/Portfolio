import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { BfCacheRecovery } from '@/components/BfCacheRecovery'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Subhranshu Sekhar Rout | iOS Developer',
  description:
    'iOS Developer with 3+ years building production apps in Parental Control, Healthcare, OTT, E-Commerce, and RTC. Swift, SwiftUI, UIKit.',
  keywords: ['iOS Developer', 'Swift', 'SwiftUI', 'UIKit', 'Mobile Development', 'Ahmedabad'],
  authors: [{ name: 'Subhranshu Sekhar Rout' }],
  openGraph: {
    title: 'Subhranshu Sekhar Rout | iOS Developer',
    description: 'Native iOS developer — Swift, SwiftUI, UIKit, production apps.',
    type: 'website',
    url: 'https://subhranshurout.dev',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#1C1C1E',
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Subhranshu Sekhar Rout',
  jobTitle: 'iOS Developer',
  email: 'subhranshurout95@gmail.com',
  telephone: '+917077955230',
  url: 'https://subhranshurout.dev',
  sameAs: [
    'https://linkedin.com/in/subhranshu-rout-a32601239',
    'https://github.com/Subhranshurout',
  ],
  alumniOf: { '@type': 'EducationalOrganization', name: 'DRIEMS University' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1C1C1E" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 'dark';
                document.documentElement.setAttribute('data-theme', theme);
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js-loaded');`,
          }}
        />
        <ThemeProvider>
          <BfCacheRecovery />
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
