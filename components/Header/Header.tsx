'use client'

import React from 'react'

import { BarsOutlined } from '@ant-design/icons'
import { useSetAtom } from 'jotai'

import Icon from '../Icon/Icon'
import { showSidebarState } from '@/state/commons'

const Header = () => {
  const setShowSidebar = useSetAtom(showSidebarState)
  return (
    <div className="flex">
      <div
        onClick={() => setShowSidebar((prev) => !prev)}
        className="xs:block lg:hidden rounded-full p-2 hover:bg-purpleSmall-100 hover:text-white text-center w-14 h-14 cursor-pointer border border-l-purpleSmall-100"
      >
        <Icon IconComponent={BarsOutlined} size={30} />
      </div>
      header
    </div>
  )
}

export default Header
