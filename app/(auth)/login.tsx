import { StatusBar } from "expo-status-bar";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Mail, Lock } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { useAuth, useSignIn } from "@clerk/clerk-expo";
import { router, useRootNavigationState } from "expo-router";

export default function Login() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [timesPressed, setTimesPressed] = useState(0);
  const { isSignedIn } = useAuth();
  const navigationState = useRootNavigationState();

  const [emailAddress, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignInPress = async () => {
    if (!isLoaded) return;

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      await setActive({ session: completeSignIn.createdSessionId });

      router.replace("/home");
    } catch (err: any) {
      alert("Invalid Username or Password");
    }
  };

  useEffect(() => {
    if (!navigationState) return;
    if (!navigationState.key) return;
    if (isSignedIn) router.replace("/home");
  }, [navigationState]);

  return (
    <View className="flex h-full items-center justify-center">
      <View className="flex flex-col gap-2">
        <View className="relative flex flex-row items-center">
          <View className="absolute left-4">
            <Mail fill="gray" color="#eeeeee" />
          </View>
          <TextInput
            autoCapitalize="none"
            value={emailAddress}
            onChangeText={(email) => setEmail(email)}
            placeholder="Email"
            className="w-[16rem] rounded-full border-2 border-solid border-orange-300 p-3 pl-14 text-lg text-black"
          ></TextInput>
        </View>

        <View className="relative mb-2 flex flex-row items-center">
          <View className="absolute left-4">
            <Lock fill="gray" color="#eeeeee" />
          </View>
          <TextInput
            value={password}
            returnKeyType="done"
            onChangeText={(pwd) => setPassword(pwd)}
            secureTextEntry={true}
            placeholder="Password"
            className="w-[16rem] rounded-full border-2 border-solid border-orange-300 p-3 pl-16 text-lg"
          ></TextInput>
        </View>
        <TouchableOpacity
          onPress={onSignInPress}
          style={{
            backgroundColor: "orange",
            padding: 16,
            borderRadius: 100,
            alignItems: "center",
          }}
        >
          <Text className="text-md">Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
