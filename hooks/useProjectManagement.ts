/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { createProject, updateProject } from '@/action/project'
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
import { projectServices } from '@/services'

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
  sort?: sortInterface<ProjectInterface>[]
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
  
    mutation.mutate(normalizedData);
  };
  
  return {
    onSubmit,
    form,
    isPending: mutation.isPending,
  }
}

