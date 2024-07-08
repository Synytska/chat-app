import axios from "axios";
import socket from "../../utils/socket";

import { ChatRoom, Message } from "./chatTypes";

const BASE_URL = "http://192.168.1.6:4000"; // Change for your IP address

export const fetchChatRooms = async (): Promise<ChatRoom[]> => {
  const response = await axios.get(`${BASE_URL}/api`);
  return response.data;
};

export const createChatRoom = async (
  name: string,
  userId: string | null
): Promise<ChatRoom> => {
  return new Promise((resolve) => {
    socket.emit("createRoom", { name, creatorId: userId });
    socket.on("roomsList", (rooms) => {
      resolve(
        rooms.find(
          (room: any) => room.name === name && room.creatorId === userId
        )
      );
    });
  });
};


export const deleteChatRoom = async (id: string, userId: string | null): Promise<void> => {
  return new Promise((resolve, reject) => {
    socket.emit("deleteRoom", { id, userId });
    socket.on("deleteRoomResult", (result) => {
      if (result.success) {
        resolve();
      } else {
        reject(new Error(result.message));
      }
    });
  });
};

export const sendMessage = (data: {
  id: string;
  room_id: string;
  message: string;
  user: string;
  timestamp: { hour: number; mins: number };
}): void => {
  socket.emit("newMessage", data);
};

export const subscribeToRoomMessages = (
  callback: (message: Message) => void
) => {
  socket.on("roomMessage", callback);
};
