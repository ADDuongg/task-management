/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useEffect, useState } from 'react'

import Icon from '@ant-design/icons'
import { useQueryClient } from '@tanstack/react-query'
import { Avatar, List, Skeleton, Tooltip } from 'antd'
import clsx from 'clsx'
import { useAtom, useAtomValue } from 'jotai'
import { set } from 'mongoose'
import { useSearchParams } from 'next/navigation'
import { Socket, io } from 'socket.io-client'

import { HeaderMessage } from './HeaderMessage'
import { SendMessage } from './SendMessage'
import { useListOfMessage } from '@/hooks/useMessageManagement'
import { useListOfRoom } from '@/hooks/useRoomManagement'
import { showMessageState } from '@/states/commons'
import { currentUserState } from '@/states/users'
import { MessageInterface, UsersInterface } from '@/types'
import { addAlert } from '@/utils/commons'

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

const IconText = ({ type, text }: { type: string; text: string }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
)
let socket: Socket
export const MainMessage = () => {
  const params = useSearchParams()
  const roomId = params.get('id')
  const [message, setMessage] = useState<string>('')
  const userId = useAtomValue(currentUserState)?._id
  const [messages, setMessages] = useState<MessageInterface['messages']>([])
  const { listMessage, isLoading } = useListOfMessage({})
  const { listRoom } = useListOfRoom({})
  const [showMsgState, setShowMsgState] = useAtom(showMessageState)
  const [isMobileView, setIsMobileView] = useState(false)
  const filteredRooms = listRoom.find((room) => room._id === roomId)
  const queryClient = useQueryClient()
  useEffect(() => {
    if (roomId && listMessage) {
      const roomMessage = listMessage.find((item) => item.roomId === roomId)
      if (roomMessage) {
        setMessages(roomMessage.messages || [])
        setMessage('')
      } else {
        setMessages([])
      }
    }
  }, [roomId, listMessage])

  useEffect(() => {
    socket = io()

    if (roomId) {
      socket.emit('join_room', roomId)
      console.log(`Joined room: ${roomId}`)
    }

    socket.on('chat_message', (data: any) => {
      console.log('data', data)
      setMessages((prevMessages) => [...(prevMessages || []), data])
    })

    socket.on('message', (msg: string) => {
      console.log('Server message:', msg)
    })

    return () => {
      socket.disconnect()
    }
  }, [roomId])

  useEffect(() => {
    const checkMobileView = () => {
      if (window.innerWidth <= 768) {
        setIsMobileView(true)
      } else {
        setIsMobileView(false)
      }
    }
    checkMobileView()
    window.addEventListener('resize', checkMobileView)
    return () => {
      window.removeEventListener('resize', checkMobileView)
    }
  }, [])
  const sendMessage = async () => {
    try {
      socket?.emit('chat_message', {
        roomId: roomId || '',
        content: message,
        sender: userId || '',
      })
      addAlert({ type: 'success', content: 'Send message successfully' })
      queryClient.invalidateQueries({
        queryKey: ['rooms', 'all'].map(String),
      })
      queryClient.invalidateQueries({
        queryKey: ['messages', 'all'].map(String),
      })
      setMessage('')
    } catch (error) {
      console.error('Error sending message:', error)
      addAlert({ type: 'error', content: 'Failed to send message' })
    }
  }

  return (
    <div
      className={clsx(
        ' dark:bg-blackSmall-100 xl:col-span-7 xl:order-2 lg:col-span-10 md:col-span-6 xs:col-span-10 bg-white rounded-lg relative overflow-hidden',
        {
          block: isMobileView
            ? showMsgState // Nếu là mobile, hiển thị dựa trên `showMsgState`
            : true, // Nếu không phải mobile, luôn hiển thị
          hidden: isMobileView ? isMobileView && !showMsgState : false,
        },
      )}
    >
      <HeaderMessage
        userChat={
          filteredRooms?.participants.length === 2
            ? filteredRooms?.participants[0]
            : filteredRooms?.roomName
        }
        isMobileView={isMobileView}
        setIsMobileView={setIsMobileView}
        showMsgState={showMsgState}
        setShowMsgState={setShowMsgState}
      />
      <div className="flex flex-col gap-y-3 overflow-y-scroll max-h-[calc(100vh-250px)] p-4">
        {isLoading ? (
          <>
            <Skeleton avatar paragraph={{ rows: 5 }} />
            <Skeleton avatar paragraph={{ rows: 5 }} />
            <Skeleton avatar paragraph={{ rows: 5 }} />
          </>
        ) : (
          <>
            {messages?.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                {typeof item.sender !== 'string' &&
                item.sender._id !== userId ? (
                  /* other user */
                  <div className="flex items-center gap-x-2 w-full">
                    {typeof item.sender !== 'string' && item.sender?.avatar ? (
                      <Tooltip title={item.sender?.username}>
                        <Avatar
                          size={48}
                          src={item.sender?.avatar}
                          alt={item.sender?.username}
                        />
                      </Tooltip>
                    ) : (
                      <Avatar size={32} />
                    )}
                    <div className="bg-gray-200 rounded-2xl max-w-full py-2 px-3">
                      {item.content}
                    </div>
                  </div>
                ) : (
                  /* current user */
                  <div className="flex items-center gap-x-2 w-full justify-end">
                    <div className="bg-blue-600 rounded-3xl max-w-full p-2 text-white">
                      {item.content}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
      <SendMessage
        roomId={roomId || ''}
        setMessage={setMessage}
        message={message}
        sendMessage={sendMessage}
      />
    </div>
  )
}
