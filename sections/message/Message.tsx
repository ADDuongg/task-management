import { ListRoom, MainMessage } from './components'

export const ChatMessage =
  (/* { messages }: { messages: MessageInterface[] } */) => {
    return (
      <div className="grid grid-cols-10 gap-4 h-full p-3">
        {/* Left side */}
        <ListRoom />
        {/* Right side */}
        <MainMessage /* messages={messages} */ />
      </div>
    )
  }
