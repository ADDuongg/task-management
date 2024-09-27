'use client'

import React from 'react'

import {
  BarsOutlined,
  BellOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar, Badge, Dropdown } from 'antd'
import { useSetAtom } from 'jotai'
import Link from 'next/link'
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
  const items = [
    {
      key: '1',
      label: (
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
          className="flex gap-x-3 !text-blackSmall-100"
        >
          <Icon size={16} IconComponent={UserOutlined} />
          Profile
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
          className="flex gap-x-3 !text-blackSmall-100"
        >
          <Icon size={16} IconComponent={SettingOutlined} />
          Setting
        </Link>
      ),
    },
    {
      key: '3',
      label: (
        <Link
          rel="noopener noreferrer"
          href="login"
          className="flex gap-x-3 !text-red-400"
        >
          <Icon size={16} IconComponent={LogoutOutlined} />
          Logout
        </Link>
      ),
    },
  ]

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
        <Dropdown
          trigger={['click']}
          menu={{
            items,
          }}
          placement="bottomLeft"
        >
          <Avatar
            src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
            className="cursor-pointer hover:shadow-lg"
            size={48}
          />
        </Dropdown>
      </div>
    </div>
  )
}
