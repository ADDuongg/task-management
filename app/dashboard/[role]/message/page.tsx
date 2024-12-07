import React from 'react'

import { ChatMessage } from '@/sections/message/Message'
import { getToken } from '@/utils/server'

const Message = async () => {
  const token = await getToken()
  if (!token) {
    return <div>Please login</div>
  }

  /* const RoomResponse = await fetch(`http://localhost:3000/api/room`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  }) */

  /* const MessageResponse = await fetch(`http://localhost:3000/api/message`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  }) */

  /* const dataRooms = await RoomResponse.json() */
  /* const dataMessages = await MessageResponse.json() */

  return <ChatMessage /* messages={dataMessages.messageResponse} */ />
}

export default Message
