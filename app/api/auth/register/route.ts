import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'

import { dbConnect } from '@/lib/dbConnect'
import UserModel, { IUser } from '@/model/user'

export const POST = async (req: Request) => {
  await dbConnect()

  try {
    const body = await req.json()

    const existingUser = await UserModel.findOne({
      $or: [{ email: body.email }, { username: body.username }],
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email or Username already exists' },
        { status: 400 },
      )
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(body.password, salt)

    const user = new UserModel({
      ...body,
      account_role: 0,
      password: hashedPassword,
    } as IUser)

    await user.save()
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    )
    return NextResponse.json({
      message: 'User created successfully',
      user,
      token,
    })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 },
    )
  }
}
