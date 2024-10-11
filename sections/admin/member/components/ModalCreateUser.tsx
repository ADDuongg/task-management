'use client'

import React from 'react'

import { Modal } from 'antd'

import UserForm from './UserForm'
import { useCreateUser, useUpdateUser } from '@/hooks/useUserManagement'
import { ActionData } from '@/types'

interface ModalCreateUser {
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  /* action: { type: string; id?: number } */
}

const ModalCreateUser: React.FC<ModalCreateUser> = ({
  openModal,
  setOpenModal,
}) => {
  const handleCancel = () => {
    setOpenModal(false)
  }
  const { control, watch, createUser, errors, setValue, isPending } =
    useCreateUser(handleCancel)

  return (
    <Modal
      title={`Create user`}
      open={openModal}
      onOk={createUser}
      onCancel={handleCancel}
      okText="Submit"
      cancelText="Cancel"
      cancelButtonProps={{
        danger: true,
        type: 'primary',
      }}
      okButtonProps={{
        type: 'default',
        loading: isPending,
      }}
      width={850}
      styles={{
        content: {
          maxHeight: 'calc(100vh - 150px)',
          minHeight: 'auto',
          overflowY: 'auto',
        },
      }}
    >
      <UserForm
        control={control}
        watch={watch}
        errors={errors}
        setValue={setValue}
        action={ActionData.CREATE}
      />
    </Modal>
  )
}

export default ModalCreateUser
