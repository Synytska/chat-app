const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const PORT = 4000;
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const generateID = () => Math.random().toString(36).substring(2, 10);
let chatRooms = [];

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("createRoom", (name) => {
    socket.join(name);
    const newRoom = { id: generateID(), name, messages: [] };
    chatRooms.unshift(newRoom);
    socket.emit("roomsList", chatRooms);
    socket.broadcast.emit("roomsList", chatRooms);
  });

  socket.on("findRoom", (id) => {
    let result = chatRooms.filter((room) => room.id == id);
    socket.emit("foundRoom", result[0].messages);
  });

  socket.on("newMessage", (data) => {
    console.log(data);
    const { room_id, message, user, timestamp } = data;
    let result = chatRooms.find((room) => room.id === room_id);
    if (result) {
      const newMessage = {
        id: generateID(),
        text: message,
        user,
        time: `${timestamp.hour}:${timestamp.mins}`,
      };
      result.messages.push(newMessage);
      socketIO.to(result.name).emit("roomMessage", newMessage);
      socket.emit("roomsList", chatRooms);
      socket.emit("foundRoom", result.messages);
    }
  });

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
  });

  socket.on("deleteRoom", (id) => {
    chatRooms = chatRooms.filter((room) => room.id !== id);
    socket.emit("roomsList", chatRooms);
    socket.broadcast.emit("roomsList", chatRooms);
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});

app.get("/api", (req, res) => {
  res.json(chatRooms);
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
