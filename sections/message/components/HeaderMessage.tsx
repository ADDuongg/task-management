import React from 'react'

import {
  ArrowLeftOutlined,
  EllipsisOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar } from 'antd'

import { Icon } from '@/components'
import { UsersInterface } from '@/types'

export const HeaderMessage = ({
  userChat,
  isMobileView,
  showMsgState,
  setIsMobileView,
  setShowMsgState,
}: {
  userChat?: UsersInterface | string
  isMobileView: boolean
  showMsgState: boolean
  setIsMobileView: React.Dispatch<React.SetStateAction<boolean>>
  setShowMsgState: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  return (
    <div className="h-16 shadow-md p-3 flex justify-between ">
      <div className="flex items-center gap-x-3">
        {showMsgState && (
          <div
            onClick={() => {
              setShowMsgState(false)
            }}
            className="rounded-full p-5 hover:bg-gray-50 flex dark:bg-white justify-center items-center h-8 w-8 cursor-pointer"
          >
            <Icon IconComponent={ArrowLeftOutlined} className="text-xl " />
          </div>
        )}
        <Avatar
          size={40}
          src={
            typeof userChat !== 'string' && userChat?.avatar
              ? userChat?.avatar
              : 'https://th.bing.com/th?q=Logo+Message+Group&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.1&pid=InlineBlock&mkt=en-WW&cc=VN&setlang=en&adlt=moderate&t=1&mw=247'
          }
          icon={typeof userChat === 'string' ? <UserOutlined /> : undefined}
        />
        <div className="flex flex-col h-full flex-1 justify-between">
          <span className="text-md font-bold dark:text-white">
            {typeof userChat === 'string' ? userChat : userChat?.username}
          </span>
          <div className="flex items-center gap-x-2">
            <span
              className="text-xs truncate dark:text-white"
              style={{ flex: 7 }}
            >
              Active 10 mins ago
            </span>
          </div>
        </div>
      </div>
      <div className="rounded-full p-5 hover:bg-gray-50 flex justify-center items-center h-8 w-8 cursor-pointer dark:bg-white">
        <Icon IconComponent={EllipsisOutlined} className="text-xl " />
      </div>
    </div>
  )
}
