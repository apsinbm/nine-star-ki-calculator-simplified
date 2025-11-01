/**
 * Root Layout Component
 *
 * This is the main layout wrapper for the entire application.
 * It defines global styles, fonts, and metadata.
 */

import type { Metadata, Viewport } from 'next'
import { Inter, Noto_Serif, JetBrains_Mono } from 'next/font/google'
import '@/styles/globals.css'

// Font configurations
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-noto-serif',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

// Application metadata
export const metadata: Metadata = {
  title: 'Nine Star Ki Calculator',
  description:
    'Calculate your Nine Star Ki profile with precision. Discover your year star, month star, and energetic star based on the solar calendar.',
  keywords: [
    'Nine Star Ki',
    'Ki',
    'Astrology',
    'Eastern Astrology',
    'Nine Ki',
    'Solar Calendar',
    'Chinese Astrology',
  ],
  authors: [{ name: 'Nine Star Ki Calculator' }],
}

// Viewport configuration (separate from metadata in Next.js 14+)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1e40af',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${notoSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen antialiased">
        {/* Main content */}
        <main className="relative">{children}</main>
      </body>
    </html>
  )
}
