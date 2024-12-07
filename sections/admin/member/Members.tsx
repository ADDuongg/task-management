import React from 'react'

import TableUser from './components/TableUser'
import { Typography } from '@/components'

export const AdminMembersManagement = () => {
  return (
    <div className="p-3">
      <Typography text="User Management" fontWeight={true} />
      <TableUser />
    </div>
  )
}
