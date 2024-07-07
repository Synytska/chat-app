import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../../core/store";
import { addRoom } from "../../core/chat/chatSlice";

interface ModalComponentProps {
  setVisible: (visible: boolean) => void;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ setVisible }) => {
  const [groupName, setGroupName] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const closeModal = () => setVisible(false);

  const handleCreateRoom = () => {
    dispatch(addRoom(groupName));
    closeModal();
  };

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalHeading}>Enter your Group name</Text>
      <TextInput
        style={styles.modalInput}
        placeholder="Group name"
        onChangeText={(value) => setGroupName(value)}
      />
      <View style={styles.modalButtonContainer}>
        <Pressable style={styles.modalButton} onPress={handleCreateRoom}>
          <Text style={styles.modalButtonText}>CREATE</Text>
        </Pressable>
        <Pressable
          style={[styles.modalButton, { backgroundColor: "#E14D2A" }]}
          onPress={closeModal}
        >
          <Text style={styles.modalButtonText}>CANCEL</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalHeading: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalInput: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    padding: 10,
    backgroundColor: "#1E90FF",
    borderRadius: 5,
    alignItems: "center",
    width: "48%",
  },
  modalButtonText: {
    color: "#fff",
  },
});

export default ModalComponent;
