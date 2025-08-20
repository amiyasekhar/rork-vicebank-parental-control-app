import { Stack } from "expo-router";
    import React from "react";
    import { Colors } from "@/constants/theme";
    
    export default function SettingsLayout() {
      return (
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: Colors.background },
            headerTintColor: Colors.text,
            contentStyle: { backgroundColor: Colors.background },
          }}
        >
          <Stack.Screen name="index" options={{ title: "Settings" }} />
          <Stack.Screen name="blocklist" options={{ title: "Blocklist" }} />
          <Stack.Screen name="billing" options={{ title: "Billing & Account" }} />
          <Stack.Screen name="permissions" options={{ title: "Permissions & Privacy" }} />
        </Stack>
      );
    }