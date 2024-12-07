/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import { jwtVerify } from 'jose';
import { MessageModel, RoomModel } from "@/model";
import { RoomsFormRequest } from "@/types";
import { convertMongoToPlainObject } from "@/utils/commons";
import { cookies } from "next/headers";

export const createRoom = async (data: RoomsFormRequest) => {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    throw new Error("Token not found");
  }

  let decodedToken: any;

  try {
    const secretKey = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET || 'SECRET_KEY');

    const { payload } = await jwtVerify(token, secretKey);
    decodedToken = payload;
    console.log("Decoded token:", decodedToken);
  } catch (error) {
    console.error("Invalid token:", error);
    throw new Error("Invalid token");
  }

  try {
    const participantsSet = new Set(data.participants as string[]);
    participantsSet.add(decodedToken.id);
    console.log('decodedToken', decodedToken);
    
    const existingRoom = await RoomModel.findOne({ roomName: data.roomName });
    if (existingRoom) {
      return {
        message: 'Room already exists',
        status: 400,
      };
    }

    const newRoom = new RoomModel({
      roomName: data.roomName,
      participants: Array.from(participantsSet),
      creator: decodedToken.id,
    });

    const savedRoom = await newRoom.save();
    const plainRoom = convertMongoToPlainObject(savedRoom);
    return {
      room: plainRoom,
      message: 'Create room successfully',
    };  
  } catch (error) {
    console.error("Error creating room:", error);
    throw new Error("Unable to create room");
  }
};

export const deleteRoom = async (id: string) => {
  try {
    const deletedRoom = await RoomModel.findByIdAndDelete(id);
    await MessageModel.findOneAndDelete({
      roomId: id,
    });
    if (!deletedRoom) {
      throw new Error('Room not found');
    }

    return {
      message: 'Room deleted successfully',
    };
  } catch (error) {
    console.error(error);
    throw new Error('Unable to delete room');
  }
};

