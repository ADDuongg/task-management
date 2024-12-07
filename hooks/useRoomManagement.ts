/* eslint-disable @typescript-eslint/no-explicit-any */
import { createRoom } from "@/action"
import { roomMessageServices } from "@/services"
import { ActionData, RoomsFormRequest } from "@/types"
import { RoomsResponse } from "@/types/api"
import { addAlert } from "@/utils/commons"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { z } from "zod"

export const useListOfRoom = ({
    search,
  }: {
    search?: string
  }) => {
    const { data, error, isLoading } = useQuery<RoomsResponse>({
      queryKey: ['rooms', 'all',search],
      queryFn: async () =>
      {
        return await roomMessageServices.getListRoom({});
      }
    })
    return {
      listRoom: data?.rooms || [],
      error,
      isLoading,
    }
  }

export const useRoomMessage = (action: ActionData, onClose?: () => void) => {
  const roomMessageSchema = z
    .object({
      roomName: z.string().min(1),
      participants: z
      .array(
        z.union([
          z.string(), 
          z.object({ label: z.string().optional(), value: z.string().optional() })
        ])
      ).min(1, 'At least one user is required'),
    })
    const form = useForm<RoomsFormRequest>({
      resolver: zodResolver(roomMessageSchema),
    })

    const queryClient = useQueryClient()
    const mutation = useMutation({
    mutationFn: async (data: RoomsFormRequest) => {
      switch (action) {
        case ActionData.CREATE:
          return await createRoom(data)
        default:
          throw new Error(`Invalid action: ${action}`)
      }
    },
    onSuccess: async (res: any) => {
      await queryClient.invalidateQueries({
        queryKey: ['rooms', 'all'].map(String),
      })
      addAlert({ type: 'success', content: res.message })
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'An error occurred'
      addAlert({ type: 'error', content: errorMessage })
    },
  })

  const onSubmit = async (data: RoomsFormRequest) => {
    const normalizedParticipants = data.participants.map((item) => {
      if (typeof item === 'string') {
        return item; 
      } else if ('_id' in item) {
        return item._id; 
      } else {
        return item.value; 
      }
    });
  
    const normalizedData: RoomsFormRequest = {
      ...data,
      participants: normalizedParticipants,
    };
    await mutation.mutate(normalizedData);
    onClose && onClose();
    form.reset();
  };

    return {
      form,
      onSubmit,
      isPending: mutation.isPending
    }
  }