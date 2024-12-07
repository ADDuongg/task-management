import React from 'react'

import { Progress } from 'antd'

import { Typography } from '@/components/Typography'

export const RunningTask = () => {
  return (
    <div className="w-full h-full bg-blackSmall-100 rounded-lg p-5 space-y-3 flex sm:flex-col flex-row justify-evenly">
      <div>
        <Typography text="Running Task" classNameText="text-white" />
        <Typography text="65" level={2} classNameText="text-white" />
      </div>
      <div className="flex gap-x-5">
        <Progress
          percent={50}
          type="circle"
          size={'small'}
          className="custom-progress"
          trailColor="white"
        />
        <div className="flex flex-col">
          <Typography text="100" classNameText="text-white" />
          <Typography text="Task" classNameText="text-white" />
        </div>
      </div>
    </div>
  )
}
