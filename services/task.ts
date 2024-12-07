/* eslint-disable @typescript-eslint/no-explicit-any */
import requests from "@/lib/api";
import { filterInterface, sortInterface, TaskInterface } from "@/types";
import { TasksResponse } from "@/types/api";

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
        sort?: sortInterface<TaskInterface>[];
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
    

    getTaskById: async (id: string) => {
        const res = await requests.get<TaskInterface, any>(`/task?id=${id}`, true);
        return res;
    },

    createTask: async (data: any) => {
        const res = await requests.post<any, any>(`/task?action=create`, data, true,true);
        return res;
    },



};
