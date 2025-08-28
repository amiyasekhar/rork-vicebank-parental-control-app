import { Stack } from "expo-router";
    import React from "react";
    import { Colors } from "@/constants/theme";
    
    export default function OnboardingLayout() {
      return (
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: "transparent" },
            headerTintColor: Colors.text,
            contentStyle: { backgroundColor: "transparent" },
            headerTitle: "",
          }}
        >
          <Stack.Screen name="welcome" />
          <Stack.Screen name="permissions" />
          <Stack.Screen name="questionnaire" />
          <Stack.Screen name="grace" />
          <Stack.Screen name="rate" />
          <Stack.Screen name="blocklist" />
          {/** mode-plan removed from the flow */}
        </Stack>
      );
    }