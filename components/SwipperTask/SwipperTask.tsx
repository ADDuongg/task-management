'use client'

import React from 'react'

import 'swiper/css'
import 'swiper/css/navigation'
import { SwiperSlide } from 'swiper/react'

import { SwipperWrapper } from '../SwipperWrapper'
import { TaskCard } from '../TaskCard'
import { TaskCardLoading } from './components'
import { useListOfTaskManagement } from '@/hooks/useTaskManagement'

interface SwipperTaskProps {
  /* data: [] */
}

export const SwipperTask: React.FC<
  SwipperTaskProps
> = (/* { data = [] } */) => {
  const { listOfTaskManagement, isLoading } = useListOfTaskManagement({
    isPagination: false,
  })
  return (
    <SwipperWrapper>
      {/* {listOfTaskManagement?.map((item, index) => (
        <Suspense fallback={<TaskCardLoading />}>
          <SwiperSlide
            key={index}
            className="h-full lg:w-[40%] w-[80%] space-y-3 dark:bg-blackSmall-100 rounded-lg bg-white"
          >
            <TaskCard task={item} />
          </SwiperSlide>
        </Suspense>
      ))} */}
      {isLoading
        ? Array.from({ length: 4 }, (_, index) => (
            <SwiperSlide
              key={index}
              className="h-full lg:w-[40%] w-[80%] space-y-3"
            >
              <TaskCardLoading />
            </SwiperSlide>
          ))
        : listOfTaskManagement?.map((item, index) => (
            <SwiperSlide
              key={index}
              className="h-full lg:w-[40%] w-[80%] space-y-3 dark:bg-blackSmall-100 rounded-lg bg-white"
            >
              <TaskCard task={item} />
            </SwiperSlide>
          ))}
    </SwipperWrapper>
  )
}
