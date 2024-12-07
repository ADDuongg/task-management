import React from 'react'

export const ListRoomLoading = () => {
  return (
    <div
      className={`flex gap-x-3 items-center rounded-lg p-3 h-20 cursor-pointer w-full relative group`}
    >
      <div className="rounded-full w-14 h-14 bg-gray-100"></div>
      <div className="flex flex-col h-full flex-1 justify-between">
        <span className="text-lg font-bold bg-gray-100 w-14 h-2"></span>
        <div className="flex items-center gap-x-2 ">
          <span
            className="text-xs truncate bg-gray-100 w-10 h-3"
            style={{ flex: 7 }}
          ></span>
          <span
            className="text-xs text-gray-500 w-5 bg-gray-100 h-3"
            style={{ flex: 3 }}
          ></span>
        </div>
      </div>
    </div>
  )
}
