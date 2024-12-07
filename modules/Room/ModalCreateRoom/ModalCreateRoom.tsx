import React from 'react'

import { Modal } from 'antd'

import { useRoomMessage } from '@/hooks/useRoomManagement'
import { RoomForm } from '@/modules/Room/RoomForm'
import { ActionData } from '@/types'

export const ModalCreateRoom = ({
  openModal,
  setOpenModal,
  action,
}: {
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  action: ActionData
}) => {
  const onClose = () => setOpenModal(false)
  const { form, onSubmit, isPending } = useRoomMessage(action, onClose)
  return (
    <div>
      <Modal
        title={`${action.toUpperCase()} Room`}
        open={openModal}
        onCancel={onClose}
        centered
        footer={null}
      >
        <RoomForm
          action={action}
          onSubmit={onSubmit}
          form={form}
          isPending={isPending}
        />
      </Modal>
    </div>
  )
}
