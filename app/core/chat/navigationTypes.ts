import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Login: undefined;
  Chat: undefined;
  Messaging: { roomId: string };
};

export type MessagingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Messaging'>;
export type MessagingScreenRouteProp = RouteProp<RootStackParamList, 'Messaging'>;
export type ChatScreenRouteProp = RouteProp<{ Chat: { roomId: string } }, "Chat">;
export type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
