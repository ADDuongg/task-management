'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import { TaskForm } from '../TaskForm'
import { useUpdateTask } from '@/hooks/useTaskManagement'
import { TaskInterface } from '@/types'

export const UpdateTask = ({
  updateTaskData,
}: {
  updateTaskData: TaskInterface
}) => {
  const { control, updateTask, isPending, setValue, errors, getValues } =
    useUpdateTask(updateTaskData)
  return (
    <>
      <TaskForm
        control={control}
        setValue={setValue}
        handleSubmit={updateTask}
        isSubmiting={isPending}
        errors={errors}
        getValues={getValues}
        updateTaskData={updateTaskData}
      />
    </>
  )
}
