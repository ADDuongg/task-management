'use client'

import React from 'react'
import { Line } from 'react-chartjs-2'

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

import { RunningTask } from '@/components'

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

const ChartComponent = () => {
  return (
    <div className="w-full sm:h-[200px] h-auto flex sm:flex-row flex-col dark:bg-black pt-5 px-3 bg-graySmall-100">
      <div className="sm:w-[200px] w-full">
        <RunningTask />
      </div>
      <div className="flex flex-col sm:w-[calc(100%-200px)] w-full sm:ps-10">
        <Line data={data} options={options} />
      </div>
    </div>
  )
}

export default ChartComponent
