import type { Metadata } from 'next'
import { Theme } from '@radix-ui/themes'
import { PageHeader } from '@/components/Header'
import '@radix-ui/themes/styles.css'
import './reset.css'

export const metadata: Metadata = {
  title: 'Stock Info',
  description: 'Simple app showing current and historical stock data',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Theme accentColor="brown">
          <PageHeader />
          {children}
        </Theme>
      </body>
    </html>
  )
}
