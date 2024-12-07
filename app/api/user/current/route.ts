
import { jwtVerify } from "jose"; 
import { dbConnect } from "@/lib";
import { NextResponse } from "next/server";
import { UserModel } from "@/model";
export const dynamic = "force-dynamic";
export const GET = async (req: Request) => {
    await dbConnect();
  
    try {
        const authorization = req.headers.get('Authorization');
        if (!authorization) {
            return NextResponse.json({ message: 'Authorization header missing' }, { status: 401 });
        }
        
        const token = authorization.split(' ')[1]; 
        
        if (!token) {
            return NextResponse.json({ message: 'Token missing' }, { status: 401 });
        }

        const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);
        
        const userId = payload.id;
        if (!userId) {
            return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error('Error verifying token:', error);
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
};
