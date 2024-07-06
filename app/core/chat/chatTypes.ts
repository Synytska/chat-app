export interface ChatRoom {
    id: string;
    name: string;
    messages: Message[];
  }
  
  export interface Message {
    id: string;
    text: string;
    user: string;
    time: string;
  }
  