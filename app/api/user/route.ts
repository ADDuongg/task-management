/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

import { dbConnect } from '@/lib'
import { RoleEnum, UsersInterface, filterInterface, sortInterface } from '@/types'
import { deleteImageToCloudinary, getPublicIdFromUrl, uploadImageToCloudinary } from '@/utils/cloudinary'
import { UserModel } from '@/model'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const POST = async (request: NextRequest) => {
  const url = new URL(request.url)
  const action = url.searchParams.get('action') || ''
  if (action !== 'create') {
    try {
      await dbConnect()
      const page = Number(url.searchParams.get('page')) || 1
      const limit = Number(url.searchParams.get('limit')) || 10
      const search = url.searchParams.get('search') || ''

      const {
        filter,
        sort,
      }: { filter: filterInterface<UsersInterface>[]; sort: sortInterface<UsersInterface>[] } =
        await request.json()

      const filterQuery: Record<string, any>[] = []
      if (filter && filter.length > 0) {
        filter.forEach(({ field, value }) => {
          const condition: Record<string, any> = {}
          if (Array.isArray(value)) {
            condition[field] = { $in: value }
          } else {
            condition[field] = value
          }
          filterQuery.push(condition)
        })
      }
      
      const sortQuery: Record<string, any> = {}
      if (sort && sort.length > 0) {
        sort.forEach((item) => {
          const { field, order } = item
          sortQuery[field] = order === 'asc' ? 1 : -1
        })
      }
      const finalFilterQuery: Record<string, any> =
        filterQuery.length > 0 ? { $and: filterQuery } : {}

      if (search) {
        finalFilterQuery['$or'] = [
          {'email': { $regex: search, $options: 'i' }},
          {'username': { $regex: search, $options: 'i' }}
        ]
      }
      const totalRecords = await UserModel.countDocuments(finalFilterQuery)
      const users = await UserModel.find(finalFilterQuery)
        .sort(sortQuery)
        .skip((page - 1) * limit)
        .limit(limit)

      const totalPages = Math.ceil(totalRecords / limit)
      return NextResponse.json(
        {
          users,
          pagination: {
            totalRecords,
            totalPages,
            currentPage: page,
            pageSize: limit,
          },
        },
        { status: 200 },
      )
    } catch (error: any) {
      return new Response(
        JSON.stringify({
          message: 'Error fetching users',
          error: error.message,
        }),
        { status: 500 },
      )
    }
  } else {
    await dbConnect()

    try {
      const formData = await request.formData()
      const email = formData.get('email') as string
      const username = formData.get('username') as string
      const password = formData.get('password') as string
      const specialization = formData.get('specialization') as string | null
      const position = formData.get('position') as string | null
      const description = formData.get('description') as string | null
      const phone_number = formData.get('phone_number') as string | null
      const skills = formData.getAll('skills') as string[]
      const avatar: File = formData.get('avatar') as unknown as File
      const date = formData.get('date') as string | null

      const existingUser = await UserModel.findOne({
        $or: [{ email }, { username }],
      })

      if (existingUser) {
        return NextResponse.json(
          { message: 'Email or Username already exists' },
          { status: 400 },
        )
      }

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      const imageUrl = await uploadImageToCloudinary(avatar);

      const user = new UserModel({
        email,
        username,
        account_role: 'user',
        password: hashedPassword,
        specialization,
        position,
        description,
        phone_number,
        skills,
        avatar: imageUrl,
        date,
      } as UsersInterface)

      await user.save()
      const jwtSecret = process.env.NEXT_PUBLIC_JWT_SECRET || 'default_secret';
      const token = jwt.sign(
        { id: user._id, email: user.email }, jwtSecret, { expiresIn: '1h' },
      )
      return NextResponse.json({
        message: 'User created successfully',
        user,
        token,
      })
    } catch (error) {
      console.error('Error creating user:', error)
      return NextResponse.json(
        { message: 'Failed to create user' },
        { status: 500 },
      )
    }
  }
}

export const DELETE = async (request: NextRequest) => {
  try {
    await dbConnect()
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('id')
    const user = await UserModel.findById(userId)
    if (!userId) {
      return NextResponse.json(
        { message: 'User ID is required' },
        { status: 400 },
      )
    }
    const oldAvatar = getPublicIdFromUrl(user?.avatar || '')
    oldAvatar && deleteImageToCloudinary(oldAvatar)
    const deletedUser = await UserModel.findByIdAndDelete(userId)

    if (!deletedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(
      { message: 'User deleted successfully' },
      { status: 200 },
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    )
  }
}

export const PUT = async (request: NextRequest) => {
  await dbConnect()
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('id')
    const formData = await request.formData()
    const email = formData.get('email') as string
    const username = formData.get('username') as string
    const password = formData.get('password') as string
    const account_role = formData.get('account_role') as string
    const specialization = formData.get('specialization') as string | null
    const position = formData.get('position') as string | null
    const description = formData.get('description') as string | null
    const phone_number = formData.get('phone_number') as string | null
    const skills = formData.getAll('skills') as string[]
    const avatar: File | string = formData.get('avatar') as unknown as File | string
    const date = formData.get('date') as string | null
    const user = await UserModel.findById(userId)
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }
    const existingUserWithEmail = await UserModel.findOne({ email })
    const existingUserWithUsername = await UserModel.findOne({ username })

    if (
      existingUserWithEmail &&
      existingUserWithEmail._id.toString() !== userId
    ) {
      return NextResponse.json(
        { message: 'Email already exists' },
        { status: 400 },
      )
    }

    if (
      existingUserWithUsername &&
      existingUserWithUsername._id.toString() !== userId
    ) {
      return NextResponse.json(
        { message: 'Username already exists' },
        { status: 400 },
      )
    }
    user.email = email || user.email
    user.username = username || user.username
    user.account_role = (account_role as RoleEnum) || user.account_role;
    user.specialization = specialization || user.specialization
    user.position = position || user.position
    user.description = description || user.description
    user.phone_number = phone_number || user.phone_number
    user.skills = skills || user.skills
    user.date = date || user.date
    
    if (password) {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
      user.password = hashedPassword
    }
    
    if (avatar) {
      if(user.avatar !== avatar){
        const imageUrl = await uploadImageToCloudinary(avatar)
        await deleteImageToCloudinary(user.avatar || '')
        user.avatar = imageUrl
      }

    }

    const updatedUser = await user.save()

    return NextResponse.json(
      { message: 'User updated successfully', user: updatedUser },
      { status: 200 },
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'An error occurred while updating user', error },
      { status: 500 },
    )
  }
}


export const GET = async (request: NextRequest) => {
  await dbConnect()
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('id')
    const user = await UserModel.findById(userId)
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }
    return NextResponse.json({
      user,
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
