import { dbConnect } from "@/lib";
import { MessageModel } from "@/model";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  await dbConnect();

  try {
    const authorization = request.headers.get('Authorization');
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

    const messages = await MessageModel.find()
      .populate('messages.sender', 'username avatar')
      .populate('messages.readBy')  
      .sort({ 'createdAt': -1 }); 

    if (!messages || messages.length === 0) {
      return NextResponse.json({ message: 'No messages found' }, { status: 404 });
    }

    return NextResponse.json(
      { messageResponse: messages },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
};
