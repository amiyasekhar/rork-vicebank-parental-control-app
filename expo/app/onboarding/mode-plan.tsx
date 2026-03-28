import React, { useState } from "react";
    import { Stack, router } from "expo-router";
    import { Pressable, StyleSheet, Text, View } from "react-native";
    import { Colors } from "@/constants/theme";
    import { Button } from "@/components/ui/Button";
    import { useApp } from "@/providers/AppStateProvider";
    
    export default function OBModePlan() {
      const { settings, updateSettings, setOnboarded } = useApp();
      const [mode, setMode] = useState(settings.mode);
      const [plan, setPlan] = useState(settings.plan);
      return (
        <View style={styles.container}>
          <Stack.Screen options={{ title: "Choose Mode & Plan" }} />
          <Text style={styles.section}>Mode</Text>
          <View style={styles.row}>
            {[
              { k: "METER_ONLY", label: "Meter-only" },
              { k: "SOFT_GATE", label: "Soft Gate" },
              { k: "HARD_BLOCK", label: "Hard Block" },
            ].map((m) => (
              <Pressable
                key={m.k}
                onPress={() => setMode(m.k as typeof mode)}
                style={[styles.chip, mode === m.k && styles.chipOn]}
              >
                <Text style={styles.chipText}>{m.label}</Text>
              </Pressable>
            ))}
          </View>
          <Text style={styles.section}>Plan</Text>
          <View style={styles.row}>
            {[
              { k: "PAYG", label: "PAYG" },
              { k: "SUB", label: "SUB $9/mo" },
            ].map((p) => (
              <Pressable
                key={p.k}
                onPress={() => setPlan(p.k as typeof plan)}
                style={[styles.chip, plan === p.k && styles.chipOn]}
              >
                <Text style={styles.chipText}>{p.label}</Text>
              </Pressable>
            ))}
          </View>
          <Button
            title="Go to Dashboard"
            onPress={() => {
              updateSettings({ mode, plan, protectionEnabled: true });
              setOnboarded();
              router.replace("/");
            }}
          />
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: { flex: 1, backgroundColor: Colors.background, padding: 16, gap: 16 },
      section: { color: Colors.textMuted, marginTop: 8 },
      row: { flexDirection: "row", gap: 8, flexWrap: "wrap" },
      chip: {
        borderRadius: 999,
        borderWidth: 1,
        borderColor: Colors.border,
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: Colors.surface,
      },
      chipOn: { borderColor: Colors.purpleDark, backgroundColor: "#1B1730" },
      chipText: { color: Colors.text },
    });