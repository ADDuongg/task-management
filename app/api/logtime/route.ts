import { NextRequest, NextResponse } from 'next/server'
import { dbConnect } from '@/lib'
import { LogtimeModel } from '@/model/logtime'
import { TaskModel } from '@/model/task' // Model của collection taskId
import { LogtimeInterface, filterInterface, sortInterface } from '@/types'

export const POST = async (request: NextRequest) => {
  const url = new URL(request.url)
  try {
    await dbConnect()
    const page = Number(url.searchParams.get('page')) || 1
    const limit = Number(url.searchParams.get('limit')) || 10
    const search = url.searchParams.get('search') || ''

    const {
      filter,
      sort,
    }: {
      filter: filterInterface<LogtimeInterface>[]
      sort: sortInterface<LogtimeInterface>[]
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
      const taskIds = await TaskModel.find({ subject: { $regex: search, $options: 'i' } }).select('_id')
      const taskIdArray = taskIds.map((task) => task._id)

      finalFilterQuery['taskId'] = { $in: taskIdArray }
    }

    const totalRecords = await LogtimeModel.countDocuments(finalFilterQuery)
    const logtime = await LogtimeModel.find(finalFilterQuery)
      .populate('userId')
      .populate({
        path: 'taskId',
      })
      .sort(sortQuery)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec()

    const totalPages = Math.ceil(totalRecords / limit)
    return NextResponse.json(
      {
        logtime,
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
        message: 'Error fetching logtime',
        error: error.message,
      }),
      { status: 500 },
    )
  }
}
