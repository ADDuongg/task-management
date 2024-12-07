import React from 'react'

export const UserCardLoading: React.FC = ({}) => {
  return (
    <div className="w-full p-5 bg-white dark:bg-blackSmall-100 rounded-lg">
      <div className="flex items-start gap-x-5 h-full">
        <div className="w-16 h-12 bg-gray-500 rounded-full"></div>
        <div className="flex justify-between w-full h-10">
          <div className="flex flex-col w-auto dark:text-white flex-1 justify-between h-full">
            <div className="w-12 h-2 bg-gray-500 rounded-lg"></div>
            <div className="w-24 h-2 bg-gray-500 rounded-lg"></div>
          </div>
          <div className="w-10 h-2 bg-gray-500 rounded-lg"></div>
        </div>
      </div>
    </div>
  )
}
