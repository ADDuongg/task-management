'use client'

import React from 'react'

import { Avatar, Progress } from 'antd'

export const TaskCardLoading: React.FC = ({}) => {
  return (
    <div className="p-5 space-y-2 dark:bg-blackSmall-100 rounded-lg">
      <div className="h-44 !flex flex-col items-start">
        <div className="w-full h-full rounded-lg bg-gray-500"></div>
      </div>
      <div className="flex justify-between items-center w-full">
        <div className="w-20 h-2 bg-gray-400 rounded-lg"></div>
        <div className="w-10 h-2 bg-gray-400 rounded-lg"></div>
      </div>
      <div className="flex flex-col justify-between w-full">
        <div className="flex items-center gap-x-3">
          <div className="w-20 h-2 bg-gray-400 rounded-lg"></div>
          <div className="w-5 h-2 bg-gray-400 rounded-lg"></div>
        </div>
        <Progress className="w-full dark:text-white" showInfo={false} />
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex justify-between items-center gap-x-3">
          <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
          <div className="w-20 h-2 bg-gray-400 rounded-lg"></div>
        </div>

        <Avatar.Group>
          <div className="bg-gray-500 w-7 h-7 flex justify-center items-center rounded-full border"></div>
          <div className="bg-gray-500 w-7 h-7 flex justify-center items-center rounded-full border"></div>
          <div className="bg-gray-500 w-7 h-7 flex justify-center items-center rounded-full border"></div>
          <div className="bg-gray-500 w-7 h-7 flex justify-center items-center rounded-full border"></div>
        </Avatar.Group>
      </div>
    </div>
  )
}
