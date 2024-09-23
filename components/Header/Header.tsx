'use client'

import React from 'react'

import { BarsOutlined, BellOutlined } from '@ant-design/icons'
import { Avatar, Badge } from 'antd'
import { useSetAtom } from 'jotai'
import { usePathname } from 'next/navigation'

import { Icon } from '../Icon/Icon'
import useMetaData from '@/hooks/useMetaData'
import { showSidebarState } from '@/state/commons'

interface HeaderProps {
  bg?: string
}

export const Header: React.FC<HeaderProps> = ({ bg = 'white' }) => {
  const { description } = useMetaData()
  const setShowSidebar = useSetAtom(showSidebarState)
  const pathname = usePathname()
  return (
    <div
      className={`flex justify-between ${pathname !== '/dashboard' && 'p-8'} w-full bg-${bg} `}
    >
      <div className="flex gap-x-5 items-center">
        <div
          onClick={() => setShowSidebar((prev) => !prev)}
          className="xs:block lg:hidden rounded-full p-2 hover:bg-purpleSmall-100 hover:text-white text-center w-14 h-14 cursor-pointer border border-l-purpleSmall-100"
        >
          <Icon IconComponent={BarsOutlined} size={30} />
        </div>
        <div>
          <div className="sm:text-2xl text-lg font-bold mt-auto">
            {description}
          </div>
          {pathname === '/dashboard' && <div>Lets finish your task today!</div>}
        </div>
      </div>
      <div className="flex justify-between items-center gap-x-8">
        <Badge count={2} className="cursor-pointer hover:shadow-lg">
          <Icon IconComponent={BellOutlined} size={24} />
        </Badge>
        <Avatar
          src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
          className="cursor-pointer hover:shadow-lg"
          size={48}
        />
      </div>
    </div>
  )
}
