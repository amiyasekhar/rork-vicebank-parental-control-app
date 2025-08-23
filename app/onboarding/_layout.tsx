import { Stack } from "expo-router";
    import React from "react";
    import { Colors } from "@/constants/theme";
    
    export default function OnboardingLayout() {
      return (
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: Colors.background },
            headerTintColor: Colors.text,
            contentStyle: { backgroundColor: Colors.background },
            headerTitle: "",
          }}
        >
          <Stack.Screen name="welcome" />
          <Stack.Screen name="permissions" />
          <Stack.Screen name="questionnaire" />
          <Stack.Screen name="grace" />
          <Stack.Screen name="rate" />
          <Stack.Screen name="blocklist" />
          <Stack.Screen name="mode-plan" />
        </Stack>
      );
    }