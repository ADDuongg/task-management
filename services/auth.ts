/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import { registerInterface } from '@/types';
import Cookie from 'js-cookie';
import requests from '@/lib/api';
import { apiResponse, authResponse } from '@/types/api';

export const loginUser = async (email: string, password: string): Promise<string> => {
  try {
    const response = await axios.post<{ token: string }>(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL}/auth/login`,
      { email, password }
    );

    const token = response.data.token;
    Cookie.set('token', token, {
      expires: 7,
      secure: true,
      sameSite: 'strict',
    });

    return token;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Login failed! Please check your credentials.');
    } else {
      throw new Error('An unexpected error occurred.');
    }
  }
};

export const registerUser = (data: registerInterface): Promise<authResponse> => {
  const { email, password, phone_number, username } = data;
  return new Promise(async (resolve,reject) => {
    try {
      const response = await requests.post<authResponse, registerInterface>(
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

export const forgotPassword = (email: string): Promise<apiResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await requests.post<apiResponse, string>(
        `/auth/forgotpass`,
        JSON.stringify({ email })
      );
      resolve(response);
    } catch (error: unknown) {
      reject(error);
    }
  });
};

export const resetPassword = (email: string, newPassword: string): Promise<apiResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await requests.post<apiResponse, string>(
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

