import React from 'react'

import { Modal } from 'antd'

import { ProjectForm } from '../ProjectForm'
import { ActionData, ProjectInterface } from '@/types'

interface ModalViewProjectProps {
  open: boolean
  onCancel: () => void
  updateProject: ProjectInterface
}

export const ModalViewProject: React.FC<ModalViewProjectProps> = ({
  open,
  onCancel,
  updateProject,
}) => {
  return (
    <Modal open={open} onCancel={onCancel} footer={false}>
      <ProjectForm action={ActionData.VIEW} updateData={updateProject} />
    </Modal>
  )
}
