import React from 'react'

import { Modal } from 'antd'

import { LogtimeForm, ModalCreateLogtime, ModalEditLogtime } from './components'
import { useLogtime } from '@/hooks/useLogtime'
import { ActionData, LogtimeInterface, TaskInterface } from '@/types'

interface ModalLogtimeProps {
  open: boolean
  onCancel: () => void
  task?: TaskInterface
  action: ActionData
  dataUpdate?: LogtimeInterface
}

export const ModalLogtime: React.FC<ModalLogtimeProps> = ({
  open,
  onCancel,
  task,
  action,
  dataUpdate,
}) => {
  return (
    <Modal open={open} onCancel={onCancel} footer={false} centered>
      {action === ActionData.CREATE && <ModalCreateLogtime task={task} />}
      {action === ActionData.UPDATE && dataUpdate && (
        <ModalEditLogtime dataUpdate={dataUpdate} />
      )}
    </Modal>
  )
}
