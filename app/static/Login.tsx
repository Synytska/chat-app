import React, { useState } from "react";
import {
  Text,
  SafeAreaView,
  View,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { setUsername } from "../core/chat/authSlice";
import { LoginScreenNavigationProp } from "../core/chat/navigationTypes";

import { styles } from "../shared/styles";

const Login: React.FC = () => {
  const [username, setUsernameInput] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const generateUserId = () => Math.random().toString(36).substring(2, 15);

  const storeUsername = async () => {
    try {
      await AsyncStorage.setItem("username", username);
      await AsyncStorage.setItem("userId", generateUserId());
      dispatch(setUsername(username));
      navigation.navigate("Chat");
    } catch (e) {
      Alert.alert("Error! While saving username");
    }
  };

  const handleSignIn = () => {
    if (username.trim()) {
      storeUsername();
    } else {
      Alert.alert("Username is required.");
    }
  };

  return (
    <SafeAreaView style={styles.loginscreen}>
      <View style={styles.loginscreen}>
        <Text style={styles.loginheading}>Sign in</Text>
        <View style={styles.logininputContainer}>
          <TextInput
            autoCorrect={false}
            placeholder="Enter your username"
            style={styles.logininput}
            onChangeText={(value) => setUsernameInput(value)}
          />
        </View>
        <Pressable onPress={handleSignIn} style={styles.loginbutton}>
          <View>
            <Text style={styles.loginbuttonText}>Get Started</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Login;
