'use client'

import React from 'react'

import {
  BarsOutlined,
  BellOutlined,
  LogoutOutlined,
  MoonOutlined,
  SettingOutlined,
  SunOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar, Badge, Dropdown } from 'antd'
import { useAtomValue, useSetAtom } from 'jotai'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { Icon } from '../Icon/Icon'
import useMetaData from '@/hooks/useMetaData'
import { logoutUser } from '@/services'
import { showSidebarState } from '@/states/commons'
import { currentUserState } from '@/states/users'

interface HeaderProps {
  bg?: string
}

export const Header: React.FC<HeaderProps> = ({ bg = 'white' }) => {
  const { description } = useMetaData()
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const setShowSidebar = useSetAtom(showSidebarState)
  const user = useAtomValue(currentUserState)
  const pathname = usePathname()
  const handleLogout = async () => {
    logoutUser()
    router.push('/login')
  }
  const items = [
    {
      key: '1',
      label: (
        <Link
          href={`/dashboard/${user?.account_role}/profile/${user?._id}`}
          className="flex gap-x-3 "
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
          className="flex gap-x-3 "
        >
          <Icon size={16} IconComponent={SettingOutlined} />
          Setting
        </Link>
      ),
    },
    {
      key: '3',
      label: (
        <button
          onClick={handleLogout}
          rel="noopener noreferrer"
          className="flex gap-x-3 !text-red-400"
        >
          <Icon size={16} IconComponent={LogoutOutlined} />
          Logout
        </button>
      ),
    },
    {
      key: '4',
      label: (
        <button
          onClick={(e) => {
            e.preventDefault()
            setTheme(theme === 'dark' ? 'light' : 'dark')
          }}
          className="flex gap-x-3 text-gray-800 dark:text-white"
        >
          {theme === 'dark' ? (
            <Icon size={16} IconComponent={SunOutlined} />
          ) : (
            <Icon size={16} IconComponent={MoonOutlined} />
          )}
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
      ),
    },
  ]

  return (
    <div
      className={`flex justify-between ${pathname !== '/dashboard' && 'p-3'} w-full bg-${bg} dark:bg-black `}
    >
      <div className="flex gap-x-5 items-center">
        <div
          onClick={() => setShowSidebar((prev) => !prev)}
          className="dark:text-white xs:block lg:hidden rounded-full p-2 hover:bg-purpleSmall-100 hover:text-white text-center w-14 h-14 cursor-pointer border border-l-purpleSmall-100"
        >
          <Icon IconComponent={BarsOutlined} size={30} />
        </div>
        <div>
          <div className="sm:text-2xl text-lg font-bold mt-auto dark:text-white">
            {description}
          </div>
          {pathname === '/dashboard' && <div>Lets finish your task today!</div>}
        </div>
      </div>
      <div className="flex justify-between items-center gap-x-8">
        <Badge
          count={2}
          className="cursor-pointer hover:shadow-lg dark:text-white"
        >
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
