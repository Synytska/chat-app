import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  Button,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Message } from "../core/chat/chatTypes";
import { sendMessage, subscribeToRoomMessages } from "../core/chat/chatService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { MessageComponent } from "../shared/components/MessageComponent";
import socket from "../utils/socket";
import axios from "axios";

type ChatScreenRouteProp = RouteProp<{ Chat: { roomId: string } }, "Chat">;

const Messaging: React.FC = () => {
  const route = useRoute<ChatScreenRouteProp>();
  const navigation = useNavigation();

  const { roomId } = route.params;
  const [user, setUser] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");

  const saveMessages = useCallback(async (messages: Message[]) => {
    try {
      await AsyncStorage.setItem(`messages_${roomId}`, JSON.stringify(messages));
    } catch (error) {
      console.error("Error saving messages:", error);
    }
  }, [roomId]);

  const loadMessages = useCallback(async () => {
    try {
      const savedMessages = await AsyncStorage.getItem(`messages_${roomId}`);
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      }
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  }, [roomId]);

  const mockMessage = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://b2e6d397-d387-418f-8072-570fd27c581d.mock.pstmn.io/messagess"
      );
      setTimeout(() => {
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages, ...response.data];
          saveMessages(updatedMessages);
          return updatedMessages;
        });
      }, 1000);
    } catch (error) {
      console.error("Error fetching chat rooms:", error);
    }
  }, [saveMessages]);

  const getUsername = useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem("username");
      if (value !== null) {
        setUser(value);
      }
    } catch (e) {
      console.error("Error while loading username!");
    }
  }, []);

  useEffect(() => {
    const handleMessage = (newMessage: Message) => {
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, newMessage];
        saveMessages(updatedMessages);
        return updatedMessages;
      });
    };

    navigation.setOptions({ title: roomId });
    socket.emit("joinRoom", roomId);
    getUsername();
    loadMessages();

    subscribeToRoomMessages(handleMessage);

    return () => {
      socket.off("roomMessage", handleMessage);
    };
  }, [roomId, navigation, getUsername, loadMessages, saveMessages]);

  const handleSend = useCallback(() => {
    if (message.trim().length > 0) {
      const newMessage: Message = {
        id: Date.now().toString(),
        room_id: roomId,
        message,
        user: user || "User1",
        timestamp: {
          hour: new Date().getHours(),
          mins: new Date().getMinutes(),
        },
      };
      sendMessage(newMessage);
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, newMessage];
        saveMessages(updatedMessages);
        return updatedMessages;
      });
      setMessage("");
      mockMessage();
    }
  }, [message, roomId, user, saveMessages, mockMessage]);

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => <MessageComponent item={item} user={user} />}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message"
        />
        <Button title="Send" onPress={handleSend} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  message: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginRight: 10,
  },
});

export default Messaging;