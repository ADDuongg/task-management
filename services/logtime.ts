/* eslint-disable @typescript-eslint/no-explicit-any */
import requests from "@/lib/api";
import { filterInterface, LogtimeInterface, sortInterface, TaskInterface } from "@/types";
import { LogtimeResponse, TasksResponse } from "@/types/api";

export const logtimeServices = {
    getListLogtime: async ({
        page,
        limit,
        filter,
        sort,
        search,
    }: {
        page?: number;
        limit?: number; 
        filter?: filterInterface<LogtimeInterface>[];
        sort?: sortInterface<LogtimeInterface>[];
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
    
        const res = await requests.post<LogtimeResponse, any>(`/logtime?${queryParams.toString()}`, body, true);
        return res;
    },
    

    /* getTaskById: async (id: string) => {
        const res = await requests.get<TaskInterface, any>(`/task?id=${id}`, true);
        return res;
    },

    createTask: async (data: any) => {
        const res = await requests.post<any, any>(`/task?action=create`, data, true,true);
        return res;
    }, */


};
