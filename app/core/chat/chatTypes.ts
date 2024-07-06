export interface ChatRoom {
  id: string;
  name: string;
  messages: Message[];
}
export interface MockRoom {
  id: string;
  messages: Message[]
  name: string;
}

export interface Message {
  id: string;
  room_id: string;
  message: string;
  user: string;
  timestamp: {
    hour: number;
    mins: number;
  };
}
