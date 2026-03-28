import React from "react";
    import { Link, Stack } from "expo-router";
    import { StyleSheet, Text, View } from "react-native";
    import { Colors } from "@/constants/theme";
    import { Button } from "@/components/ui/Button";
    import { useApp } from "@/providers/AppStateProvider";
    
    export default function SettingsIndex() {
      const { resetAll } = useApp();
      return (
        <View style={styles.container}>
          <Stack.Screen options={{ headerShown: false }} />
          
          <View style={styles.card}>
            <Text style={styles.title}>More</Text>
            <Link href="/(tabs)/settings/blocklist" style={styles.link}><Text style={styles.linkText}>Blocklist</Text></Link>
            {/** Billing removed */}
            <Link href="/(tabs)/settings/permissions" style={styles.link}><Text style={styles.linkText}>Permissions &amp; Privacy</Text></Link>
            <Button variant="secondary" title="Reset app data" onPress={resetAll} />
          </View>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: { flex: 1, backgroundColor: "transparent", padding: 16, gap: 12 },
      card: { backgroundColor: Colors.card, borderRadius: 16, borderWidth: 1, borderColor: Colors.border, padding: 16, gap: 12 },
      title: { color: Colors.text, fontSize: 16, fontWeight: "700" },
      link: { paddingVertical: 8 },
      linkText: { color: Colors.purple },
    });