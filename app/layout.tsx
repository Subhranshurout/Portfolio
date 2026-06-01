import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { BfCacheRecovery } from '@/components/BfCacheRecovery'

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') ||
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.setAttribute('data-theme', theme);
              })();
            `,
          }}
        />
      </head>
      <body
        style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
        }}
      >
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
