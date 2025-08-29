import React from "react";
    import { Stack } from "expo-router";
    import { StyleSheet, Text, View } from "react-native";
    import { Colors } from "@/constants/theme";
    import { Toggle } from "@/components/ui/Toggle";
    import { Card } from "@/components/ui/Card";
    import { useApp } from "@/providers/AppStateProvider";
    
    export default function PermissionsPrivacy() {
      const { settings, updateSettings } = useApp();
      const p = settings.permissions;
      return (
        <View style={styles.container}>
          <Stack.Screen options={{ title: "Permissions & Privacy" }} />
          <Card title="What we need & why">
            <View style={styles.item}>
              <View style={styles.itemText}>
                <Text style={styles.label}>Network Filter</Text>
                <Text style={styles.desc}>Allows us to detect and block flagged domains on-device. We never inspect page content.</Text>
              </View>
              <Toggle value={p.networkFilter} onValueChange={(v) => updateSettings({ permissions: { ...p, networkFilter: v } })} disabled />
            </View>

            <View style={styles.item}>
              <View style={styles.itemText}>
                <Text style={styles.label}>Usage Access</Text>
                <Text style={styles.desc}>Enables time tracking per app/site so we can meter and warn at your thresholds.</Text>
              </View>
              <Toggle value={p.usageAccess} onValueChange={(v) => updateSettings({ permissions: { ...p, usageAccess: v } })} disabled />
            </View>

            <View style={styles.item}>
              <View style={styles.itemText}>
                <Text style={styles.label}>Notifications</Text>
                <Text style={styles.desc}>Sends reminders and warnings when you approach limits and when protection is active.</Text>
              </View>
              <Toggle value={p.notifications} onValueChange={(v) => updateSettings({ permissions: { ...p, notifications: v } })} disabled />
            </View>
          </Card>
          <Text style={styles.privacy}>We store domains and timers, never page content. You can change these anytime.</Text>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: { flex: 1, backgroundColor: Colors.background, padding: 16, gap: 12 },
      item: { flexDirection: "row", gap: 12, alignItems: "center", justifyContent: "space-between", paddingVertical: 12 },
      itemText: { flex: 1, gap: 4 },
      label: { color: Colors.text, fontSize: 16, fontWeight: "600" },
      desc: { color: Colors.textMuted, fontSize: 12 },
      privacy: { color: Colors.textMuted, marginTop: 12 },
    });