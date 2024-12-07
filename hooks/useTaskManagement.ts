/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { ActionData, filterInterface, sortInterface, TaskFormRequest, TaskInterface, TaskStatus, UsersInterface } from '@/types'
import { addAlert } from '@/utils/commons'
import { TasksResponse } from '@/types/api'
import { deleteTask, updateTask } from '@/action/task'
import { useRouter } from 'next/navigation'
import { taskServices } from '@/services'

const taskSchema = z.object({
  assignTo: 
  z.union([
    z.array(
      z.object({
        label: z.string().optional(),
        value: z.string().optional(),
      })
    ),
    z.string(),
    z.object({
      label: z.string().optional(),
      value: z.string().optional(),
    }),
  ]),
  dueDate: z.string().nonempty('Due date is required'),
  done: 
    z.union([
      z.array(
        z.object({
          label: z.string().optional(),
          value: z.number().optional(),
        })
      ),
      z.object({ label: z.string().optional(), value: z.number().optional() }),
      z.number(), 
    ]),
  startDate: z.string().nonempty('Start date is required'),
  status: z.string().nonempty('Status is required'),
  subject: z.string().min(1, 'Subject is required'),
  taskOwner: 
  z.union([
    z.array(
      z.object({
        label: z.string().optional(),
        value: z.string().optional(),
      })
    ),
    z.string(),
    z.object({
      label: z.string().optional(),
      value: z.string().optional(),
    }),
  ]),
  descriptions: z.string().optional(),
  estimateTime: z.string().optional(),
  userId: z.array(z.string()).optional(),
  workToDo: z.array(z.string()).optional(),
  files: z.any().optional(),
}).refine(
  (data) => {
    if (!data.dueDate) return true
    const start = new Date(data.startDate)
    const due = new Date(data.dueDate)
    return start <= due
  },
  {
    message: 'Start date must be earlier than or equal to due date',
    path: ['dueDate'],
  },
);

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
  sort?: sortInterface<TaskInterface>[]
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
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<TaskFormRequest>({
    resolver: zodResolver(taskSchema),
  })

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      return await taskServices.createTask(data)
    },
    onSuccess: async (res: any) => {
      await queryClient.invalidateQueries({
        queryKey: ['tasks', 'all'].map(String),
      })
      addAlert({ type: 'success', content: res.message })
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'An error occurred'
      addAlert({ type: 'error', content: errorMessage })
    },
  })

  const onSubmit = async (data: TaskFormRequest) => {
    const { files, ...finalData } = data;
    const formData = new FormData();
    
    Object.entries(finalData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(item => formData.append(key, String(item))); 
      } else if (value !== null && value !== undefined) {
        formData.append(key, String(value)); 
      }
    });
  
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }
    }
  
    mutation.mutate(formData);
  };
  
  
  

  return {
    control,
    createTask: handleSubmit(onSubmit),
    watch,
    setValue,
    errors,
    getValues,
    isPending: mutation.isPending,
  }
}

export const useUpdateTask = (task: TaskInterface) => {
  
  const doneFormat = [
    {
      label: `${task.done}%`,
      value: Number(task.done) || 0,
    } ]
    function isUsersInterface(value: string | UsersInterface | undefined): value is UsersInterface {
      return typeof value !== 'string';
    }
    const mappedAssignTo = [
      {
        label: isUsersInterface(task.assignTo) ? task.assignTo.username : 'Unknown User',
        value: isUsersInterface(task.assignTo) ? task.assignTo._id : 'Unknown ID',
      }
    ]
    
    const mappedTaskOwner = [
      {
        label: isUsersInterface(task.taskOwner) ? task.taskOwner.username : 'Unknown User',
        value: isUsersInterface(task.taskOwner) ? task.taskOwner._id : 'Unknown ID',
      }
    ]
      
  
  const defaultValues: TaskFormRequest = {
    assignTo: mappedAssignTo,
    dueDate: task.dueDate || '',
    done: doneFormat,
    startDate: task.startDate || '',
    status: task.status || TaskStatus.OPENTODO,
    subject: task.subject || '',
    taskOwner: mappedTaskOwner,
    descriptions: task.descriptions || '',
    estimateTime: task.estimateTime || '',
    workToDo: task.workToDo || [],
    files: task.files || []
  }
  
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<TaskFormRequest>({
    defaultValues,
    resolver: zodResolver(taskSchema),
  })

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      return await updateTask(task._id, data);
    },
    onSuccess: async (res: any) => {
      await queryClient.invalidateQueries({
        queryKey: ['tasks', 'all'].map(String),
      })
      addAlert({ type: 'success', content: res.message })
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'An error occurred'
      addAlert({ type: 'error', content: errorMessage })
    },
  })
  const onSubmit = async (data: TaskFormRequest) => {
    const normalizedDone = Array.isArray(data.done)
    ? data.done.map((item) => {
      if (typeof item === 'string') {
        return item; 
      } else {
        return item.value; 
      }
    })
    : data.done;  

    const normalizedTaskOwner = Array.isArray(data.taskOwner)
    ? data.taskOwner.map((item) => {
      if (typeof item === 'string') {
        return item; 
      } else {
        return item.value; 
      }
    })
    : data.taskOwner; 
    const normalizedAssignTo = Array.isArray(data.assignTo)
    ? data.assignTo.map((item) => {
      if (typeof item === 'string') {
        return item; 
      } else {
        return item.value; 
      }
    })
    : data.assignTo;  

    const updatedData = { ...data, done: normalizedDone, taskOwner: normalizedTaskOwner, assignTo: normalizedAssignTo };
    const { files, workToDo, ...finalData } = updatedData;

    const formData = new FormData();
    
    Object.entries(finalData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, String(value));
      }
    });
  
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }
    }
    if (workToDo) {
      for (let i = 0; i < workToDo.length; i++) {
        formData.append('workToDo', workToDo[i]);
      }
    }
    mutation.mutate(formData);
  };

  return {
    control,
    updateTask: handleSubmit(onSubmit),
    watch,
    setValue,
    errors,
    getValues,
    isPending: mutation.isPending,
  }
}

export const useDeleteTask = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: async (_id: string) => {
      return await deleteTask(_id)
    },
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({
        queryKey: ['tasks', 'all'].map(String),
      })
      addAlert({ type: 'success', content: response.message })
    },
    onError: (response) => {
      addAlert({ type: 'error', content: response.message })
    },
  })
  return {
    deleteTask: mutate,
    isPending,
  }
}
