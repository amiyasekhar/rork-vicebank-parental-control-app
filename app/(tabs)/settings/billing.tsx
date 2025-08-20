import React from "react";
    import { Stack } from "expo-router";
    import { StyleSheet, Text, View } from "react-native";
    import { Colors } from "@/constants/theme";
    import { useApp } from "@/providers/AppStateProvider";
    import { Button } from "@/components/ui/Button";
    
    export default function Billing() {
      const { settings, updateSettings } = useApp();
      return (
        <View style={styles.container}>
          <Stack.Screen options={{ title: "Billing & Account" }} />
          <Text style={styles.text}>Current plan: {settings.plan === "SUB" ? "SUB $9/mo" : "PAYG"}</Text>
          {settings.plan === "PAYG" ? (
            <Button title="Upgrade to $9/mo" onPress={() => updateSettings({ plan: "SUB" })} />
          ) : (
            <Button title="Manage Subscription" onPress={() => alert("Open Stripe Billing Portal (stub)")} />
          )}
          <View style={{ height: 12 }} />
          <Button variant="secondary" title="Export Data (CSV)" onPress={() => alert("CSV export handled in History")} />
          <View style={{ height: 12 }} />
          <Button variant="ghost" title="Delete account & data" onPress={() => alert("Stubbed in prototype")} />
        </View>
      );
    }
    const styles = StyleSheet.create({
      container: { flex: 1, backgroundColor: Colors.background, padding: 16, gap: 12 },
      text: { color: Colors.text },
    });