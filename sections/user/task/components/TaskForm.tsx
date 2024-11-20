/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { Control, Controller, UseFormSetValue } from 'react-hook-form'

import { Button, Form, Input, Select, Slider } from 'antd'
import { useAtomValue } from 'jotai'
import Image from 'next/image'

import UploadFileTask from './UploadFileTask'
import WorkTodo from './WorkTodo'
import { FlexContainer, Typography } from '@/components'
import { useListOfUserManagement } from '@/hooks/useUserManagement'
import { dataTask } from '@/states/task'
import { TaskFormRequest, TaskStatus } from '@/types'

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
}

export const TaskForm: React.FC<TaskFormProps> = ({
  control,
  handleSubmit,
  setValue,
  isSubmiting,
}) => {
  const { listOfUserManagement } = useListOfUserManagement({
    isPagination: false,
  })
  const userOption = listOfUserManagement.map((item) => ({
    label: item.username,
    value: item._id,
  }))
  const taskValue = useAtomValue(dataTask)
  const task = taskValue[0]
  const [inputValue, setInputValue] = useState(0)
  const [todos, setTodos] = useState<string[]>([])
  const [files, setFiles] = useState<File[]>([])

  const handleFinish = (data: TaskFormRequest) => {
    const finalData = {
      ...data,
      files,
      workToDo: todos,
    }
    console.log(data)

    setValue('files', files)
    setValue('workToDo', todos)
    handleSubmit(finalData)
  }

  return (
    <div
      className="flex xl:flex-row flex-col justify-between h-full overflow-y-auto xl:gap-y-0 gap-y-5 gap-x-8"
      style={{ padding: '0 8rem' }}
    >
      <div className="xl:w-[calc(100%-450px)] w-full flex flex-col gap-y-10 h-auto bg-whiteSmall-100 p-5">
        <Typography text="Task infomation" />
        <div className="flex justify-between items-center w-full">
          <FlexContainer>
            <Typography fontWeight={true} level={3} text="Task name" />
            <Controller
              name="subject"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  size="large"
                  className="w-auto"
                  placeholder="Enter task name"
                />
              )}
            />
          </FlexContainer>
          <FlexContainer>
            <Typography text="Status:" fontWeight={true} level={3} />
            <Controller
              name="status"
              control={control}
              defaultValue={TaskStatus.OPENTODO}
              render={({ field }) => (
                <Select
                  {...field}
                  className="w-auto"
                  size="large"
                  options={statusOptions}
                />
              )}
            />
          </FlexContainer>
        </div>
        <div className="flex flex-col justify-between w-full">
          <div className="gspace-y-3">
            <Typography text="Progress:" fontWeight={true} level={3} />
            <FlexContainer>
              <Slider
                value={typeof inputValue === 'number' ? inputValue : 0}
                max={100}
                min={0}
                className="w-full"
                onChange={(newValue) => setInputValue(newValue as number)}
              />
              <Controller
                name="done"
                control={control}
                defaultValue={0}
                render={({ field }) => (
                  <Select
                    {...field}
                    className="w-auto"
                    options={progressOptions}
                    onChange={(value) =>
                      setInputValue(value as unknown as number)
                    }
                  />
                )}
              />
            </FlexContainer>
          </div>
        </div>
        <FlexContainer justifyContent="space-between">
          <FlexContainer>
            <Typography fontWeight={true} level={3} text="Task owner" />
            <Controller
              name="taskOwner"
              control={control}
              defaultValue={userOption[0]?.value}
              render={({ field }) => (
                <Select
                  {...field}
                  style={{ width: '120px' }}
                  options={userOption}
                />
              )}
            />
          </FlexContainer>
          <FlexContainer>
            <Typography fontWeight={true} level={3} text="Assign to" />
            <Controller
              name="assignTo"
              control={control}
              defaultValue={userOption[0]?.value}
              render={({ field }) => (
                <Select
                  {...field}
                  style={{ width: '120px' }}
                  options={userOption}
                />
              )}
            />
          </FlexContainer>
        </FlexContainer>
        <FlexContainer justifyContent="space-between">
          <FlexContainer>
            <Typography fontWeight={true} level={3} text="Start date" />
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <Input style={{ width: '120px' }} type="date" {...field} />
              )}
            />
          </FlexContainer>
          <FlexContainer>
            <Typography fontWeight={true} level={3} text="End date" />
            <Controller
              name="dueDate"
              control={control}
              render={({ field }) => (
                <Input style={{ width: '120px' }} type="date" {...field} />
              )}
            />
          </FlexContainer>
        </FlexContainer>
        <FlexContainer>
          <Typography fontWeight={true} level={3} text="Estimate time" />
          <Controller
            name="estimateTime"
            control={control}
            render={({ field }) => (
              <Input style={{ width: '220px' }} {...field} />
            )}
          />
          <Typography level={4} text="Hours" />
        </FlexContainer>
        <div>
          <hr className="my-2" />
          <Typography text="Description" level={3} fontWeight={true} />
          <div className="space-y-4 mt-4">
            <Controller
              name="descriptions"
              control={control}
              render={({ field }) => (
                <textarea className="w-full border" rows={10} {...field} />
              )}
            />
          </div>
        </div>
      </div>

      <div className="xl:w-[550px] w-full bg-whiteSmall-100 rounded-lg h-full p-5 space-y-4">
        <Typography text="Task files" />
        <UploadFileTask files={files} setFiles={setFiles} />
        <WorkTodo todos={todos} setTodos={setTodos} />
        <Form.Item>
          <Button
            loading={isSubmiting}
            type="primary"
            htmlType="submit"
            className="w-full"
            onClick={() => handleFinish(handleSubmit)}
          >
            Submit
          </Button>
        </Form.Item>
      </div>
    </div>
  )
}
