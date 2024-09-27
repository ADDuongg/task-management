'use client'

import React from 'react'

import { useAtomValue } from 'jotai'

import { SwipperUsers, Typography } from '@/components'
import { UserCard } from '@/components/UserCard'
import { dataUsers } from '@/state/users'

const MembersManagement = () => {
  const users = useAtomValue(dataUsers)

  return (
    <>
      <div className="space-y-5">
        <Typography text="Recent Mentors" fontWeight={true} />
        <SwipperUsers data={users} />
      </div>

      <div className="space-y-5">
        <Typography text="Members" fontWeight={true} />
        <div className="grid xxl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 auto-rows-auto gap-4">
          {users.map((item, index) => (
            <UserCard user={item} key={index} />
          ))}
        </div>
      </div>
    </>
  )
}

export default MembersManagement
