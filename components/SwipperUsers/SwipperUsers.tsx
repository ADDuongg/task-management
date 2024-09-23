import React from 'react'

import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/navigation'
import { SwiperSlide } from 'swiper/react'

import { SwipperWrapper } from '../SwipperWrapper'
import { Typography } from '../Typography'
import { UsersInterface } from '@/types'

interface SwipperUsersProps {
  data: UsersInterface[]
  height?: string
}

export const SwipperUsers: React.FC<SwipperUsersProps> = ({ data }) => {
  return (
    <SwipperWrapper>
      {data.map((item, index) => (
        <SwiperSlide
          key={index}
          className="h-full w-[80%] bg-white p-7 space-y-3 rounded-lg"
        >
          <div className="flex items-start gap-x-5">
            <Image src={item.avatar} className="w-12 h-12" alt="" />
            <div className="flex justify-between w-full">
              <div className="flex flex-col">
                <Typography text={`${item.name}`} />
                <Typography
                  level={5}
                  text={`${item.position}`}
                  color="purpleSmall-200"
                />
              </div>
              <Typography level={5} text="+ Follow" color="blueSmall-100" />
            </div>
          </div>

          <Typography
            text={`${item.description}`}
            level={5}
            color="purpleSmall-100"
          />
        </SwiperSlide>
      ))}
    </SwipperWrapper>
  )
}
