/* eslint-disable @typescript-eslint/no-explicit-any */
import requests from "@/lib/api";
import { filterInterface, sortInterface, TaskInterface, UsersInterface } from "@/types";
import { deleteApiResponse, TasksResponse } from "@/types/api";

export const taskServices = {
    getListTasks: async ({
        page,
        limit,
        filter,
        sort,
        search,
    }: {
        page?: number;
        limit?: number; 
        filter?: filterInterface<TaskInterface>[];
        sort?: sortInterface[];
        search?: string;
    }) => {
        const queryParams = new URLSearchParams();
        if (page !== undefined) {
            queryParams.append('page', page.toString());
        } else {
            queryParams.append('page', '1'); 
        }
        if (limit) {
            queryParams.append('limit', limit.toString());
        }
    
        if (search) {
            queryParams.append('search', search);
        }
    
        const body = JSON.stringify({
            filter,
            sort,
        });
    
        const res = await requests.post<TasksResponse, any>(`/task?action=get&${queryParams.toString()}`, body, true);
        return res;
    },
    

    getCurrentUser: async () => {
        const res = await requests.get<UsersInterface, any>('/user/current', true);
        return res;
    },

    getListUsersRole: async () => {
        const res = await requests.get<any, any>('/user/account_role', true);
        return res;
    },

    deleteUser: async (id: number) => {
        const res = await requests.delete<deleteApiResponse>(`/user?id=${id}`, true);
        return res;
    },

    createTask: async (data: any) => {
        const res = await requests.post<any, any>(`/task?action=create`, data, true,true);
        return res;
    },

    updateUser: async (data: any, id: string) => {
        const res = await requests.put<any, any>(`/user?id=${id}`, data, true);
        return res;
    },


};
