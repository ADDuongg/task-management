'use client'

import React from 'react'

import { Drawer } from 'antd'
import { useAtom, useAtomValue } from 'jotai'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { HelpCenter } from '../HelpCenter/HelpCenter'
import { Icon } from '../Icon/Icon'
import { menuItems } from '@/constants/sidebar'
import { showSidebarState } from '@/states/commons'
import { userRoleState } from '@/states/users'
import { RoleEnum } from '@/types'

const MenuContent: React.FC<{ pathname: string; role?: string }> = ({
  pathname,
  role,
}) => (
  <>
    <div>
      <div className="flex gap-x-5 font-bold text-2xl items-center mb-16">
        <Icon color="#546FFF" IconComponent={menuItems[1].icon} /> TaskMng
      </div>
      <div className="space-y-5 max-h-[calc(100vh-300px)] overflow-y-auto">
        {menuItems.map((item, index) => {
          const isActiveItem = pathname === item.key
          const path = `/dashboard/${role}`

          const href = item.key === 'dashboard' ? path : `${path}/${item.key}`

          return (
            <Link
              href={href}
              key={index}
              className={`flex p-4 gap-x-4 items-center text-xl cursor-pointer rounded-xl ${
                isActiveItem
                  ? 'bg-graySmall-100 font-bold text-black'
                  : 'text-purpleSmall-100'
              }`}
            >
              <Icon IconComponent={item.icon} />
              {item.label}
            </Link>
          )
        })}
      </div>
    </div>
    <HelpCenter />
  </>
)

export const Sidebar = () => {
  const pathname = usePathname()
  const [showSidebar, setShowSidebar] = useAtom(showSidebarState)
  const role = useAtomValue(userRoleState)

  return (
    <>
      <div className="xs:hidden lg:w-[300px] h-screen px-8 py-5 lg:flex flex-col justify-between gap-y-10 overflow-y-auto ">
        <MenuContent pathname={pathname} role={role} />
      </div>

      <Drawer
        open={showSidebar}
        onClose={() => setShowSidebar(false)}
        placement="left"
      >
        <div className="h-full px-8 py-5 flex flex-col justify-between gap-y-10 overflow-y-auto">
          <MenuContent pathname={pathname} role={role} />
        </div>
      </Drawer>
    </>
  )
}
