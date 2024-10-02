/* eslint-disable @typescript-eslint/no-explicit-any */
import { dbConnect } from "@/lib";
import UserModel from "@/model/user";

export const GET = async () => {
  try {
    await dbConnect()
    const users = await UserModel.find();

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: 'Error fetching users', error: error.message }), { status: 500 });
  }
};
