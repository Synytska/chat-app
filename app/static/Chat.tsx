import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, Pressable, SafeAreaView, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../core/store";
import { fetchRooms, removeRoom } from "../core/chat/chatSlice";
import { MockRoom } from "../core/chat/chatTypes";

import ModalComponent from "../shared/components/ModalComponent";
import ChatComponent from "../shared/components/ChatComponent";

import { styles } from "../shared/styles";

import { Feather } from "@expo/vector-icons";

const Chat: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [mockRooms, setMockRooms] = useState<MockRoom[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const rooms = useSelector((state: RootState) => state.chat.rooms);

  const addMockRooms = async () => {
    try {
      const response = await axios.get<MockRoom[]>(
        "https://96519561-2ac8-401b-9744-55ecb56be3b3.mock.pstmn.io/rooms"
      );
      setMockRooms(response.data);
    } catch (error) {
      console.error("Error fetching chat rooms:", error);
    }
  };

  useEffect(() => {
    dispatch(fetchRooms());
    addMockRooms();
  }, [dispatch]);

  const handleDeleteChatRoom = (id: string) => {
    dispatch(removeRoom(id));
  };

  return (
    <SafeAreaView style={styles.chatscreen}>
      <View style={styles.chattopContainer}>
        <View style={styles.chatheader}>
          <Text style={styles.chatheading}>Chats</Text>
          <Pressable onPress={() => setVisible(true)}>
            <Feather name="edit" size={24} color="white" />
          </Pressable>
        </View>
      </View>
      <View>
        <FlatList
          data={mockRooms}
          renderItem={({ item }) => (
            <ChatComponent
              item={item}
              onDelete={handleDeleteChatRoom}
              disableDelete={true}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
        {rooms.length > 0 || mockRooms.length > 0 ? (
          <FlatList
            data={rooms}
            renderItem={({ item }) => (
              <ChatComponent
                item={item}
                onDelete={handleDeleteChatRoom}
                disableDelete={false}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : (
          <View style={styles.chatemptyContainer}>
            <Text style={styles.chatemptyText}>No rooms created!</Text>
            <Text>Click the icon above to create a Chat room</Text>
          </View>
        )}
      </View>
      {visible && <ModalComponent setVisible={setVisible} />}
    </SafeAreaView>
  );
};

export default Chat;
