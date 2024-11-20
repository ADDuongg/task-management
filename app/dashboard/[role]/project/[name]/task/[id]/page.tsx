'use client'

import React from 'react'

import { InboxOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import Dragger from 'antd/es/upload/Dragger'
import { useAtomValue } from 'jotai'

import { Icon, Typography } from '@/components'
import { DetailTaskCard } from '@/components/DetailTaskCard'
import { dataTask } from '@/states/task'

const DetailTaskPage = () => {
  const tasks = useAtomValue(dataTask)
  const props = {
    name: 'file',
    multiple: true,
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onDrop() {
      console.log('Dropped files')
    },
  }
  return (
    <div className="flex xl:flex-row flex-col justify-between h-full overflow-y-auto xl:gap-y-0 gap-y-5 gap-x-8">
      <div className="xl:w-[calc(100%-450px)] w-full space-y-5 h-auto">
        <DetailTaskCard task={tasks[0]} detailTask={true} />
      </div>

      <div className="xl:w-[550px] w-full bg-whiteSmall-100 rounded-lg xl:h-full h-auto p-5 space-y-4">
        <Typography text="Assigned Assignments" />
        <Typography text={tasks[0].subject} level={3} fontWeight={true} />
        <div className="flex gap-x-4">
          <div className="flex gap-x-3 items-center">
            <Typography text="Task owner:" level={3} fontWeight={true} />
            <Typography text={tasks[0].taskOwner} fontWeight={true} />
          </div>
          <div className="flex gap-x-3 items-center">
            <Typography text="Assign to:" level={3} fontWeight={true} />
            <Typography text={tasks[0].assignTo} fontWeight={true} />
          </div>
        </div>

        <Dragger {...props} className="!h-96 block">
          <Icon IconComponent={InboxOutlined} color="blueSmall-100" />
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Dragger>
        <Button className="w-full">Submit</Button>
      </div>
    </div>
  )
}

export default DetailTaskPage
