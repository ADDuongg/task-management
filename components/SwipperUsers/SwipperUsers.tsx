'use client'

import React from 'react'

import 'swiper/css'
import 'swiper/css/navigation'
import { SwiperSlide } from 'swiper/react'

import { SwipperWrapper } from '../SwipperWrapper'
import { UserCard } from '../UserCard'
import { UserCardLoading } from './components'
import { useListOfUserManagement } from '@/hooks/useUserManagement'

interface SwipperUsersProps {}

export const SwipperUsers: React.FC<SwipperUsersProps> = () => {
  const { listOfUserManagement, isLoading } = useListOfUserManagement({})
  return (
    <>
      {/* <button className="dark:text-white" onClick={() => setTheme('light')}>
        Light Mode
      </button>
      <button className="dark:text-white" onClick={() => setTheme('dark')}>
        Dark Mode
      </button> */}
      <SwipperWrapper>
        {isLoading
          ? Array.from({ length: 4 }, (_, index) => (
              <SwiperSlide
                key={index}
                className="h-full lg:w-[30%] w-[80%] space-y-3"
              >
                <UserCardLoading />
              </SwiperSlide>
            ))
          : listOfUserManagement?.map((item, index) => (
              <SwiperSlide
                key={index}
                className="h-full lg:w-[30%] w-[80%] space-y-3"
              >
                <UserCard user={item} detailUser={false} />
              </SwiperSlide>
            ))}
      </SwipperWrapper>
    </>
  )
}
