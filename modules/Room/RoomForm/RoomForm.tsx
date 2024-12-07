/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'

import { Button, Form, Input, Select } from 'antd'

import { useListOfUserManagement } from '@/hooks/useUserManagement'
import { ActionData, RoomsFormRequest } from '@/types'

interface RoomFormProps {
  action: ActionData
  onSubmit: (data: any) => void
  form: UseFormReturn<RoomsFormRequest, any, undefined>
  isPending: boolean
}

export const RoomForm = ({
  action,
  onSubmit,
  form,
  isPending,
}: RoomFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form

  const { listOfUserManagement } = useListOfUserManagement({
    isPagination: false,
  })
  const options = listOfUserManagement?.map((user) => ({
    label: user.username || user.email,
    value: user._id,
  }))

  return (
    <Form
      layout="vertical"
      onFinish={onSubmit ? handleSubmit(onSubmit) : undefined}
      disabled={action === ActionData.VIEW}
    >
      <div>
        <Controller
          control={control}
          name="roomName"
          render={({ field }) => (
            <Form.Item
              layout="vertical"
              label="Room Name"
              validateStatus={errors.roomName ? 'error' : ''}
              help={
                typeof errors.roomName?.message === 'string'
                  ? errors.roomName.message
                  : undefined
              }
              className="flex-1"
            >
              <Input {...field} placeholder="Enter room name" />
            </Form.Item>
          )}
        />
        <Controller
          control={control}
          name="participants"
          render={({ field }) => (
            <Form.Item
              label="User List"
              layout="vertical"
              validateStatus={errors.participants ? 'error' : ''}
              help={
                typeof errors.participants?.message === 'string'
                  ? errors.participants.message
                  : undefined
              }
              className="flex-1"
            >
              <Select
                {...field}
                mode="tags"
                placeholder="Please select"
                style={{ width: '100%' }}
                options={options}
              />
            </Form.Item>
          )}
        />

        {!(action === ActionData.VIEW) && (
          <div className="flex !justify-end">
            <Button htmlType="submit" loading={isPending}>
              Submit
            </Button>
          </div>
        )}
      </div>
    </Form>
  )
}
