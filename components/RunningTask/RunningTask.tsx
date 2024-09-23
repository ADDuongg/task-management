import React from 'react'

import { Progress } from 'antd'

import { Typography } from '@/components/Typography'

export const RunningTask = () => {
  return (
    <div className="text-white w-full h-full bg-blackSmall-100 rounded-lg p-5 space-y-3 flex sm:flex-col flex-row justify-evenly">
      <div>
        <Typography text="Running Task" color="whiteSmall-100" />
        <Typography text="65" level={2} color="whiteSmall-100" />
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
          <Typography text="100" color="whiteSmall-100" />
          <Typography text="Task" color="purpleSmall-100" />
        </div>
      </div>
    </div>
  )
}
