import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Subhranshu Sekhar Rout | iOS Developer Portfolio',
  description: 'iOS Developer specializing in Swift, SwiftUI, and UIKit. Building scalable, modern Apple ecosystem apps.',
  keywords: ['iOS Developer', 'Swift', 'SwiftUI', 'UIKit', 'Mobile Development'],
  authors: [{ name: 'Subhranshu Sekhar Rout' }],
  openGraph: {
    title: 'Subhranshu Sekhar Rout | iOS Developer Portfolio',
    description: 'iOS Developer specializing in Swift, SwiftUI, and UIKit.',
    type: 'website',
    url: 'https://subhranshurout.dev',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Subhranshu Sekhar Rout | iOS Developer Portfolio',
    description: 'iOS Developer specializing in Swift, SwiftUI, and UIKit.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Subhranshu Sekhar Rout',
  jobTitle: 'iOS Developer',
  description: 'iOS Developer specializing in Swift, SwiftUI, and UIKit',
  email: 'subhranshurout95@gmail.com',
  telephone: '+917077955230',
  url: 'https://subhranshurout.dev',
  sameAs: [
    'https://linkedin.com/in/subhranshu-rout-a32601239',
    'https://github.com/Subhranshurout',
  ],
  knowsAbout: ['iOS Development', 'Swift', 'SwiftUI', 'UIKit', 'Mobile App Development'],
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'DRIEMS University',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
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
      <body className={inter.variable}>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js-loaded');`,
          }}
        />
        <ThemeProvider>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
