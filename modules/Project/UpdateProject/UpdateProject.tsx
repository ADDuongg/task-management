import React from 'react'

import { Modal } from 'antd'

import { ProjectForm } from '../ProjectForm'
import { ActionData, ProjectInterface } from '@/types'

interface ModalUpdateProjectProps {
  open: boolean
  onCancel: () => void
  updateProject: ProjectInterface
}

export const ModalUpdateProject: React.FC<ModalUpdateProjectProps> = ({
  open,
  onCancel,
  updateProject,
}) => {
  return (
    <Modal open={open} onCancel={onCancel} footer={false}>
      <ProjectForm action={ActionData.UPDATE} updateData={updateProject} />
    </Modal>
  )
}
