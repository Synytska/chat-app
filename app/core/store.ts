import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chat/chatSlice';
import authReducer from './chat/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
