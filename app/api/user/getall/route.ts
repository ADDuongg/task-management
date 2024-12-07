import { dbConnect } from "@/lib"
import { UserModel } from "@/model"
import { NextResponse } from "next/server"

export const GET = async () => {
    await dbConnect()
    try {
      const users = await UserModel.find()
      if (!users) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 })
      }
      return NextResponse.json({
        users,
        status: 200
      })
    } catch (error) {
      console.error(error)
      return NextResponse.json(
        { message: 'An error occurred while fetching user', error },
        { status: 500 },
      )
    }
  }