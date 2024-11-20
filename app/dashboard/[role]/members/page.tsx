'use client'

import React from 'react'

import { useAtomValue } from 'jotai'

import { AdminMembersManagement } from '@/sections/admin'
import { UserMembersManagement } from '@/sections/user/members/Members'
import { userRoleState } from '@/states/users'
import { RoleEnum } from '@/types'

const MembersManagement = () => {
  const role = useAtomValue(userRoleState)

  return (
    <>
      {role === RoleEnum.ADMIN ? (
        <AdminMembersManagement />
      ) : (
        <UserMembersManagement />
      )}
    </>
  )
}

export default MembersManagement
