import { useState } from "react";
import { View, TextInput, Pressable, StyleSheet, Text } from "react-native";

interface MessageInputProps {
  onSend: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState<string>("");

  const handleSend = () => {
    if (message.trim().length > 0) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Type a message"
      />
      <Pressable onPress={handleSend} style={styles.messagingbuttonContainer}>
        <View>
          <Text style={{ color: "#f2f0f1", fontSize: 20 }}>SEND</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
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
  messagingbuttonContainer: {
    width: "30%",
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
});

export default MessageInput;
