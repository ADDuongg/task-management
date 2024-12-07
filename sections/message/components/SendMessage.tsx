import React from 'react'

import { SendOutlined } from '@ant-design/icons'
import { Input } from 'antd'

import { Icon } from '@/components'

export const SendMessage = ({
  roomId,
  setMessage,
  message,
  sendMessage,
}: {
  roomId: string
  setMessage: React.Dispatch<React.SetStateAction<string>>
  message: string
  sendMessage: () => void
}) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-16 p-3 gap-x-1 flex justify-between bg-white shadow-md dark:bg-blackSmall-100">
      <div className="flex gap-x-1 items-center justify-between flex-1">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Aa"
          variant="filled"
          size="large"
        />
        <div
          onClick={sendMessage}
          className="rounded-full p-5 hover:bg-gray-50 hover:dark:bg-black flex justify-center items-center h-8 w-8 cursor-pointer"
        >
          <Icon
            IconComponent={SendOutlined}
            className="text-xl dark:text-white"
          />
        </div>
      </div>
    </div>
  )
}
