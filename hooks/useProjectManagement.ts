/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { createProject, updateProject } from '@/action/project'
import { projectServices } from '@/services/project'
import { userServices } from '@/services/user'
import {
  ActionData,
  ProjectFormRequest,
  ProjectInterface,
  ProjectStatus,
  UsersInterface,
  filterInterface,
  sortInterface,
} from '@/types'
import { ProjectsResponse, UsersResponse } from '@/types/api'
import { addAlert } from '@/utils/commons'

export const useListOfProjectManagement = ({
  page,
  limit,
  filter,
  sort,
  search,
  isPagination = true,
}: {
  page?: number
  limit?: number
  filter?: filterInterface<ProjectInterface>[]
  sort?: sortInterface[]
  search?: string
  isPagination?: boolean
}) => {
  const { data, error, isLoading } = useQuery<ProjectsResponse>({
    queryKey: ['projects', 'all', page, limit, filter, sort, search],
    queryFn: async () => {
      if (isPagination) {
        return await projectServices.getListProjects({
          page,
          limit,
          filter,
          sort,
          search,
        })
      }
      return await projectServices.getListProjects({})
    },
  })
  return {
    listOfProjectManagement: data?.projects || [],
    pagination: data?.pagination,
    error,
    isLoading,
  }
}

export const useProject = (
  action?: ActionData,
  project?: ProjectInterface,
) => {
  const projectSchema = z
    .object({
      projectName: z.string().min(1),
      status: z.string(),
      description: z.string().optional(),
      startDate: z.string(),
      dueDate: z.string().optional(),
      taskId: z.array(z.string()).optional(),
      userId: z
      .array(
        z.union([
          z.string(), 
          z.object({ label: z.string().optional(), value: z.string().optional() })
        ])
      ).min(1, 'At least one user is required'),
    })
    .refine(
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
    )

    const mappedUserNames = project?.userId?.map((user) => ({
      label: user.username || user.email,
      value: user._id,
    })) || []; 
    
    const defaultValues: ProjectFormRequest = {
      projectName: project?.projectName || '',
      status: (project?.status as ProjectStatus) || 'open',
      description: project?.description || '',
      startDate: project?.startDate || '',
      dueDate: project?.dueDate || '',
      taskId: project?.taskId || [],
      userId: mappedUserNames,
    };
    
  const form = useForm<ProjectFormRequest>({
    defaultValues,
    resolver: zodResolver(projectSchema),
  })
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (data: ProjectFormRequest) => {
      switch (action) {
        case ActionData.CREATE:
          return await createProject(data)
        case ActionData.UPDATE:
        return await updateProject(project?._id || '', data);
        default:
          throw new Error(`Invalid action: ${action}`)
      }
    },
    onSuccess: async (res: any) => {
      await queryClient.invalidateQueries({
        queryKey: ['projects', 'all'].map(String),
      })
      addAlert({ type: 'success', content: res.message })
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'An error occurred'
      addAlert({ type: 'error', content: errorMessage })
    },
  })

  const onSubmit = async (data: ProjectFormRequest) => {
    const normalizedUserId = data.userId.map((item) => {
      if (typeof item === 'string') {
        return item; 
      } else if ('_id' in item) {
        return item._id; 
      } else {
        return item.value; 
      }
    });
  
    const normalizedData = {
      ...data,
      userId: normalizedUserId,
    };
  
    console.log(normalizedData); 
    mutation.mutate(normalizedData);
  };
  
  

  return {
    onSubmit,
    form,
    isPending: mutation.isPending,
  }
}

/* export const useDeleteUser = () => {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: async (id: number) => {
      return await userServices.deleteUser(id)
    },
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({
        queryKey: ['users', 'all'].map(String),
      })
      addAlert({ type: 'success', content: response.message })
    },
    onError: (response) => {
      addAlert({ type: 'error', content: response.message })
    },
  })
  return {
    deleteUser: mutate,
    isPending,
  }
}

export const useCreateUser = (onClose: () => void) => {
  const userSchema = z.object({
    email: z
      .string()
      .email('Invalid email address')
      .min(1, 'Please enter your email!'),
    username: z.string().nonempty('Please enter your username!'),
    account_role: z.string().nonempty('Please select an account role!'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirm_password: z.string().min(6, 'Please confirm your password'),
    specialization: z.string().optional(),
    position: z.string().optional(),
    phone_number: z.string().optional(),
    date: z.string().optional(),
    skills: z.array(z.string()).optional(),
    description: z.string().optional(),
    avatar: z.any().optional(),
  })

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<UserFormRequest>({
    resolver: zodResolver(userSchema),
  })

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      return await userServices.createUser(data)
    },
    onSuccess: async (res: any) => {
      await queryClient.invalidateQueries({
        queryKey: ['users', 'all'].map(String),
      })
      addAlert({ type: 'success', content: res.message })
      onClose()
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'An error occurred'
      addAlert({ type: 'error', content: errorMessage })
    },
  })

  const onSubmit = async (data: UserFormRequest) => {
    const { confirm_password, avatar, ...finalData } = data
    const formData = new FormData()
    Object.entries(finalData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(item => formData.append(key, item));
      } else if (value !== null && value !== undefined) {
        formData.append(key, String(value));
      }
    });
    avatar && formData.append('avatar', avatar);
    console.log(formData);
    
    mutation.mutate(formData)
    
  }

  return {
    control,
    createUser: handleSubmit(onSubmit),
    watch,
    setValue,
    errors,
    isPending: mutation.isPending
  }
}

export const useUpdateUser = (user: UsersInterface, onClose: () => void) => {
    const {_id} = user
    const userSchema = z.object({
        email: z
          .string()
          .email('Invalid email address')
          .min(1, 'Please enter your email!'),
        username: z.string().nonempty('Please enter your username!'),
        account_role: z.string().nonempty('Please select an account role!'),
        password: z
          .string()
          .min(6, 'Password must be at least 6 characters long')
          .optional()
          .or(z.literal('')),
        confirm_password: z
          .string()
          .min(6, 'Please confirm your password')
          .optional()
          .or(z.literal('')),
        specialization: z.string().optional(),
        position: z.string().optional(),
        phone_number: z.string().optional(),
        date: z.string().optional(),
        skills: z.array(z.string()).optional(),
        description: z.string().optional(),
        avatar: z.any().optional(),
      })
      

  const initUpdateUserValue: any = {
    _id: user._id || '',
    email: user.email || '',
    username: user.username || '',
    account_role: user.account_role || '',
    password: '',
    confirm_password: '',
    specialization: user.specialization || '',
    position: user.position || '',
    phone_number: user.phone_number || '',
    date: user.date || '',
    skills: user.skills || [],
    description: user.description || '',
    avatar: user.avatar || undefined,
  }

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<UserFormRequest>({
    resolver: zodResolver(userSchema),
    defaultValues: initUpdateUserValue,
  })

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      return await userServices.updateUser(data, _id)
    },
    onSuccess: async (res: any) => {
      await queryClient.invalidateQueries({
        queryKey: ['users', 'all'].map(String),
      })
      addAlert({ type: 'success', content: res.message })
      onClose()
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'An error occurred'
      addAlert({ type: 'error', content: errorMessage })
    },
  })

  const onSubmit = async (data: UserFormRequest) => {
    const { confirm_password, avatar, ...finalData } = data
    const formData = new FormData()
    Object.entries(finalData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(item => formData.append(key, item));
      } else if (value !== null && value !== undefined) {
        formData.append(key, String(value));
      }
    });
    
    avatar && formData.append('avatar', avatar);
    console.log(initUpdateUserValue);
    mutation.mutate(formData)
  }

  return {
    control,
    updateUser: handleSubmit(onSubmit),
    watch,
    setValue,
    errors,
    isPending: mutation.isPending
  }
} */
