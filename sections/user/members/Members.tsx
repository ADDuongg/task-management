'use client'

import { useState } from 'react'

import { Pagination } from 'antd'

import { SwipperUsers, Typography } from '@/components'
import { UserCard } from '@/components/UserCard'
import { useListOfUserManagement } from '@/hooks/useUserManagement'

export const UserMembersManagement = () => {
  const [page, setPage] = useState<number>(1)
  const { listOfUserManagement: userNoPagination } = useListOfUserManagement({
    isPagination: false,
  })
  const { listOfUserManagement, pagination } = useListOfUserManagement({
    page,
    limit: 2,
  })
  const { pageSize = 2, totalRecords = 2 } = pagination || {}

  return (
    <>
      <div className="space-y-5">
        <Typography text="Recent Mentors" fontWeight={true} />
        <SwipperUsers />
      </div>

      <div className="space-y-5">
        <Typography text="Members" fontWeight={true} />
        <div className="grid xxl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 auto-rows-auto gap-4 space-y-0">
          {listOfUserManagement.map((item, index) => (
            <UserCard user={item} key={index} />
          ))}
        </div>
        <div className="flex !justify-end mt-4">
          <Pagination
            current={page}
            pageSize={pageSize}
            total={totalRecords}
            onChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </>
  )
}
