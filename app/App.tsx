import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { store } from "./core/store";

import Login from "./static/Login";
import Chat from "./static/Chat";
import Messaging from "./static/Messaging";

import { RootStackParamList } from "./core/chat/navigationTypes";

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Messaging" component={Messaging} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
