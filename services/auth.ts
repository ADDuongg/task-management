/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import { registerInterface, UsersInterface } from '@/types';
import Cookie from 'js-cookie';
import requests from '@/lib/api';
import { ApiResponse, AuthResponse } from '@/types/api';

export const loginUser = async (email: string, password: string): Promise<any> => {
  try {
    const response = await axios.post<{ token: string, user: UsersInterface }>(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL}/auth/login`,
      { email, password }
    );

    const token = response.data.token;
    Cookie.set('token', token, {
      expires: 7,
      secure: true,
      sameSite: 'strict',
    });
    
    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Login failed! Please check your credentials.');
    } else {
      throw new Error('An unexpected error occurred.');
    }
  }
};

export const registerUser = (data: registerInterface): Promise<AuthResponse> => {
  const { email, password, phone_number, username } = data;
  return new Promise(async (resolve,reject) => {
    try {
      const response = await requests.post<AuthResponse, registerInterface>(
        `/auth/register`,
        { email, password, phone_number, username }
      );
  
      const token = response.token;
      
      if (token) {
        Cookie.set('token', token, {
          expires: 7,
          secure: true,
          sameSite: 'strict',
        });
      }
  
      resolve(response); 
    } catch (error: unknown) {
      reject(error)
    }
  })
};

export const forgotPassword = (email: string): Promise<ApiResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await requests.post<ApiResponse, string>(
        `/auth/forgotpass`,
        JSON.stringify({ email })
      );
      resolve(response);
    } catch (error: unknown) {
      reject(error);
    }
  });
};

export const resetPassword = (email: string, newPassword: string): Promise<ApiResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await requests.post<ApiResponse, string>(
        `/auth/resetpass`,
        JSON.stringify({ email, newPassword })
      );
      resolve(response);
    } catch (error: unknown) {
      reject(error);
    }
  });
};

export const logoutUser = (): void => {
  Cookie.remove('token');
};

