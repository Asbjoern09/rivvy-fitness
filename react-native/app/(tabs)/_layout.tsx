import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarStyle: {
          backgroundColor: colorScheme === "dark" ? "black" : "white", // Set tab bar background
          elevation: 0, // Remove shadow on Android
          borderTopWidth: 0, // Remove border on iOS
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="workout-configuration"
        options={{
          title: "Create Workout",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "add" : "add-outline"} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
