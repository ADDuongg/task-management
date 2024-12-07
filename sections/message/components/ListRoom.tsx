'use client'

import React, { useEffect, useState } from 'react'

import {
  DeleteOutlined,
  MoreOutlined,
  PlusCircleFilled,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useQueryClient } from '@tanstack/react-query'
import { Avatar, Dropdown, Input } from 'antd'
import { useAtom, useAtomValue } from 'jotai'
import moment from 'moment'
import { useRouter, useSearchParams } from 'next/navigation'

import { ListRoomLoading } from './ListRoomLoading'
import { deleteRoom } from '@/action'
import { Icon } from '@/components'
import { useListOfRoom } from '@/hooks/useRoomManagement'
import { ModalCreateRoom } from '@/modules/Room'
import { showMessageState } from '@/states/commons'
import { currentUserState } from '@/states/users'
import { ActionData } from '@/types'

export const ListRoom = () => {
  const [openModalCreateRoom, setOpenModalCreateRoom] = useState<boolean>(false)
  const { listRoom, isLoading } = useListOfRoom({})
  const [showMsgState, setShowMsgState] = useAtom(showMessageState)
  const [isMobileView, setIsMobileView] = useState(false)
  const [searchText, setSearchText] = useState<string>('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const userId = useAtomValue(currentUserState)?._id
  const filteredRooms = listRoom.filter(
    (room) =>
      room.participants.some((participant) => participant._id === userId) &&
      (room.roomName.toLowerCase().includes(searchText.toLowerCase()) ||
        room.participants[0]?.username
          .toLowerCase()
          .includes(searchText.toLowerCase())),
  )
  useEffect(() => {
    const checkMobileView = () => {
      if (window.innerWidth <= 768) {
        setIsMobileView(true)
      } else {
        setIsMobileView(false)
        setShowMsgState(false)
      }
    }
    checkMobileView()
    window.addEventListener('resize', checkMobileView)
    return () => {
      window.removeEventListener('resize', checkMobileView)
    }
  }, [])
  console.log('isMobileView', isMobileView)

  useEffect(() => {
    if (filteredRooms?.length > 0 && !searchParams?.get('id')) {
      const firstRoomId = filteredRooms[0]._id
      const currentParams = new URLSearchParams(searchParams?.toString() || '')
      currentParams.set('id', firstRoomId)
      router.replace(`?${currentParams.toString()}`)
    }
  }, [filteredRooms, searchParams, router])

  const handleRoomClick = (roomId: string) => {
    const currentParams = new URLSearchParams(searchParams?.toString() || '')
    currentParams.set('id', roomId)
    router.replace(`?${currentParams.toString()}`)

    if (isMobileView) {
      setShowMsgState(true)
    }
  }
  const queryClient = useQueryClient()
  const handleDeleteRoom = (roomId: string) => {
    deleteRoom(roomId)
    queryClient.invalidateQueries({
      queryKey: ['rooms', 'all'].map(String),
    })
  }
  const roomItems = (roomId: string) => {
    return [
      {
        key: '1',
        label: (
          <div className="flex gap-x-3 !text-blackSmall-100 dark:text-white">
            <Icon size={16} IconComponent={UserOutlined} />
            Watch user profile
          </div>
        ),
      },
      {
        key: '2',
        label: (
          <div
            className="flex gap-x-3  text-red-500"
            onClick={() => handleDeleteRoom(roomId)}
          >
            <Icon size={16} IconComponent={DeleteOutlined} />
            Delete Message
          </div>
        ),
      },
    ]
  }

  return (
    <>
      <div
        className={` ${showMsgState ? 'hidden' : 'block'} dark:bg-blackSmall-100 xl:col-span-3 xl:order-1 lg:col-span-10 md:col-span-4 xs:col-span-10 lg:order-2 p-4 bg-white rounded-lg space-y-3`}
      >
        <div className="flex justify-between items-center">
          <span className="text-3xl font-bold dark:text-white">Message</span>
          <Icon
            className="cursor-pointer hover:opacity-70 dark:text-white"
            IconComponent={PlusCircleFilled}
            onClick={() => setOpenModalCreateRoom(true)}
          />
        </div>
        <Input
          addonBefore={<SearchOutlined />}
          placeholder="Search in messages"
          size="large"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {/* List of rooms */}
        <div className="flex flex-col gap-y-3 overflow-y-auto max-h-[calc(100vh-270px)] pr-1">
          {isLoading ? (
            Array.from({ length: 5 }, (_, index) => (
              <ListRoomLoading key={index} />
            ))
          ) : filteredRooms.length > 0 ? (
            filteredRooms.map((item, index) => {
              const isActive = item._id === searchParams?.get('id')
              return (
                <div
                  key={index}
                  className={`flex gap-x-3 ${isActive ? 'bg-gray-100 text-black' : 'dark:text-white'} items-center rounded-lg p-3 hover:bg-gray-100 hover:text-black h-20 cursor-pointer w-full relative group`}
                  onClick={() => handleRoomClick(item._id)}
                >
                  <Avatar
                    size={64}
                    src={
                      item.participants.length === 2
                        ? item.participants[0].avatar
                        : 'https://th.bing.com/th?q=Logo+Message+Group&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.1&pid=InlineBlock&mkt=en-WW&cc=VN&setlang=en&adlt=moderate&t=1&mw=247'
                    }
                  />
                  <div className="flex flex-col h-full flex-1 justify-between">
                    <span
                      className={`text-lg font-bold ${isActive ? 'text-black' : ''}`}
                    >
                      {item.participants.length === 2
                        ? item.participants[0].username
                        : item.roomName}
                    </span>
                    <div className="flex items-center gap-x-2">
                      <span
                        className={`text-xs truncate ${isActive ? 'text-black' : ''}`}
                        style={{ flex: 7 }}
                      >
                        {item.latestMessage &&
                          typeof item.latestMessage !== 'string' &&
                          item.latestMessage.messages &&
                          item.latestMessage.messages[0]?.content}
                      </span>
                      <span
                        className="text-xs text-gray-500 w-5"
                        style={{ flex: 3 }}
                      >
                        {item.latestMessage &&
                        typeof item.latestMessage !== 'string' &&
                        item.latestMessage.messages?.[0]?.createdAt
                          ? moment(
                              item.latestMessage.messages[0].createdAt,
                            ).fromNow()
                          : 'Unknown time'}
                      </span>
                    </div>
                  </div>
                  <Dropdown
                    trigger={['click']}
                    menu={{
                      items: roomItems(item._id),
                    }}
                    placement="topRight"
                  >
                    <div className=" dark:bg-black dark:text-white absolute top-1/2 -translate-y-1/2 right-3 items-center justify-center gap-x-2 hidden group-hover:flex h-8 w-8 rounded-full bg-white p-2 hover:bg-gray-300 border">
                      <Icon
                        IconComponent={MoreOutlined}
                        className="text-xl cursor-pointer"
                      />
                    </div>
                  </Dropdown>
                </div>
              )
            })
          ) : (
            <span>No rooms found</span>
          )}
        </div>
        <ModalCreateRoom
          openModal={openModalCreateRoom}
          setOpenModal={setOpenModalCreateRoom}
          action={ActionData.CREATE}
        />
      </div>
    </>
  )
}
