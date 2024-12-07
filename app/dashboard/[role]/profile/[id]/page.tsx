import React from 'react'

import { cookies } from 'next/headers'

import { dbConnect, getAllUsers } from '@/lib'
import { UserModel } from '@/model'
import { Profile } from '@/sections/profile'

export const revalidate = 60
export async function generateStaticParams() {
  const roles = ['admin', 'manager', 'user']
  try {
    await dbConnect()
    const users = await UserModel.find({}, '_id')
    if (!users) {
      return []
    }
    const paths = roles.flatMap((role) =>
      users.map((user: any) => ({
        role,
        id: user._id.toString(),
      })),
    )
    return paths
  } catch (error) {
    console.error('Error fetching users in generateStaticParams:', error)
    return []
  }
}

// Render trang
const Page = async ({ params }: { params: { id: string } }) => {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value

  const data = await fetch(`http://localhost:3000/api/user?id=${params.id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    next: { revalidate: 60 },
  })
  const response = await data.json()

  if (!response.user) {
    return <div>Không tìm thấy người dùng</div>
  }

  return (
    <div className="p-3">
      <Profile profile={response.user} />
    </div>
  )
}

export default Page
