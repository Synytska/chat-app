import axios from "axios";
import socket from "../utils/socket";

import React, { useEffect, useState } from "react";
import { View, FlatList, TextInput, Button } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { MessagingScreenRouteProp } from "../core/chat/navigationTypes";
import { Message } from "../core/chat/chatTypes";
import { sendMessage, subscribeToRoomMessages } from "../core/chat/chatService";

import { MessageComponent } from "../shared/components/MessageComponent";

import { styles } from "@/shared/styles";

const Messaging: React.FC = () => {
  const route = useRoute<MessagingScreenRouteProp>();
  const navigation = useNavigation();

  const { roomId, messages: initialMessages } = route.params;
  const [user, setUser] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>(initialMessages || []);
  const [message, setMessage] = useState<string>("");

  const mockMessage = async () => {
    try {
      const response = await axios.get(
        "https://b2e6d397-d387-418f-8072-570fd27c581d.mock.pstmn.io/messagess"
      );
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, ...response.data]);
      }, 1000);
    } catch (error) {
      console.error("Error fetching chat rooms:", error);
    }
  };
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

  useEffect(() => {
    const handleMessage = (newMessage: Message) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    navigation.setOptions({ title: roomId });
    socket.emit("joinRoom", roomId);
    getUsername();
    subscribeToRoomMessages(handleMessage);

    return () => {
      socket.off("roomMessage", handleMessage);
    };
  }, [roomId]);

  const handleSend = () => {
    if (message.trim().length > 0) {
      const newMessage: Message = {
        id: String(Date.now()),
        room_id: roomId,
        message,
        user: user || "User1",
        timestamp: {
          hour: new Date().getHours(),
          mins: new Date().getMinutes(),
        },
      };
      sendMessage(newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage("");
      mockMessage();
    }
  };

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

export default Messaging;
