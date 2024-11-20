/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { v2 as cloudinary } from 'cloudinary'
import { NextRequest, NextResponse } from 'next/server'

import { dbConnect } from '@/lib'
import ProjectModel from '@/model/project'
import { ProjectInterface, filterInterface, sortInterface } from '@/types'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const POST = async (request: NextRequest) => {
  const url = new URL(request.url)
  const action = url.searchParams.get('action') || ''
  console.log(action)

  if (action !== 'create') {
    try {
      await dbConnect()
      const page = Number(url.searchParams.get('page')) || 1
      const limit = Number(url.searchParams.get('limit')) || 10
      const search = url.searchParams.get('search') || ''

      const {
        filter,
        sort,
      }: {
        filter: filterInterface<ProjectInterface>[]
        sort: sortInterface[]
      } = await request.json()

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
        finalFilterQuery['projectName'] = { $regex: search, $options: 'i' }
      }
      console.log(finalFilterQuery);
      const totalRecords = await ProjectModel.countDocuments(finalFilterQuery)
      const projects = await ProjectModel.find(finalFilterQuery)
        .populate('userId')
        .populate('taskId')
        .sort(sortQuery)
        .skip((page - 1) * limit)
        .limit(limit)
        .exec()

      const totalPages = Math.ceil(totalRecords / limit)
      return NextResponse.json(
        {
          projects,
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
          message: 'Error fetching project',
          error: error.message,
        }),
        { status: 500 },
      )
    }
  } else {
    await dbConnect()
    try {
      const { projectName, userId, taskId } = await request.json()
        console.log(userId);
        
      const existingProject = await ProjectModel.findOne({
        $or: [{ projectName }],
      })

      if (existingProject) {
        return NextResponse.json(
          { message: 'This project subject already have' },
          { status: 400 },
        )
      }
      const project = new ProjectModel({
        projectName,
        taskId: taskId.map(String) as string[],
        userId: userId.map(String) as string[],
      })

      await project.save()

      return NextResponse.json({
        message: 'Project created successfully',
      })
    } catch (error) {
      console.error('Error creating project:', error)
      return NextResponse.json(
        { message: 'Failed to create project' },
        { status: 500 },
      )
    }
  }
}
