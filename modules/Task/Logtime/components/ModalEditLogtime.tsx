import React from 'react'

import { LogtimeForm } from './LogtimeForm'
import { useLogtime } from '@/hooks/useLogtime'
import { ActionData, LogtimeInterface, TaskInterface } from '@/types'

export const ModalEditLogtime = ({
  dataUpdate,
}: {
  dataUpdate: LogtimeInterface
}) => {
  const { control, onSubmit, isPending, setValue, errors } = useLogtime(
    ActionData.UPDATE,
    {} as TaskInterface,
    dataUpdate,
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
