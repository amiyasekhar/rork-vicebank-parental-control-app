import React from "react";
    import { Stack } from "expo-router";
    import { StyleSheet, Text, View } from "react-native";
    import { Colors } from "@/constants/theme";
    import { Toggle } from "@/components/ui/Toggle";
    import { useApp } from "@/providers/AppStateProvider";
    
    export default function PermissionsPrivacy() {
      const { settings, updateSettings } = useApp();
      const p = settings.permissions;
      return (
        <View style={styles.container}>
          <Stack.Screen options={{ title: "Permissions & Privacy" }} />
          <View style={styles.row}>
            <Text style={styles.label}>Network Filter</Text>
            <Toggle value={p.networkFilter} onValueChange={(v) => updateSettings({ permissions: { ...p, networkFilter: v } })} />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Usage Access</Text>
            <Toggle value={p.usageAccess} onValueChange={(v) => updateSettings({ permissions: { ...p, usageAccess: v } })} />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Notifications</Text>
            <Toggle value={p.notifications} onValueChange={(v) => updateSettings({ permissions: { ...p, notifications: v } })} />
          </View>
          <Text style={styles.privacy}>&quot;We store domains and timers, never page content.&quot;</Text>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: { flex: 1, backgroundColor: Colors.background, padding: 16, gap: 12 },
      row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 8 },
      label: { color: Colors.text, fontSize: 16 },
      privacy: { color: Colors.textMuted, marginTop: 12 },
    });