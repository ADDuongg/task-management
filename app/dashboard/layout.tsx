import React from 'react'

import Header from '@/components/Header/Header'
import Sidebar from '@/components/Sidebar/Sidebar'
import SubHeader from '@/components/SubHeader/SubHeader'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <SubHeader />
        {children}
      </div>
    </div>
  )
}
