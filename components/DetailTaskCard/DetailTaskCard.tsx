import React from 'react'

import { ClockCircleOutlined } from '@ant-design/icons'
import { Progress } from 'antd'
import Image from 'next/image'

import { Icon } from '../Icon'
import { Typography } from '../Typography'
import { TaskInterface } from '@/types'
import { calculateRemainingTime } from '@/utils/commons'

interface TaskCardProps {
  task: TaskInterface
  detailTask?: boolean
}
export const DetailTaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <div className="space-y-2 rounded-lg  overflow-hidden">
      <div className="h-96 !flex flex-col items-start">
        <Image src={task.files[0]} className="w-full h-full" alt="" />
      </div>
      <div className="flex justify-between items-center w-full">
        <Typography text={task.subject} level={3} fontWeight={true} />
        <div className="flex items-center gap-x-3">
          <Typography text="Status:" fontWeight={true} level={3} />
          <Typography text={task.status} />
        </div>
      </div>
      <div className="flex flex-col justify-between w-full">
        <div className="flex items-center gap-x-3">
          <Typography text="Progress:" fontWeight={true} level={3} />
          <Typography text={task.done} color="blueSmall-100" />
        </div>
        <Progress
          percent={Number(task.done.replace('%', ''))}
          className="w-full"
          showInfo={false}
        />
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex justify-between items-center gap-x-3">
          <Icon IconComponent={ClockCircleOutlined} size={20} />
          <span className="font-bold text-xl">
            {calculateRemainingTime(task.startDate, task.dueDate)} day left
          </span>
        </div>
      </div>

      <div>
        <hr className="my-6" />
        <Typography text="Description" level={3} fontWeight={true} />

        <div className="space-y-4 mt-4">
          <Typography text={task.description} level={5} />
        </div>
        <div className="flex justify-between">
          <Typography text="Work to do" fontWeight={true} level={3} />
          <Typography text="UI/UX Designer" color="purpleSmall-200" level={5} />
        </div>

        <div className="space-y-4 mt-4">
          {task.workToDo?.map((item, index) => (
            <div
              className="flex justify-start items-center gap-x-4"
              key={index}
            >
              <div className="bg-graySmall-100 w-9 h-9 flex justify-center items-center rounded-lg">
                {index + 1}
              </div>
              <div>
                <Typography text={item} level={5} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
