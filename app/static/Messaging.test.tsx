import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Messaging from "./Messaging";
import { NavigationContainer } from "@react-navigation/native";
import { sendMessage, subscribeToRoomMessages } from "../core/chat/chatService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Мокаємо залежності
jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useRoute: () => ({
    params: {
      roomId: "testRoom",
      messages: [],
    },
  }),
  useNavigation: () => ({
    setOptions: jest.fn(),
  }),
}));

jest.mock("../core/chat/chatService", () => ({
  sendMessage: jest.fn(),
  subscribeToRoomMessages: jest.fn(),
}));

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn() as jest.MockedFunction<typeof AsyncStorage.getItem>,
}));

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("../utils/socket", () => ({
  emit: jest.fn(),
  off: jest.fn(),
}));

describe("Messaging Component", () => {
  beforeEach(() => {
    (
      AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>
    ).mockResolvedValue("testUser");

    mockedAxios.get.mockResolvedValue({
      data: [{ id: "1", message: "Test message", user: "User1" }],
    });
  });

  it("renders correctly", async () => {
    const { getByPlaceholderText, getByText } = render(
      <NavigationContainer>
        <Messaging />
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(getByPlaceholderText("Type a message")).toBeTruthy();
      expect(getByText("Send")).toBeTruthy();
    });
  });

  it("sends a message when the send button is pressed", async () => {
    const { getByPlaceholderText, getByText } = render(
      <NavigationContainer>
        <Messaging />
      </NavigationContainer>
    );

    const input = getByPlaceholderText("Type a message");
    const sendButton = getByText("Send");

    fireEvent.changeText(input, "Hello, world!");
    fireEvent.press(sendButton);

    await waitFor(() => {
      expect(sendMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Hello, world!",
          room_id: "testRoom",
          user: expect.any(String),
          timestamp: expect.objectContaining({
            hour: expect.any(Number),
            mins: expect.any(Number),
          }),
        })
      );
    });
  });

  it("fetches mock messages after sending a message", async () => {
    const { getByPlaceholderText, getByText } = render(
      <NavigationContainer>
        <Messaging />
      </NavigationContainer>
    );

    const input = getByPlaceholderText("Type a message");
    const sendButton = getByText("Send");

    fireEvent.changeText(input, "Hello, world!");
    fireEvent.press(sendButton);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        "https://b2e6d397-d387-418f-8072-570fd27c581d.mock.pstmn.io/messagess"
      );
    });
  });
});
