'use client'

import React from 'react'

import { Drawer } from 'antd'
import { useAtom } from 'jotai'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { HelpCenter } from '../HelpCenter/HelpCenter'
import { Icon } from '../Icon/Icon'
import { menuItems } from '@/constants/sidebar'
import { showSidebarState } from '@/state/commons'

const MenuContent: React.FC<{ pathname: string }> = ({ pathname }) => (
  <>
    <div>
      <div className="flex gap-x-5 font-bold text-2xl items-center mb-16">
        <Icon color="#546FFF" IconComponent={menuItems[1].icon} /> TaskMng
      </div>
      <div className="space-y-5 max-h-[calc(100vh-300px)] overflow-y-auto">
        {menuItems.map((item, index) => {
          const isActiveItem = pathname === item.path

          return (
            <Link
              href={item.path}
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

  return (
    <>
      <div className="xs:hidden lg:w-[350px] h-screen px-8 py-5 lg:flex flex-col justify-between gap-y-10 overflow-y-auto ">
        <MenuContent pathname={pathname} />
      </div>

      <Drawer
        open={showSidebar}
        onClose={() => setShowSidebar(false)}
        placement="left"
      >
        <div className="h-full px-8 py-5 flex flex-col justify-between gap-y-10 overflow-y-auto">
          <MenuContent pathname={pathname} />
        </div>
      </Drawer>
    </>
  )
}
