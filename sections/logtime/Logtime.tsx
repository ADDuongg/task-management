'use client'

import React, { useState } from 'react'

import { Button, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useAtomValue } from 'jotai'
import moment from 'moment'

import { Typography } from '@/components'
import { useListOfLogtime } from '@/hooks/useLogtime'
import { currentUserState } from '@/states/users'
import { isAdminRole } from '@/utils/commons'

interface Task {
  taskName: string
  timeLogtime: string
  dateLogtime: string
}

interface DateInfo {
  date: Date
  year: number
  month: number
  day: number
}

interface TaskRow {
  key: string
  taskName: string
  [key: string]: any // Dynamically added day columns
}

const isLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

const getDaysInMonth = (month: number, year: number): number => {
  switch (month) {
    case 0: // January
    case 2: // March
    case 4: // May
    case 6: // July
    case 7: // August
    case 9: // October
    case 11: // December
      return 31
    case 3: // April
    case 5: // June
    case 8: // September
    case 10: // November
      return 30
    case 1: // February
      return isLeapYear(year) ? 29 : 28
    default:
      return 0
  }
}

const generateDates = (year: number, month: number): DateInfo[] => {
  const dates: DateInfo[] = []
  const daysInMonth = getDaysInMonth(month, year)
  for (let day = 1; day <= daysInMonth; day++) {
    dates.push({
      date: new Date(year, month, day),
      year,
      month,
      day,
    })
  }
  return dates
}

export const Logtime: React.FC = () => {
  const currentDate = new Date()
  const userValue = useAtomValue(currentUserState)
  const [currentYear, setCurrentYear] = useState<number>(
    currentDate.getFullYear(),
  )
  const [currentMonth, setCurrentMonth] = useState<number>(
    currentDate.getMonth(),
  )
  const { listOfLogtime, pagination, isLoading } = useListOfLogtime({
    isPagination: false,
    currentUserId: userValue && isAdminRole(userValue),
  })
  const dates = generateDates(currentYear, currentMonth)
  const tasks =
    listOfLogtime?.map((logtime) => ({
      taskName: logtime.taskId.subject,
      timeLogtime: logtime.timeLogtime,
      dateLogtime: moment(logtime.dateLogtime).format('DD/MM/YYYY'),
    })) || []

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  // Table Columns
  const columns: ColumnsType<TaskRow> = [
    {
      title: 'Task Name',
      dataIndex: 'taskName',
      key: 'taskName',
      fixed: 'left',
      render: (taskName: string) => (
        <div className="flex gap-x-3 items-center">
          <div className="w-full">
            <div className="flex gap-x-3">
              <div className="text-sm font-bold">{taskName}</div>
            </div>
          </div>
        </div>
      ),
      width: 150,
    },
    ...dates.map((date) => ({
      title: date.day.toString(),
      dataIndex: `day_${date.day}`,
      key: `day_${date.day}`,
      align: 'center' as const,
      render: (tasksForDay: Task[] | number | undefined) => {
        if (Array.isArray(tasksForDay)) {
          return tasksForDay.map((task, idx) => (
            <div key={idx}>{task.timeLogtime}</div>
          ))
        } else if (typeof tasksForDay === 'number') {
          return <div>{tasksForDay}</div>
        }
        return ''
      },
    })),
  ]
  const dataSource: TaskRow[] = tasks.map((task) => {
    const taskRow: TaskRow = { key: task.taskName, taskName: task.taskName }

    dates.forEach((date) => {
      const formattedDate = `${date.day.toString().padStart(2, '0')}/${(
        currentMonth + 1
      )
        .toString()
        .padStart(2, '0')}/${currentYear}`

      taskRow[`day_${date.day}`] =
        task.dateLogtime === formattedDate ? [task] : []
    })

    return taskRow
  })
  const totalRow: TaskRow = { key: 'total', taskName: 'Total' }

  dates.forEach((date) => {
    const formattedDate = `${date.day.toString().padStart(2, '0')}/${(
      currentMonth + 1
    )
      .toString()
      .padStart(2, '0')}/${currentYear}`

    const totalForDay =
      tasks &&
      tasks
        .filter((task) => task.dateLogtime === formattedDate)
        .reduce((sum, task) => sum + Number(task.timeLogtime), 0)

    totalRow[`day_${date.day}`] = totalForDay || ''
  })

  console.log('data', [...dataSource, totalRow])

  return (
    <div className="space-y-5">
      <Typography text="Logtime Calendar" fontWeight={true} />
      <div style={{ marginBottom: 16 }}>
        <Button onClick={handlePrevMonth}>Prev</Button>
        <span className="dark:text-white" style={{ margin: '0 10px' }}>
          {`${currentMonth + 1}/${currentYear}`}
        </span>
        <Button onClick={handleNextMonth}>Next</Button>
      </div>
      <Table
        columns={columns}
        dataSource={[...dataSource, totalRow]}
        bordered
        scroll={{ x: 'max-content' }}
        pagination={false}
      />
    </div>
  )
}
