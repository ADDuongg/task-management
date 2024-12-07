import { dbConnect } from "@/lib";
import { RoomModel } from "@/model";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    await dbConnect()
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
  
      const rooms = await RoomModel.find().populate('participants').populate('creator').populate('latestMessage')
    if (!rooms) {
      return NextResponse.json({ message: 'Room not found' }, { status: 404 })
    }
    const roomsWithLatestMessage = await Promise.all(rooms.map(async (room) => {
      if (room.latestMessage && typeof room.latestMessage !== 'string' && room.latestMessage.messages) {
        room.latestMessage.messages.sort((a, b) => {
          return (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0); 
        });
      }
      return room;
    }));
      return NextResponse.json(
        { rooms: roomsWithLatestMessage },
        { status: 200 },
      )
  } catch (error) {
      console.error('Error verifying token:', error);
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
    
  }