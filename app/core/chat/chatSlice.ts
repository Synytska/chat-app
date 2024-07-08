import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchChatRooms, createChatRoom, deleteChatRoom } from "./chatService";

import { ChatRoom } from "./chatTypes";

interface ChatState {
  rooms: ChatRoom[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ChatState = {
  rooms: [],
  status: "idle",
  error: null,
};

export const fetchRooms = createAsyncThunk("chat/fetchRooms", async () => {
  const rooms = await fetchChatRooms();
  return rooms;
});

export const addRoom = createAsyncThunk(
  "chat/addRoom",
  async ({ name, userId }: { name: string; userId: string | null }) => {
    const room = await createChatRoom(name, userId);
    return room;
  }
);

export const removeRoom = createAsyncThunk(
  "chat/removeRoom",
  async ({ id, userId }: { id: string; userId: string | null}) => {
    await deleteChatRoom(id, userId);
    return id;
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rooms = action.payload;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(addRoom.fulfilled, (state, action) => {
        state.rooms.push(action.payload);
      })
      .addCase(removeRoom.fulfilled, (state, action) => {
        state.rooms = state.rooms.filter((room) => room.id !== action.payload);
      })
      .addCase(removeRoom.rejected, (state, action) => {
        state.error = action.error.message || "Failed to delete room";
      });
  },
});

export default chatSlice.reducer;
