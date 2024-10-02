import axios, { AxiosProgressEvent, AxiosRequestConfig, CancelToken } from "axios";
import Cookie from 'js-cookie';

const requests = {
    get: async <T>(url: string, header = false, cancelToken?: CancelToken): Promise<T> => {
        const token = Cookie.get('token');
        const config: AxiosRequestConfig = {
            method: 'get',
            url: `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`,
            cancelToken,
        };

        if (header && token) {
            config.headers = {
                Authorization: `Bearer ${token}`,
            };
        }

        const response = await axios(config);
        return response.data as T;
    },

    post: async <T, B>(url: string, body: B, header = false, onUploadProgress?: (progressEvent: AxiosProgressEvent) => void, signal?: AbortSignal, cancelToken?: CancelToken): Promise<T> => {
        const token = Cookie.get('token');
        const config: AxiosRequestConfig = {
            method: 'post',
            url: `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`,
            data: body, 
        };

        if (header && token) {
            config.headers = {
                Authorization: `Bearer ${token}`,
            };
        }
        if (onUploadProgress) {
            config.onUploadProgress = onUploadProgress;
        }
        if (cancelToken) {
            config.cancelToken = cancelToken;
        }
        if (signal) {
            config.signal = signal;
        }

        const response = await axios(config);
        return response.data as T; 
    },

    delete: async <T>(url: string): Promise<T> => {
        const token = Cookie.get('token');
        const config: AxiosRequestConfig = {
            method: 'delete',
            url: `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`,
        };
        if (token) {
            config.headers = {
                Authorization: `Bearer ${token}`,
            };
        }

        const response = await axios(config);
        return response.data as T; 
    },

    put: async <T, B>(url: string, body: B, header = false): Promise<T> => {
        const token = Cookie.get('token');
        const config: AxiosRequestConfig = {
            method: 'put',
            url: `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`,
            data: body, 
        };

        if (header && token) {
            config.headers = {
                Authorization: `Bearer ${token}`,
            };
        }

        const response = await axios(config);
        return response.data as T; 
    },

    patch: async <T, B>(url: string, body: B, header = false): Promise<T> => {
        const token = Cookie.get('token');
        const config: AxiosRequestConfig = {
            method: 'patch',
            url: `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`,
            data: body, 
        };

        if (header && token) {
            config.headers = {
                Authorization: `Bearer ${token}`,
            };
        }

        const response = await axios(config);
        return response.data as T; 
    },
};

export default requests;
