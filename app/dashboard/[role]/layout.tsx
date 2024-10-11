'use client'

import React, { useEffect, useState } from 'react'

import { useAtom, useSetAtom } from 'jotai'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

import { Header, Sidebar } from '@/components'
import { userServices } from '@/services/user'
import { currentUserState, userRoleState } from '@/states/users'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [currentUser, setCurrentUser] = useAtom(currentUserState)
  const setRole = useSetAtom(userRoleState)
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!currentUser) {
        const user = await userServices.getCurrentUser()
        if (user) {
          setCurrentUser(user)
          setRole(user.account_role)
        } else {
          router.push('/login')
        }
      }
      setLoading(false)
    }

    fetchCurrentUser()
  }, [currentUser, router, setCurrentUser, setRole])

  if (loading) {
    return <div>Loading...</div>
  }

  const shouldShowHeader =
    pathname !== `/dashboard/${currentUser?.account_role}`

  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="w-[calc(100%-300px)] flex-1">
        {shouldShowHeader && <Header />}
        <div
          style={{
            height: shouldShowHeader ? 'calc(100vh - 112px)' : '100vh',
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
