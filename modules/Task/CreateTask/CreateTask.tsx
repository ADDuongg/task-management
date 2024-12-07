'use client'

import React from 'react'

import { TaskForm } from '../TaskForm'
import { useCreateTask } from '@/hooks/useTaskManagement'

export const CreateTask = () => {
  const { control, createTask, isPending, setValue, errors, getValues } =
    useCreateTask()
  return (
    <>
      <TaskForm
        control={control}
        setValue={setValue}
        handleSubmit={createTask}
        isSubmiting={isPending}
        errors={errors}
        getValues={getValues}
      />
    </>
  )
}
