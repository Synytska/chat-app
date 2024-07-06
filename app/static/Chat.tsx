import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, SafeAreaView, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../core/store';
import { fetchRooms, removeRoom } from '../core/chat/chatSlice';
import ModalComponent from '../shared/components/ModalComponent';
import ChatComponent from '../shared/components/ChatComponent';
import { styles } from '../shared/styles';


const Chat: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const rooms = useSelector((state: RootState) => state.chat.rooms);

  useEffect(() => {
    dispatch(fetchRooms());
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
            <Feather name="edit" size={24} color="green" />
          </Pressable>
        </View>
      </View>
      <View style={styles.chatlistContainer}>
        {rooms.length > 0 ? (
          <FlatList
            data={rooms}
            renderItem={({ item }) => <ChatComponent item={item} onDelete={handleDeleteChatRoom}/>}
            keyExtractor={(item) => item.id}
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
