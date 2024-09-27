import React from 'react'

import 'swiper/css'
import 'swiper/css/navigation'
import { SwiperSlide } from 'swiper/react'

import { SwipperWrapper } from '../SwipperWrapper'
import { UserCard } from '../UserCard'
import { UsersInterface } from '@/types'

interface SwipperUsersProps {
  data: UsersInterface[]
}

export const SwipperUsers: React.FC<SwipperUsersProps> = ({ data }) => {
  return (
    <SwipperWrapper>
      {data.map((item, index) => (
        <SwiperSlide key={index} className="h-full w-[80%] space-y-3">
          <UserCard user={item} detailUser={false} />
        </SwiperSlide>
      ))}
    </SwipperWrapper>
  )
}
