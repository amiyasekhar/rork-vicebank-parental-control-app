import { Tabs } from "expo-router";
    import { Gauge, History, Settings as SettingsIcon } from "lucide-react-native";
    import React from "react";
    import { Colors } from "@/constants/theme";
    
    export default function TabLayout() {
      return (
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors.purple,
            headerStyle: { backgroundColor: "transparent" },
            headerTintColor: Colors.text,
            tabBarStyle: { backgroundColor: Colors.surface },
            tabBarInactiveTintColor: Colors.textMuted,
            sceneStyle: { backgroundColor: "transparent" },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Dashboard",
              tabBarIcon: ({ color }) => <Gauge color={color} />,
            }}
          />
          {/** Session tab removed; session runs in background */}
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