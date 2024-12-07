/* eslint-disable @typescript-eslint/no-explicit-any */
import requests from "@/lib/api";
import { MessageResponse, RoomsResponse } from "@/types/api";

export const roomMessageServices = {
    getListRoom: async ({
        search,
    }: {
        search?: string;
    }) => {
        const queryParams = new URLSearchParams();
        if (search) {
            queryParams.append('search', search);
        }
    
        const res = await requests.get<RoomsResponse, any>(`/room?${queryParams.toString()}`, true);
        return res;
    },
}

export const messageServices = {
    getListMessage: async ({
        search,
    }: {
        search?: string;
    }) => {
        const queryParams = new URLSearchParams();
        if (search) {
            queryParams.append('search', search);
        }
    
        const res = await requests.get<MessageResponse, any>(`/message?${queryParams.toString()}`, true);
        return res;
    },
}