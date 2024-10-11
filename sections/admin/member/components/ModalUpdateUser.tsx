import React from 'react'

import { Modal } from 'antd'

import UserForm from './UserForm'
import { useUpdateUser } from '@/hooks/useUserManagement'
import { ActionData, UsersInterface } from '@/types'

interface ModalUpdateUser {
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  user: UsersInterface
}

const ModalUpdateUser: React.FC<ModalUpdateUser> = ({
  openModal,
  setOpenModal,
  user,
}) => {
  const handleCancel = () => {
    setOpenModal(false)
  }
  const { control, watch, updateUser, errors, setValue, isPending } =
    useUpdateUser(user, handleCancel)

  return (
    <Modal
      title={`Update user`}
      open={openModal}
      onOk={updateUser}
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
        action={ActionData.UPDATE}
        setValue={setValue}
        defaultAvatar={user.avatar}
      />
    </Modal>
  )
}

export default ModalUpdateUser
