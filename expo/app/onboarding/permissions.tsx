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
      const canContinue = settings.permissions.networkFilter && settings.permissions.usageAccess;
      return (
        <View style={styles.container}>
          <Stack.Screen options={{ title: "Enable Protection" }} />
          <Card title="What we need & why">
            <View style={styles.item}>
              <View style={styles.itemText}>
                <Text style={styles.label}>Network Filter</Text>
                <Text style={styles.desc}>Allows blocking flagged domains on-device. We never inspect page content.</Text>
              </View>
              <Toggle
                value={settings.permissions.networkFilter}
                onValueChange={(v) => updateSettings({ permissions: { ...settings.permissions, networkFilter: v } })}
              />
            </View>
            <View style={styles.item}>
              <View style={styles.itemText}>
                <Text style={styles.label}>Usage Access</Text>
                <Text style={styles.desc}>Lets us meter time and warn before limits. No browsing content is collected.</Text>
              </View>
              <Toggle
                value={settings.permissions.usageAccess}
                onValueChange={(v) => updateSettings({ permissions: { ...settings.permissions, usageAccess: v } })}
              />
            </View>
            <View style={styles.item}>
              <View style={styles.itemText}>
                <Text style={styles.label}>Notifications</Text>
                <Text style={styles.desc}>Sends reminders when approaching limits and status updates.</Text>
              </View>
              <Toggle
                value={settings.permissions.notifications}
                onValueChange={(v) => updateSettings({ permissions: { ...settings.permissions, notifications: v } })}
              />
            </View>
          </Card>
          <Text style={styles.footer}>We store domains and timers, never page content. You can change these anytime.</Text>
          <Button title="Continue" onPress={() => router.push("/onboarding/questionnaire")} disabled={!canContinue} />
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: { flex: 1, backgroundColor: "transparent", padding: 16, gap: 16 },
      item: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 12, gap: 12 },
      itemText: { flex: 1, gap: 4 },
      label: { color: Colors.text, fontSize: 16, fontWeight: "600" },
      desc: { color: Colors.textMuted, fontSize: 12 },
      footer: { color: Colors.textMuted, fontSize: 12, textAlign: "center" },
    });