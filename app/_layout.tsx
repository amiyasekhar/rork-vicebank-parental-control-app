    import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AppProvider } from "@/providers/AppStateProvider";
import { Colors } from "@/constants/theme";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <Stack
      screenOptions={{
        headerBackTitle: "Back",
        headerStyle: { backgroundColor: "transparent" },
        headerTintColor: Colors.text,
        contentStyle: { backgroundColor: "transparent" },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: "modal", title: "Modal" }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ErrorBoundary>
          <AppProvider>
            <View style={{ flex: 1, backgroundColor: Colors.background }}>
              <LinearGradient
                pointerEvents="none"
                colors={["#1B1326", "#0A0A0A"]}
                style={{ ...StyleSheet.absoluteFillObject, opacity: 0.25 }}
                renderToHardwareTextureAndroid
                shouldRasterizeIOS
              />
              <View
                pointerEvents="none"
                style={{ position: "absolute", top: -60, right: -40, width: 220, height: 220, borderRadius: 110, backgroundColor: Colors.purple, opacity: 0.12 }}
                renderToHardwareTextureAndroid
                shouldRasterizeIOS
              />
              <View
                pointerEvents="none"
                style={{ position: "absolute", bottom: 120, left: -70, width: 260, height: 260, borderRadius: 130, backgroundColor: Colors.purple, opacity: 0.08 }}
                renderToHardwareTextureAndroid
                shouldRasterizeIOS
              />
              <RootLayoutNav />
            </View>
          </AppProvider>
        </ErrorBoundary>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}