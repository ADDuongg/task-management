import React from 'react'

import { Tabs } from 'antd'

import { Logtime, ProjectGrid } from './components'

const items = [
  {
    key: '1',
    label: 'Project',
    children: <ProjectGrid />,
  },
  {
    key: '2',
    label: 'Logtime',
    children: <Logtime />,
  },
]
const Project = () => {
  return (
    <div className="px-3">
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  )
}

export default Project
