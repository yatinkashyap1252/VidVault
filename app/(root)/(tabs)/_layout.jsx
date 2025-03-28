import { Tabs } from "expo-router";
import React from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#939393",
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 60,
          width: "100%",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({color}) => <AntDesign name="home" size={24} color={color} />,
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: "bold",
          },
        }}
      />

      <Tabs.Screen
        name="docs"
        options={{
          headerShown: false,
          tabBarLabel: "Docs",
          tabBarIcon: ({color}) => (
            <Ionicons name="document-text" size={24} color={color} />
          ),
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: "bold",
          },
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
