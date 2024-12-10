import React, { useEffect } from 'react'
import { Control, Controller, UseFormSetValue } from 'react-hook-form'

import { Button, Form, Input, Select } from 'antd'
import { useAtomValue } from 'jotai'

import { FlexContainer } from '@/components'
import { dataActivity } from '@/constants'
import { useListOfTaskManagement } from '@/hooks/useTaskManagement'
import { currentUserState } from '@/states/users'
import { EnumActivity, TaskInterface, logtimeFormRequest } from '@/types'

interface LogtimeFormProps {
  control: Control<logtimeFormRequest>
  setValue: UseFormSetValue<logtimeFormRequest>
  isSubmitting?: boolean
  onSubmit: any
  errors?: any
}
const { TextArea } = Input
const { Option } = Select
export const LogtimeForm: React.FC<LogtimeFormProps> = ({
  control,
  setValue,
  isSubmitting,
  onSubmit,
  errors,
}) => {
  const user = useAtomValue(currentUserState)
  useEffect(() => {
    if (user?._id) {
      setValue('userId', user._id)
    }
  }, [user, setValue])

  const { listOfTaskManagement } = useListOfTaskManagement({
    isPagination: false,
  })

  return (
    <Form layout="vertical" onFinish={onSubmit ? onSubmit : undefined}>
      <div>
        <Controller
          control={control}
          name="taskId"
          render={({ field }) => (
            <Form.Item
              layout="vertical"
              label="Task List"
              validateStatus={errors.taskId ? 'error' : ''}
              help={
                typeof errors.taskId?.message === 'string'
                  ? errors.taskId.message
                  : undefined
              }
              className="flex-1"
            >
              <Select {...field} className="w-full" defaultValue="">
                {listOfTaskManagement?.map((item) => (
                  <Option value={item._id} key={item._id}>
                    {item.subject}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}
        />

        <Form.Item
          label="User"
          layout="vertical"
          validateStatus={errors.userId ? 'error' : ''}
          help={
            typeof errors.userId?.message === 'string'
              ? errors.userId.message
              : undefined
          }
          className="flex-1"
        >
          <Input type="text" value={user?.username} readOnly />
        </Form.Item>
        <Controller
          control={control}
          name="activity"
          render={({ field }) => (
            <Form.Item
              label="Activity"
              layout="vertical"
              validateStatus={errors.activity ? 'error' : ''}
              help={
                typeof errors.activity?.message === 'string'
                  ? errors.activity.message
                  : undefined
              }
              className="flex-1"
            >
              <Select {...field} className="w-full">
                {dataActivity.map((item) => (
                  <Option value={item.value} key={item.value}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}
        />
        <FlexContainer>
          <Controller
            control={control}
            name="dateLogtime"
            render={({ field }) => (
              <Form.Item
                label="Date Logtime"
                layout="vertical"
                validateStatus={errors.dateLogtime ? 'error' : ''}
                help={
                  typeof errors.dateLogtime?.message === 'string'
                    ? errors.dateLogtime.message
                    : undefined
                }
                className="flex-1"
              >
                <Input type="date" {...field} />
              </Form.Item>
            )}
          />
          <Controller
            control={control}
            name="timeLogtime"
            render={({ field }) => (
              <Form.Item
                label="Time Logtime"
                layout="vertical"
                validateStatus={errors.timeLogtime ? 'error' : ''}
                help={
                  typeof errors.timeLogtime?.message === 'string'
                    ? errors.timeLogtime.message
                    : undefined
                }
                className="flex-1"
              >
                <Input type="text" {...field} />
              </Form.Item>
            )}
          />
        </FlexContainer>

        <Controller
          control={control}
          name="comment"
          render={({ field }) => (
            <Form.Item
              label="Comment"
              layout="vertical"
              validateStatus={errors.comment ? 'error' : ''}
              help={
                typeof errors.comment?.message === 'string'
                  ? errors.comment.message
                  : undefined
              }
              className="flex-1"
            >
              <TextArea rows={4} {...field}></TextArea>
            </Form.Item>
          )}
        />
      </div>
      <div className="flex justify-end">
        <Form.Item>
          <Button htmlType="submit" loading={isSubmitting}>
            Submit
          </Button>
        </Form.Item>
      </div>
    </Form>
  )
}
