'use client'

import React from 'react'

import { usePathname } from 'next/navigation'

import { Header, Sidebar, SubHeader } from '@/components'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="w-[calc(100%-300px)] flex-1">
        {pathname !== '/dashboard' && <Header />}
        {pathname !== '/dashboard' && <SubHeader />}
        <div
          style={{
            height: pathname !== '/dashboard' ? 'calc(100vh - 193px)' : '100vh',
            backgroundColor: 'var(--color-graySmall-200)',
            width: '100%',
            overflowY: 'auto',
          }}
          className="sm:px-8 px-4"
        >
          {children}
        </div>
      </div>
    </div>
  )
}
