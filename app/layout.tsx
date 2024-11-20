import type { Metadata } from 'next'

import Provider from '@/utils/Providers'

import '../globals.css'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="overflow-hidden">
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
