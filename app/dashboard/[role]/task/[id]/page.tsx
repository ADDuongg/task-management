/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React from 'react'

import { InboxOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import Dragger from 'antd/es/upload/Dragger'
import { useAtomValue } from 'jotai'

import { Icon, Typography } from '@/components'
import { DetailTaskCard } from '@/components/DetailTaskCard'
import { dataTask } from '@/states/task'

/* eslint-disable @typescript-eslint/no-unused-vars */

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
  return <div>sss</div>
}

export default DetailTaskPage
