/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { Control, Controller, UseFormSetValue } from 'react-hook-form'

import { FormOutlined, HomeOutlined } from '@ant-design/icons'
import { Breadcrumb, Button, Form, Input, Select, Slider } from 'antd'
import { useAtomValue } from 'jotai'
import Link from 'next/link'

import { UploadFileTask, WorkTodo } from '../components'
import { FlexContainer, Typography } from '@/components'
import { useListOfUserManagement } from '@/hooks/useUserManagement'
import { userRoleState } from '@/states/users'
import { TaskFormRequest, TaskInterface, TaskStatus } from '@/types'

const statusOptions = [
  { label: 'Open/Todo', value: 'open' },
  { label: 'Doing', value: 'doing' },
  { label: 'Review', value: 'review' },
  { label: 'Close', value: 'close' },
]
const progressOptions = [
  { label: '0%', value: 0 },
  { label: '10%', value: 10 },
  { label: '20%', value: 20 },
  { label: '30%', value: 30 },
  { label: '40%', value: 40 },
  { label: '50%', value: 50 },
  { label: '60%', value: 60 },
  { label: '70%', value: 70 },
  { label: '80%', value: 80 },
  { label: '90%', value: 90 },
  { label: '100%', value: 100 },
]

interface TaskFormProps {
  control: Control<TaskFormRequest>
  setValue: UseFormSetValue<TaskFormRequest>
  isSubmiting?: boolean
  handleSubmit: any
  errors?: any
  getValues: any
  updateTaskData?: TaskInterface
}
const { TextArea } = Input
export const TaskForm: React.FC<TaskFormProps> = ({
  control,
  handleSubmit,
  setValue,
  isSubmiting,
  errors,
  getValues,
  updateTaskData,
}) => {
  const { listOfUserManagement } = useListOfUserManagement({
    isPagination: false,
  })
  const userOption = listOfUserManagement.map((item) => ({
    label: item.username,
    value: item._id,
  }))

  const [todos, setTodos] = useState<string[]>([])
  useEffect(() => {
    updateTaskData && setTodos(updateTaskData.workToDo || [])
  }, [updateTaskData])
  const role = useAtomValue(userRoleState)
  return (
    <>
      <Breadcrumb
        items={[
          {
            title: (
              <>
                <HomeOutlined />
                <Link href={`/dashboard/${role}`}>Home</Link>
              </>
            ),
          },
          {
            title: (
              <>
                <FormOutlined />
                <Link href={`/dashboard/${role}/task`}>Task Management</Link>
              </>
            ),
          },
        ]}
      />
      <Form
        onFinish={handleSubmit}
        className="flex xl:flex-row flex-col justify-between h-full overflow-y-auto xl:gap-y-0 gap-y-5 gap-x-8 mt-2"
        style={{ padding: '0 8rem' }}
      >
        <div className=" xl:w-[calc(100%-450px)] w-full flex flex-col gap-y-10 h-auto bg-whiteSmall-100 dark:bg-blackSmall-100 rounded-lg p-5">
          <Typography text="Task infomation" />
          <FlexContainer justifyContent="space-between">
            <Controller
              name="subject"
              control={control}
              render={({ field }) => (
                <Form.Item
                  label="Subject"
                  layout="vertical"
                  style={{ flex: 3 }}
                  help={
                    typeof errors.subject?.message === 'string'
                      ? errors.subject.message
                      : undefined
                  }
                  validateStatus={errors.subject ? 'error' : ''}
                >
                  <Input
                    {...field}
                    size="large"
                    placeholder="Enter task name"
                  />
                </Form.Item>
              )}
            />
            <Controller
              name="status"
              control={control}
              defaultValue={TaskStatus.OPENTODO}
              render={({ field }) => (
                <Form.Item
                  label="Status"
                  layout="vertical"
                  style={{ flex: 1 }}
                  help={
                    typeof errors.status?.message === 'string'
                      ? errors.status.message
                      : undefined
                  }
                  validateStatus={errors.status ? 'error' : ''}
                >
                  <Select {...field} size="large" options={statusOptions} />
                </Form.Item>
              )}
            />
          </FlexContainer>
          <FlexContainer justifyContent="space-between">
            <Controller
              name="estimateTime"
              control={control}
              render={({ field }) => (
                <Form.Item
                  label="Estimate time"
                  layout="vertical"
                  style={{ flex: 3 }}
                  help={
                    typeof errors.estimateTime?.message === 'string'
                      ? errors.estimateTime.message
                      : undefined
                  }
                  validateStatus={errors.estimateTime ? 'error' : ''}
                >
                  <Input size="large" {...field} />
                </Form.Item>
              )}
            />

            <Controller
              name="done"
              control={control}
              defaultValue={0}
              render={({ field }) => {
                return (
                  <Form.Item
                    label="Progress"
                    layout="vertical"
                    style={{ flex: 1 }}
                    help={
                      typeof errors.done?.message === 'string'
                        ? errors.done.message
                        : undefined
                    }
                    validateStatus={errors.done ? 'error' : ''}
                  >
                    <Select
                      {...field}
                      size="large"
                      options={progressOptions}
                      onChange={(value) => {
                        field.onChange(value)
                      }}
                    />
                  </Form.Item>
                )
              }}
            />
          </FlexContainer>

          <FlexContainer justifyContent="space-between">
            <Controller
              name="taskOwner"
              control={control}
              defaultValue={userOption[0]?.value}
              render={({ field }) => (
                <Form.Item
                  label="Task owner"
                  layout="vertical"
                  style={{ flex: 1 }}
                  help={
                    typeof errors.taskOwner?.message === 'string'
                      ? errors.taskOwner.message
                      : undefined
                  }
                  validateStatus={errors.taskOwner ? 'error' : ''}
                >
                  <Select
                    size="large"
                    {...field}
                    options={userOption}
                    onChange={(value) => {
                      field.onChange(value)
                    }}
                  />
                </Form.Item>
              )}
            />
            <Controller
              name="assignTo"
              control={control}
              defaultValue={userOption[0]?.value}
              render={({ field }) => (
                <Form.Item
                  label="Assign to"
                  layout="vertical"
                  style={{ flex: 1 }}
                  help={
                    typeof errors.assignTo?.message === 'string'
                      ? errors.assignTo.message
                      : undefined
                  }
                  validateStatus={errors.assignTo ? 'error' : ''}
                >
                  <Select size="large" {...field} options={userOption} />
                </Form.Item>
              )}
            />
          </FlexContainer>

          <FlexContainer justifyContent="space-between">
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <Form.Item
                  label="Start date"
                  layout="vertical"
                  style={{ flex: 1 }}
                  help={
                    typeof errors.startDate?.message === 'string'
                      ? errors.startDate.message
                      : undefined
                  }
                  validateStatus={errors.startDate ? 'error' : ''}
                >
                  <Input size="large" type="date" {...field} />
                </Form.Item>
              )}
            />
            <Controller
              name="dueDate"
              control={control}
              render={({ field }) => (
                <Form.Item
                  label="End date"
                  layout="vertical"
                  style={{ flex: 1 }}
                  help={
                    typeof errors.dueDate?.message === 'string'
                      ? errors.dueDate.message
                      : undefined
                  }
                  validateStatus={errors.dueDate ? 'error' : ''}
                >
                  <Input size="large" type="date" {...field} />
                </Form.Item>
              )}
            />
          </FlexContainer>

          <Controller
            name="descriptions"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Description"
                layout="vertical"
                help={
                  typeof errors.descriptions?.message === 'string'
                    ? errors.descriptions.message
                    : undefined
                }
                validateStatus={errors.descriptions ? 'error' : ''}
              >
                <TextArea rows={7} placeholder="Enter description" {...field} />
              </Form.Item>
            )}
          />
        </div>

        <div className="xl:w-[550px] w-full bg-whiteSmall-100 rounded-lg h-full p-5 space-y-4 dark:bg-blackSmall-100">
          <Typography text="Task files" />
          <UploadFileTask setValue={setValue} getValues={getValues} />
          <WorkTodo
            todos={todos}
            setTodos={setTodos}
            setValue={setValue}
            getValues={getValues}
          />
          <Form.Item>
            <Button
              loading={isSubmiting}
              type="primary"
              htmlType="submit"
              className="w-full"
            >
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  )
}
