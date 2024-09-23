'use client'

import React from 'react'

import { useAtomValue } from 'jotai'

import { SwipperTask, Typography } from '@/components'
import { dataTask } from '@/state/task'

const TaskManagement = () => {
  const tasks = useAtomValue(dataTask)
  return (
    <div className="w-full h-[400px] py-20 space-y-20">
      <div>
        <Typography text="Time Limit" fontWeight={true} />
        <SwipperTask data={tasks} />
      </div>
    </div>
  )
}

export default TaskManagement
