'use client'

import React from 'react'

import 'swiper/css'
import 'swiper/css/navigation'
import { SwiperSlide } from 'swiper/react'

import { SwipperWrapper } from '../SwipperWrapper'
import { TaskCard } from '../TaskCard'
import { TaskInterface } from '@/types'

interface SwipperTaskProps {
  data: TaskInterface[]
}

export const SwipperTask: React.FC<SwipperTaskProps> = ({ data }) => {
  return (
    <SwipperWrapper>
      {data.map((item, index) => (
        <SwiperSlide
          key={index}
          className="h-full w-[80%] bg-white space-y-3 rounded-lg"
        >
          <TaskCard task={item} />
        </SwiperSlide>
      ))}
    </SwipperWrapper>
  )
}
