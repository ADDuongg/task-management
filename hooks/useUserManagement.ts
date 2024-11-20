/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { userServices } from '@/services/user'
import { UserFormRequest, UsersInterface, filterInterface, sortInterface } from '@/types'
import { addAlert } from '@/utils/commons'
import { UsersResponse } from '@/types/api'

export const useListOfUserManagement = ({
  page,
  limit,
  filter,
  sort,
  search,
  isPagination = true
}: {
  page?: number
  limit?: number
  filter?: filterInterface<UsersInterface>[]
  sort?: sortInterface[]
  search?: string
  isPagination?: boolean
}) => {
  const { data, error, isLoading } = useQuery<UsersResponse>({
    queryKey: ['users', 'all', page, limit, filter, sort, search],
    queryFn: async () =>
    {
      if (isPagination) {
        return await userServices.getListUsers({ page, limit, filter, sort, search });
      }
      return await userServices.getListUsers({});
    }
  })
  return {
    listOfUserManagement: data?.users || [],
    pagination: data?.pagination,
    error,
    isLoading,
  }
}

export const useUsersRole = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['account_role'],
    queryFn: async () => await userServices.getListUsersRole(),
  })
  return {
    listOfUserRole: data?.accountRoles || [],
    error,
    isLoading,
  }
}

export const useDeleteUser = () => {
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
}
