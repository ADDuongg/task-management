import { dbConnect } from '@/lib'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { UserModel } from '@/model'
export const POST = async (req: Request) => {
  await dbConnect()

  const body = await req.json()
  const { newPassword, email } = body


  const user = await UserModel.findOne({ email })

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 })
  }
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(newPassword, salt)
  user.password = hashedPassword;  
  await user.save();

  return NextResponse.json({ message: "Reset password successfully" }, { status: 200 })
}
