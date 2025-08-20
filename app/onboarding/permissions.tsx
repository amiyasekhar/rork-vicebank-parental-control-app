import React from "react";
    import { Stack, router } from "expo-router";
    import { StyleSheet, Text, View } from "react-native";
    import { Button } from "@/components/ui/Button";
    import { Card } from "@/components/ui/Card";
    import { Toggle } from "@/components/ui/Toggle";
    import { Colors } from "@/constants/theme";
    import { useApp } from "@/providers/AppStateProvider";
    
    export default function OBPermissions() {
      const { settings, updateSettings } = useApp();
      return (
        <View style={styles.container}>
          <Stack.Screen options={{ title: "Enable Protection" }} />
          <Card title="Permissions">
            <View style={styles.row}>
              <Text style={styles.label}>Network Filter</Text>
              <Toggle
                value={settings.permissions.networkFilter}
                onValueChange={(v) => updateSettings({ permissions: { ...settings.permissions, networkFilter: v } })}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Usage Access</Text>
              <Toggle
                value={settings.permissions.usageAccess}
                onValueChange={(v) => updateSettings({ permissions: { ...settings.permissions, usageAccess: v } })}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Notifications</Text>
              <Toggle
                value={settings.permissions.notifications}
                onValueChange={(v) => updateSettings({ permissions: { ...settings.permissions, notifications: v } })}
              />
            </View>
          </Card>
          <Text style={styles.footer}>&quot;We store domains and timers, never page content.&quot;</Text>
          <Button title="Continue" onPress={() => router.push("/onboarding/questionnaire")} />
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: { flex: 1, backgroundColor: Colors.background, padding: 16, gap: 16 },
      row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 12 },
      label: { color: Colors.text, fontSize: 16 },
      footer: { color: Colors.textMuted, fontSize: 12, textAlign: "center" },
    });