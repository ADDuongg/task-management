import { messageServices, roomMessageServices } from "@/services";
import { MessageResponse, RoomsResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";


export const useListOfMessage = ({
    search,
  }: {
    search?: string
  }) => {
    const { data, error, isLoading } = useQuery<MessageResponse>({
      queryKey: ['messages', 'all',search],
      queryFn: async () =>
      {
        return await messageServices.getListMessage({});
      }
    })
    return {
      listMessage: data?.messageResponse || [],
      error,
      isLoading,
    }
  }