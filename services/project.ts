/* eslint-disable @typescript-eslint/no-explicit-any */
import requests from "@/lib/api";
import { filterInterface, ProjectInterface, sortInterface, UsersInterface } from "@/types";
import { deleteApiResponse, ProjectsResponse, UsersResponse } from "@/types/api";

export const projectServices = {
    getListProjects: async ({
        page,
        limit,
        filter,
        sort,
        search,
    }: {
        page?: number;
        limit?: number; 
        filter?: filterInterface<ProjectInterface>[];
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
    
        const res = await requests.post<ProjectsResponse, any>(`/project?action=get&${queryParams.toString()}`, body, true);
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

    createUser: async (data: any) => {
        const res = await requests.post<any, any>(`/user?action=create`, data, true,true);
        return res;
    },

    updateUser: async (data: any, id: string) => {
        const res = await requests.put<any, any>(`/user?id=${id}`, data, true);
        return res;
    },


};
