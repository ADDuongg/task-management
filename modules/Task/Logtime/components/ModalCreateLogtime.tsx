import React from 'react'

import { LogtimeForm } from './LogtimeForm'
import { useLogtime } from '@/hooks/useLogtime'
import { ActionData, TaskInterface } from '@/types'

export const ModalCreateLogtime = ({ task }: { task?: TaskInterface }) => {
  const { control, onSubmit, isPending, setValue, errors } = useLogtime(
    ActionData.CREATE,
    task,
  )
  return (
    <LogtimeForm
      control={control}
      onSubmit={onSubmit}
      isSubmitting={isPending}
      errors={errors}
      setValue={setValue}
    />
  )
}
