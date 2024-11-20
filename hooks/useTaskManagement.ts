/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { taskServices } from '@/services/task'
import { filterInterface, sortInterface, TaskFormRequest, TaskInterface } from '@/types'
import { addAlert } from '@/utils/commons'
import { TasksResponse } from '@/types/api'



export const useListOfTaskManagement = ({
  page,
  limit,
  filter,
  sort,
  search,
  isPagination = true
}: {
  page?: number
  limit?: number
  filter?: filterInterface<TaskInterface>[]
  sort?: sortInterface[]
  search?: string
  isPagination?: boolean
}) => {
  const { data, error, isLoading } = useQuery<TasksResponse>({
    queryKey: ['tasks', 'all', page, limit, filter, sort, search],
    queryFn: async () =>
    {
      if (isPagination) {
        return await taskServices.getListTasks({ page, limit, filter, sort, search });
      }
      return await taskServices.getListTasks({});
    }
  })
  return {
    listOfTaskManagement: data?.tasks || [],
    pagination: data?.pagination,
    error,
    isLoading,
  }
}

export const useCreateTask = () => {
  const userSchema = z.object({
    assignTo: z.string().optional(),
    dueDate: z.string(),
    done: z.number(),
    startDate: z.string(),
    status: z.string(),
    subject: z.string().optional(),
    taskOwner: z.string().optional(),
    descriptions: z.string().optional(),
    estimateTime: z.number().optional(),
    userId: z.array(z.string()).optional(),
    workToDo: z.array(z.string()).optional(),
    files: z.any().optional(),
  })

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TaskFormRequest>({
    resolver: zodResolver(userSchema),
  })

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      return await taskServices.createTask(data)
    },
    onSuccess: async (res: any) => {
      addAlert({ type: 'success', content: res.message })
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'An error occurred'
      addAlert({ type: 'error', content: errorMessage })
    },
  })

  const onSubmit = async (data: TaskFormRequest) => {
    console.log(data)

    const { files, ...finalData } = data
    const formData = new FormData()

    Object.entries(finalData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, String(value))
      }
    })
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i])
      }
    }
    mutation.mutate(formData)
  }

  return {
    control,
    createTask: handleSubmit(onSubmit),
    watch,
    setValue,
    errors,
    isPending: mutation.isPending,
  }
}
