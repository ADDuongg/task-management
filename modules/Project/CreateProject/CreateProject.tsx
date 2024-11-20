import React from 'react'

import { Modal } from 'antd'

import { ProjectForm } from '../ProjectForm'
import { ActionData } from '@/types'

interface ModalCreateProjectProps {
  open: boolean
  onCancel: () => void
}

export const ModalCreateProject: React.FC<ModalCreateProjectProps> = ({
  open,
  onCancel,
}) => {
  return (
    <Modal open={open} onCancel={onCancel} footer={false}>
      <ProjectForm action={ActionData.CREATE} />
    </Modal>
  )
}
