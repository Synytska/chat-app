import axios from "axios";
import socket from "../../utils/socket";

import { ChatRoom, Message } from "./chatTypes";

const BASE_URL = "http://192.168.1.6:4000"; // Change for your IP address

export const fetchChatRooms = async (): Promise<ChatRoom[]> => {
  const response = await axios.get(`${BASE_URL}/api`);
  return response.data;
};

export const createChatRoom = async (name: string): Promise<ChatRoom> => {
  return new Promise((resolve) => {
    socket.emit("createRoom", name);
    socket.on("roomsList", (rooms) => {
      resolve(rooms.find((room: any) => room.name === name));
    });
  });
};

export const deleteChatRoom = async (id: string): Promise<void> => {
  socket.emit("deleteRoom", id);
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
