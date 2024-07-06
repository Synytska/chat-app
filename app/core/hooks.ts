import axios from "axios";
import { useState, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Message } from "./chat/chatTypes";

// useMessages.ts
export const useMessages = (roomId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const loadMessages = useCallback(async () => {
    try {
      const messagesString = await AsyncStorage.getItem(`messages_${roomId}`);
      if (messagesString !== null) {
        setMessages(JSON.parse(messagesString));
      }
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  }, [roomId]);

  const saveMessages = useCallback(
    async (newMessages: Message[]) => {
      try {
        await AsyncStorage.setItem(
          `messages_${roomId}`,
          JSON.stringify(newMessages)
        );
      } catch (error) {
        console.error("Error saving messages:", error);
      }
    },
    [roomId]
  );

  const addMessage = useCallback(
    (newMessage: Message) => {
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, newMessage];
        saveMessages(updatedMessages);
        return updatedMessages;
      });
    },
    [saveMessages]
  );

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  return { messages, addMessage };
};

// useUser.ts
export const useUser = () => {
  const [user, setUser] = useState<string>("");

  useEffect(() => {
    const getUsername = async () => {
      try {
        const value = await AsyncStorage.getItem("username");
        if (value !== null) {
          setUser(value);
        }
      } catch (e) {
        console.error("Error while loading username!");
      }
    };
    getUsername();
  }, []);

  return user;
};

// useMockMessage.ts
export const useMockMessage = (addMessage: (message: Message) => void) => {
  const mockMessage = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://b2e6d397-d387-418f-8072-570fd27c581d.mock.pstmn.io/messagess"
      );
      setTimeout(() => {
        response.data.forEach((message: Message) => addMessage(message));
      }, 1000);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }, [addMessage]);

  return mockMessage;
};
