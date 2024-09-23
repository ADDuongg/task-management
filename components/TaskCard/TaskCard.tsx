import React from 'react'

import {
  AntDesignOutlined,
  ClockCircleOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Progress, Tooltip } from 'antd'
import Image from 'next/image'

import { Icon } from '../Icon'
import { Typography } from '../Typography'
import { TaskInterface } from '@/types'
import { calculateRemainingTime } from '@/utils/commons'

interface TaskCardProps {
  task: TaskInterface
  detailTask?: boolean
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  detailTask = false,
}) => {
  return (
    <div className="p-5 space-y-2">
      <div className="h-44 !flex flex-col items-start">
        <Image src={task.img} className="w-full h-full" alt="" />
      </div>
      <div className="flex justify-between items-center w-full">
        <div className="font-bold text-lg">{task.name}</div>
        <div>
          status: <span className="font-bold">{task.status}</span>
        </div>
      </div>
      <div className="flex flex-col justify-between w-full">
        <div className="flex items-center gap-x-3">
          <Typography text="Progress:" fontWeight={true} />
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

        <Avatar.Group>
          <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
          <a href="https://ant.design">
            <Avatar
              style={{
                backgroundColor: '#f56a00',
              }}
            >
              K
            </Avatar>
          </a>
          <Tooltip title="Ant User" placement="top">
            <Avatar
              style={{
                backgroundColor: '#87d068',
              }}
              icon={<UserOutlined />}
            />
          </Tooltip>
          <Avatar
            style={{
              backgroundColor: '#1677ff',
            }}
            icon={<AntDesignOutlined />}
          />
        </Avatar.Group>
      </div>

      {detailTask && (
        <div>
          <hr className="my-6" />
          <div className="flex justify-between">
            <Typography text="Detail Task" fontWeight={true} />
            <Typography
              text="UI/UX Designer"
              color="purpleSmall-200"
              level={5}
            />
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

          <Button className="mt-5 w-full p-5">Go To Detail</Button>
        </div>
      )}
    </div>
  )
}
