import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import ClientProviders from '@/components/ClientProviders'

export const metadata: Metadata = {
  title: {
    template: '%s | Globalsoft',
    default: 'Globalsoft',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  )
}
