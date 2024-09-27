'use client'

import React from 'react'

import { useAtomValue } from 'jotai'

import { SwipperTask, Typography } from '@/components'
import { dataTask } from '@/state/task'

const TaskManagement = () => {
  const tasks = useAtomValue(dataTask)
  return (
    <>
      <div>
        <Typography text="Time Limit" fontWeight={true} />
        <SwipperTask data={tasks} />
      </div>
      <div className="space-y-5">
        <Typography text="New Tasks" fontWeight={true} />
        <SwipperTask data={tasks} />
      </div>
    </>
  )
}

export default TaskManagement
