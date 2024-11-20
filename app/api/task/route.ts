/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { dbConnect } from '@/lib'
import TaskModel from '@/model/task'
import { TaskInterface, filterInterface, sortInterface } from '@/types'
import { uploadImageToCloudinary } from '@/utils/cloudinary'

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
      }: { filter: filterInterface<TaskInterface>[]; sort: sortInterface[] } =
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
        filterQuery.length > 0 ? { $or: filterQuery } : {}

      if (search) {
        finalFilterQuery['subject'] = { $regex: search, $options: 'i' }
      }
      console.log(finalFilterQuery);
      
      const totalRecords = await TaskModel.countDocuments(finalFilterQuery)
      const tasks = await TaskModel.find(finalFilterQuery)
      // .populate('userId')
      .populate('assignTo')
      .populate('taskOwner')
      .sort(sortQuery)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec()
    

      const totalPages = Math.ceil(totalRecords / limit)
      return NextResponse.json(
        {
          tasks,
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
          message: 'Error fetching tasks',
          error: error.message,
        }),
        { status: 500 },
      )
    }
  } else {
    await dbConnect()
    try {
      const formData = await request.formData()
      const files: File[] = formData.getAll('files') as unknown as File[]
      const subject = formData.get('subject') as string
      const done = formData.get('done') as string
      const startDate = formData.get('startDate') as string
      const dueDate = formData.get('dueDate') as string
      const assignTo = formData.get('assignTo') as string
      const status = formData.get('status') as string
      const descriptions = formData.get('descriptions') as string | null
      const workToDo = formData.getAll('workToDo') as string[]
      const taskOwner = formData.get('taskOwner') as string
      const estimateTime = formData.get('estimateTime') as string
      // const userId = formData.getAll('userId') as string[]
      // console.log(userId)

      const existingUser = await TaskModel.findOne({
        $or: [{ subject }],
      })

      if (existingUser) {
        return NextResponse.json(
          { message: 'This task subject already have' },
          { status: 400 },
        )
      }
      const imgUrls = await Promise.all(files.map(uploadImageToCloudinary))

      const task = new TaskModel({
        assignTo,
        descriptions,
        done,
        dueDate,
        estimateTime,
        files: imgUrls,
        startDate,
        status,
        subject,
        taskOwner,
        // userId,
        workToDo,
      })

      await task.save()

      return NextResponse.json({
        message: 'Task created successfully',
      })
    } catch (error) {
      console.error('Error creating task:', error)
      return NextResponse.json(
        { message: 'Failed to create task' },
        { status: 500 },
      )
    }
  }
}
