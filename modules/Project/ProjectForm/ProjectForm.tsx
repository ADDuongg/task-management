/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Controller } from 'react-hook-form'

import { Button, Form, Input, Select } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { log } from 'console'

import { FlexContainer } from '@/components'
import { useProject } from '@/hooks/useProjectManagement'
import { useListOfUserManagement } from '@/hooks/useUserManagement'
import { ActionData, ProjectInterface } from '@/types'

interface ProjectFormProps {
  action?: ActionData
  updateData?: ProjectInterface
}
const { Option } = Select
export const ProjectForm: React.FC<ProjectFormProps> = ({
  action,
  updateData,
}) => {
  const { form, onSubmit, isPending } = useProject(action, updateData)

  const { listOfUserManagement } = useListOfUserManagement({
    isPagination: false,
  })
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form

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
          name="projectName"
          render={({ field }) => (
            <Form.Item
              layout="vertical"
              label="Project Name"
              validateStatus={errors.projectName ? 'error' : ''}
              help={
                typeof errors.projectName?.message === 'string'
                  ? errors.projectName.message
                  : undefined
              }
              className="flex-1"
            >
              <Input {...field} placeholder="Enter project name" />
            </Form.Item>
          )}
        />
        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <Form.Item
              label="Project Status"
              layout="vertical"
              validateStatus={errors.status ? 'error' : ''}
              help={
                typeof errors.status?.message === 'string'
                  ? errors.status.message
                  : undefined
              }
              className="flex-1"
            >
              <Select {...field} className="w-full" defaultValue="">
                <Option value="">Select Status</Option>
                <Option value="open">Open</Option>
                <Option value="close">Close</Option>
              </Select>
            </Form.Item>
          )}
        />
        <Controller
          control={control}
          name="userId"
          render={({ field }) => (
            <Form.Item
              label="User List"
              layout="vertical"
              validateStatus={errors.userId ? 'error' : ''}
              help={
                typeof errors.userId?.message === 'string'
                  ? errors.userId.message
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
        <FlexContainer>
          <Controller
            control={control}
            name="startDate"
            render={({ field }) => (
              <Form.Item
                label="Start Date"
                layout="vertical"
                validateStatus={errors.startDate ? 'error' : ''}
                help={
                  typeof errors.startDate?.message === 'string'
                    ? errors.startDate.message
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
            name="dueDate"
            render={({ field }) => (
              <Form.Item
                label="End Date"
                layout="vertical"
                validateStatus={errors.dueDate ? 'error' : ''}
                help={
                  typeof errors.dueDate?.message === 'string'
                    ? errors.dueDate.message
                    : undefined
                }
                className="flex-1"
              >
                <Input type="date" {...field} />
              </Form.Item>
            )}
          />
        </FlexContainer>

        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <Form.Item
              label="Description"
              layout="vertical"
              validateStatus={errors.description ? 'error' : ''}
              help={
                typeof errors.description?.message === 'string'
                  ? errors.description.message
                  : undefined
              }
              className="flex-1"
            >
              <TextArea rows={4} {...field}></TextArea>
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
