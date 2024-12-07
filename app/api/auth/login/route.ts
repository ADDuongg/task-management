'use server'

import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { dbConnect } from "@/lib";
import { SignJWT } from "jose";
import { UserModel } from "@/model";
export const POST = async (req: Request) => {
    await dbConnect();
    try {
      const { email, password } = await req.json();
  
      const user = await UserModel.findOne({ email });
  
      if (!user) {
        return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
      }
  
      const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
      const token = await new SignJWT({ id: user._id, email: user.email })
          .setProtectedHeader({ alg: 'HS256' }) 
          .setExpirationTime('72h') 
          .sign(secret); 
      
      return NextResponse.json({ token, user });
    } catch (error) {
      console.error('Login error:', error);
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
  };