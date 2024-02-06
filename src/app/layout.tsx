import type { Metadata } from 'next'
import './reset.css'
import '@radix-ui/themes/styles.css'
import { Theme } from '@radix-ui/themes'
import { PageHeader } from '@/components/Header'

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
