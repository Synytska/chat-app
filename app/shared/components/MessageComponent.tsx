import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Message } from "../../core/chat/chatTypes";

interface MessageComponentProps {
  item: Message;
  user: string;
}

export const MessageComponent: React.FC<MessageComponentProps> = ({
  item,
  user,
}) => {
  const isCurrentUser = item.user === user;

  return (
    <View
      style={[
        styles.messageWrapper,
        isCurrentUser ? styles.currentUser : styles.otherUser
      ]}
    >
      <View style={styles.messageContent}>
        <Ionicons
          name="person-circle-outline"
          size={30}
          color="black"
          style={styles.avatar}
        />
        <View
          style={[
            styles.messageBubble,
            isCurrentUser ? styles.currentUserBubble : styles.otherUserBubble
          ]}
        >
          <Text>{item.text}</Text>
        </View>
      </View>
      <Text style={styles.messageTime}>{item.time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageWrapper: {
    width: "100%",
    marginBottom: 15,
  },
  messageContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    marginRight: 5,
  },
  messageBubble: {
    maxWidth: "50%",
    padding: 15,
    borderRadius: 10,
    marginBottom: 2,
  },
  currentUser: {
    alignItems: "flex-end",
  },
  otherUser: {
    alignItems: "flex-start",
  },
  currentUserBubble: {
    backgroundColor: "rgb(194, 243, 194)",
  },
  otherUserBubble: {
    backgroundColor: "#f5ccc2",
  },
  messageTime: {
    marginLeft: 40,
  },
});
