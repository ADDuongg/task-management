import React from 'react'

import { Modal } from 'antd'

import { ProjectInterface } from '@/types'

interface ModalViewLogtimeProps {
  open: boolean
  onCancel: () => void
}

export const ModalViewLogtime: React.FC<ModalViewLogtimeProps> = ({
  open,
  onCancel,
}) => {
  return (
    <Modal open={open} onCancel={onCancel} footer={false} centered>
      test đasa dsadsad ádads
    </Modal>
  )
}
