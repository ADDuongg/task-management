'use client'

import React from 'react'

import { TaskForm } from './TaskForm'
import { useCreateTask } from '@/hooks/useTaskManagement'

export const UserCreateTask = () => {
  const { control, createTask, isPending, setValue } = useCreateTask()
  return (
    <>
      <TaskForm
        control={control}
        setValue={setValue}
        handleSubmit={createTask}
        isSubmiting={isPending}
      />
    </>
  )
}
