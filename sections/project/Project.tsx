import React from 'react'

import ProjectGrid from './components/ProjectGrid'
import { Typography } from '@/components'

const Project = () => {
  return (
    <div className="px-3">
      <Typography text="Project Management" fontWeight={true} />
      <ProjectGrid />
    </div>
  )
}

export default Project
