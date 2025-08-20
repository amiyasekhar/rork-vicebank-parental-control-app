import { Tabs } from "expo-router";
    import { Gauge, History, Settings as SettingsIcon, PlayCircle } from "lucide-react-native";
    import React from "react";
    import { Colors } from "@/constants/theme";
    
    export default function TabLayout() {
      return (
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors.purple,
            headerStyle: { backgroundColor: Colors.background },
            headerTintColor: Colors.text,
            tabBarStyle: { backgroundColor: Colors.surface },
            tabBarInactiveTintColor: Colors.textMuted,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Dashboard",
              tabBarIcon: ({ color }) => <Gauge color={color} />,
            }}
          />
          <Tabs.Screen
            name="session"
            options={{
              title: "Session",
              tabBarIcon: ({ color }) => <PlayCircle color={color} />,
            }}
          />
          <Tabs.Screen
            name="history"
            options={{
              title: "History",
              tabBarIcon: ({ color }) => <History color={color} />,
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: "Settings",
              tabBarIcon: ({ color }) => <SettingsIcon color={color} />,
            }}
          />
        </Tabs>
      );
    }