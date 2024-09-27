import React from 'react'

import Image from 'next/image'

import { Typography } from '../Typography'
import { UsersInterface } from '@/types'

interface UserCardProps {
  user: UsersInterface
  detailUser?: boolean
}

export const UserCard: React.FC<UserCardProps> = ({
  user,
  detailUser = true,
}) => {
  return (
    <div className="w-full p-5 bg-white rounded-lg">
      <div className="flex items-start gap-x-5">
        <Image src={user.avatar} className="w-12 h-12" alt="" />
        <div className="flex justify-between w-full">
          <div className="flex flex-col w-auto">
            <Typography text={`${user.name}`} />
            <Typography
              level={5}
              text={`${user.position}`}
              color="purpleSmall-200"
            />
          </div>
          <Typography level={5} text="+Follow" color="blueSmall-100" />
        </div>
      </div>

      {detailUser && (
        <Typography
          text={`${user.description}`}
          level={5}
          color="purpleSmall-100"
        />
      )}
    </div>
  )
}
