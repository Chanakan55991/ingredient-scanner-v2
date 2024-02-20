import { useAuth } from "@clerk/clerk-expo";
import { Slot, router, useRootNavigationState } from "expo-router";
import Tabs from "expo-router/tabs";
import { Camera, History, Home } from "lucide-react-native";

import { BottomTabBar } from "@react-navigation/bottom-tabs";
import { useEffect } from "react";
import { Platform, Text, View } from "react-native";
import { BlurView } from "expo-blur";

export default function ProtectedLayout() {
  const { isSignedIn } = useAuth();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (!navigationState) return;
    if (!navigationState.key) return;
    if (!isSignedIn) router.replace("/login");
  }, [navigationState]);

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarStyle: Platform.OS === "ios" && {
          backgroundColor: "transparent",
        },
      }}
      tabBar={(props) =>
        Platform.OS === "ios" ? (
          <BlurView
            style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
            intensity={95}
          >
            <BottomTabBar {...props} />
          </BlurView>
        ) : (
          <BottomTabBar {...props} />
        )
      }
    >
      <Tabs.Screen
        name="home"
        options={{
          href: "/home",
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                marginTop: 17,
                backgroundColor: "transparent",
              }}
            >
              <Home color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          href: "/scan",
          title: "Scan",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                marginTop: 17,
                backgroundColor: "transparent",
              }}
            >
              <Camera color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          href: "/history",
          title: "History",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                marginTop: 17,
                backgroundColor: "transparent",
              }}
            >
              <History color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="menu/[id]"
        options={{ href: null, title: "Menu Receipe" }}
      />
      <Tabs.Screen
        name="scanned"
        options={{ href: null, title: "Scanned Ingredients" }}
      />
    </Tabs>
  );
}
