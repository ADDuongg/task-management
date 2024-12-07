import React from 'react'

import { Calendar } from 'antd'

import ChartComponent from '../components/ChartDashboard'
import {
  DetailTaskCard,
  Header,
  SwipperTask,
  SwipperUsers,
  Typography,
} from '@/components'

const App = async () => {
  return (
    <div className="flex xl:flex-row flex-col justify-between h-full xl:space-y-0 space-y-5">
      <div className="xl:w-[calc(100%-450px)] w-full xl:h-full h-auto dark:bg-black bg-graySmall-100">
        <Header bg="graySmall-100" />
        <ChartComponent />

        <div className="dark:bg-black px-3 bg-graySmall-100 ">
          <Typography text="Mentors" fontWeight={true} />
          <SwipperUsers />

          <Typography
            className="py-3"
            text="Upcoming tasks"
            fontWeight={true}
          />
          <SwipperTask />
        </div>
      </div>

      <div className="xl:w-[450px] w-full dark:bg-black bg-graySmall-100 xl:ps-5 space-y-5 xl:h-full h-auto px-3">
        <Calendar fullscreen={false} />
        <DetailTaskCard />
      </div>
    </div>
  )
}

export default App
