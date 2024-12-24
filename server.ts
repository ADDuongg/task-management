import http from "http";
import { Server, Socket } from "socket.io";
import next from "next";
import { MessageModel, RoomModel, UserModel } from "./model";
import { dbConnect } from "./lib";

interface ChatMessageData {
  sender: string; // ID người dùng
  content: string;
  roomId: string;
}

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  dbConnect();
  const server = http.createServer((req, res) => {
    handle(req, res);
  });

  const io = new Server(server);

  io.on("connection", (socket: Socket) => {
    console.log("A user connected: " + socket.id);

    socket.on("join_room", (roomId: string) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room: ${roomId}`);
    });

    socket.on("chat_message", async (data: ChatMessageData) => {
      console.log('data received from client',data);
      
      const { sender, content, roomId } = data;

      if (!roomId || !sender || !content) {
        return socket.emit("error", "Invalid message data");
      }

      try {
        const user = await UserModel.findById(sender).select("username avatar");

        if (!user) {
          return socket.emit("error", "User not found");
        }

        const { username, avatar } = user;

        const messageData = await MessageModel.findOne({ roomId }).populate("messages.sender", "username avatar");
        const room = await RoomModel.findById(roomId);

        if (!room) {
          return socket.emit("error", "Room not found");
        }
        console.log('messageData', messageData);
        
        messageData && (
          room.latestMessage = messageData?._id || ""
        )
        await room.save();

        if (messageData) {
          messageData.messages && messageData.messages.push({
            sender: user._id, 
            content,
            createdAt: new Date(),
          });

          await messageData.save();

          io.to(roomId).emit("chat_message", {
            sender: { _id: sender, username, avatar }, 
            content,
            readBy: [],
            createdAt: new Date(),
          });
        } else {
          const newRoom = new MessageModel({
            roomId,
            messages: [
              {
                sender: user._id, 
                content,
                createdAt: new Date(),
              },
            ],
          });

          await newRoom.save();

          io.to(roomId).emit("chat_message", {
            sender: { id: sender, username, avatar }, 
            content,
            roomId,
            createdAt: new Date(),
          });
        }
      } catch (err) {
        console.error("Error saving message:", err);
        socket.emit("error", "Failed to save message");
      }
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected: " + socket.id);
    });
  });

  server.listen(3002, (err?: Error) => {
    if (err) throw err;
    console.log("> Server listening on http://localhost:3000");
  });
});
