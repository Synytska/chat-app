import socket from "../../utils/socket";

import React, { useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "../../core/chat/navigationTypes";
import { ChatRoom, MockRoom, Message } from "../../core/chat/chatTypes";

import { Ionicons } from "@expo/vector-icons";

interface ChatComponentProps {
  item: ChatRoom | MockRoom;
  onDelete: (id: string) => void;
  disableDelete: boolean;
}

const ChatComponent: React.FC<ChatComponentProps> = ({
  item,
  onDelete,
  disableDelete,
}) => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "Messaging">>();
  const [lastMessage, setLastMessage] = useState<Message | null>(null);
  console.log(lastMessage);
  useLayoutEffect(() => {
    if (item.messages.length > 0) {
      setLastMessage(item.messages[item.messages.length - 1]);
    } else {
      setLastMessage(null);
    }
  }, [item.messages]);

  const handlePress = () => {
    navigation.navigate("Messaging", {
      roomId: item.id,
      messages: item.messages,
    });
  };

  const handleDelete = () => {
    socket.emit("deleteChatRoom", item.id);
    onDelete(item.id);
  };

  return (
    <Pressable onPress={handlePress} style={styles.cchat}>
      <Ionicons
        name="person-circle-outline"
        size={45}
        color="black"
        style={styles.cavatar}
      />
      <View style={styles.crightContainer}>
        <View>
          <Text style={styles.cusername}>{item.name}</Text>
          <Text style={styles.cmessage}>
            {lastMessage ? lastMessage.message : "Tap to start chatting"}
          </Text>
        </View>
        <View style={styles.deletebut}>
          {!disableDelete && (
            <Pressable onPress={handleDelete}>
              <Ionicons name="trash-bin" size={24} color="red" />
            </Pressable>
          )}
          <Text style={styles.ctime}>
            {lastMessage && lastMessage.timestamp
              ? `${lastMessage.timestamp.hour}:${lastMessage.timestamp.mins}`
              : "now"}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  deletebut: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  cavatar: {
    marginRight: 15,
  },
  crightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  cusername: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
  },
  cmessage: {
    fontSize: 14,
    opacity: 0.7,
  },
  ctime: {
    opacity: 0.5,
  },
  cchat: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    height: 80,
    marginBottom: 10,
  },
});

export default ChatComponent;
