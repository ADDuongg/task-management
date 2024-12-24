import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { createLogtime, deleteLogtime, updateLogtime } from '@/action'
import {
  ActionData,
  EnumActivity,
  LogtimeInterface,
  LogtimeResponse,
  ProjectFormRequest,
  ProjectInterface,
  TaskInterface,
  UsersInterface,
  filterInterface,
  logtimeFormRequest,
  sortInterface,
} from '@/types'
import { addAlert } from '@/utils/commons'
import { logtimeServices } from '@/services'

export const useLogtime = (
  action?: ActionData,
  taskLogtime?: TaskInterface,
  logtimeData?: LogtimeInterface,
) => {
  const LogtimeSchema = z.object({
    activity: z.union([
      z.array(
        z.object({
          label: z.string().optional(),
          value: z.string().optional(),
        }),
      ),
      z.string(),
      z.object({
        label: z.string().optional(),
        value: z.string().optional(),
      }),
    ]),
    userId: z.string(),
    taskId: z.union([
      z.array(
        z.object({
          label: z.string().optional(),
          value: z.string().optional(),
        }),
      ),
      z.string(),
      z.object({
        label: z.string().optional(),
        value: z.string().optional(),
      }),
    ]),
    comment: z.string().min(1),
    dateLogtime: z.string().min(1),
    timeLogtime: z.string().min(1),
  })
  function isTaskInterface(
    value: string | TaskInterface | undefined,
  ): value is TaskInterface {
    return typeof value !== 'string'
  }
  function isUsersInterface(
    value: string | UsersInterface | undefined,
  ): value is UsersInterface {
    return typeof value !== 'string'
  }

  const mappedTaskId = [
    {
      label:
        logtimeData?.taskId && isTaskInterface(logtimeData.taskId)
          ? logtimeData.taskId.subject
          : taskLogtime?.subject || 'Unknown Task',
      value:
        logtimeData?.taskId && isTaskInterface(logtimeData.taskId)
          ? logtimeData.taskId._id
          : taskLogtime?._id || 'Unknown ID',
    },
  ]

  const defaultValues: logtimeFormRequest = {
    activity: logtimeData?.activity || EnumActivity.DEVELOPMENT,
    userId:
      logtimeData?.userId && isUsersInterface(logtimeData.userId)
        ? logtimeData.userId.username
        : '',

    taskId: mappedTaskId,
    comment: logtimeData?.comment || '',
    dateLogtime:
      logtimeData?.dateLogtime || new Date().toISOString().split('T')[0],
    timeLogtime: logtimeData?.timeLogtime || 0,
  }

  const form = useForm<logtimeFormRequest>({
    defaultValues,
    resolver: zodResolver(LogtimeSchema),
  })
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (data: logtimeFormRequest) => {
      switch (action) {
        case ActionData.CREATE:
          return await createLogtime(data)
        case ActionData.UPDATE:
          return await updateLogtime(logtimeData?._id || '', data)
        default:
          throw new Error(`Invalid action: ${action}`)
      }
    },
    onSuccess: async (res: any) => {
      await queryClient.invalidateQueries({
        queryKey: ['logtimes', 'all'].map(String),
      })
      addAlert({ type: 'success', content: res.message })
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'An error occurred'
      addAlert({ type: 'error', content: errorMessage })
    },
  })

  const onSubmit = async (data: logtimeFormRequest) => {
    console.log(data)

    const normalizedTaskId = Array.isArray(data.taskId)
      ? data.taskId.map((item) => {
          if (typeof item === 'string') {
            return item
          } else {
            return item.value
          }
        })
      : data.taskId

    const normalizedData: logtimeFormRequest = {
      ...data,
      taskId: normalizedTaskId,
    }

    mutation.mutate(normalizedData)
  }

  return {
    form,
    isPending: mutation.isPending,
    control,
    onSubmit: handleSubmit(onSubmit),
    watch,
    setValue,
    errors,
  }
}

export const useListOfLogtime = ({
  page,
  limit,
  filter,
  sort,
  search,
  isPagination = true,
  task,
  currentUserId
}: {
  page?: number
  limit?: number
  filter?: filterInterface<LogtimeInterface>[]
  sort?: sortInterface<LogtimeInterface>[]
  search?: string
  isPagination?: boolean
  task?: TaskInterface
  currentUserId?: string
}) => {
  const { data, error, isLoading } = useQuery<LogtimeResponse>({
    queryKey: ['logtimes', 'all', page, limit, filter, sort, search],
    queryFn: async () =>
    {
      if (isPagination) {
        return await logtimeServices.getListLogtime({ page, limit, filter, sort, search });
      }
      return await logtimeServices.getListLogtime({});
    }
  })
  const listOfAllLogtime = data?.logtime.filter(logtime => logtime.taskId._id === task?._id)
  const listOfLogtimeByUser = data?.logtime.filter(logtime => logtime.userId._id === currentUserId)
  return {
    listOfLogtime: task ? listOfAllLogtime : (currentUserId ? listOfLogtimeByUser : data?.logtime || []),
    pagination: data?.pagination,
    error,
    isLoading,
  }
}

export const useDeleteLogtime = () => {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: async (_id: string) => {
      return await deleteLogtime(_id)
    },
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({
        queryKey: ['logtimes', 'all'].map(String),
      })
      addAlert({ type: 'success', content: response.message })
    },
    onError: (response) => {
      addAlert({ type: 'error', content: response.message })
    },
  })
  return {
    deleteLogtime: mutate,
    isPending,
  }
}
