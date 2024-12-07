'use server'
import { cookies } from "next/headers";

export const getToken = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;
  return token || null;
}