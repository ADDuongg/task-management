'use client'

import React from 'react'
import { Line } from 'react-chartjs-2'

import { Calendar } from 'antd'
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { useAtomValue } from 'jotai'

import {
  Header,
  RunningTask,
  SwipperTask,
  SwipperUsers,
  Typography,
} from '@/components'
import { TaskCard } from '@/components/TaskCard'
import { useListOfUserManagement } from '@/hooks/useUserManagement'
import { dataTask } from '@/states/task'

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
)

const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
const data = {
  labels: labels,
  datasets: [
    {
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
  ],
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Line Chart Example',
    },
  },
}

const App = () => {
  const tasks = useAtomValue(dataTask)
  const { listOfUserManagement } = useListOfUserManagement({})

  return (
    <div className="flex xl:flex-row flex-col justify-between h-full xl:space-y-0 space-y-5">
      <div className="xl:w-[calc(100%-450px)] w-full space-y-5 xl:h-full h-auto">
        <Header bg="graySmall-200" />
        <div className="w-full sm:h-[200px] h-auto flex sm:flex-row flex-col">
          <div className="sm:w-[200px] w-full">
            <RunningTask />
          </div>
          <div className="flex flex-col sm:w-[calc(100%-200px)] w-full sm:ps-10">
            <Line data={data} options={options} />
          </div>
        </div>

        <div className="space-y-3">
          <Typography text="Mentors" fontWeight={true} />
          <SwipperUsers data={listOfUserManagement} />
        </div>

        <div className="space-y-3">
          <Typography text="Upcoming tasks" fontWeight={true} />
          <SwipperTask data={tasks} />
        </div>
      </div>

      <div className="xl:w-[450px] w-full bg-graySmall-200 xl:ps-5 space-y-5 xl:h-full h-auto">
        <Calendar fullscreen={false} />

        <div className="rounded-lg bg-white">
          {tasks.length > 0 && <TaskCard task={tasks[0]} detailTask={true} />}
        </div>
      </div>
    </div>
  )
}

export default App
