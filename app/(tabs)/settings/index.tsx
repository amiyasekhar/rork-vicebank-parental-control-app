import React, { useState } from "react";
    import { Link, Stack } from "expo-router";
    import { StyleSheet, Text, TextInput, View } from "react-native";
    import { Colors } from "@/constants/theme";
    import { Toggle } from "@/components/ui/Toggle";
    import { Button } from "@/components/ui/Button";
    import { Slider } from "@/components/ui/Slider";
    import { useApp } from "@/providers/AppStateProvider";
    import { centsToDollarString } from "@/utils/currency";
    
    export default function SettingsIndex() {
      const { settings, updateSettings } = useApp();
      const [rate, setRate] = useState<string>(((settings.rateCents ?? 5) / 100).toFixed(2));
      return (
        <View style={styles.container}>
          <Stack.Screen options={{ headerShown: false }} />
          <View style={styles.card}>
            <Text style={styles.title}>Protection</Text>
            <Toggle
              value={settings.protectionEnabled}
              onValueChange={(v) => updateSettings({ protectionEnabled: v })}
              label="Turn Protection ON"
            />
          </View>
          <View style={styles.card}>
            <Text style={styles.title}>Mode &amp; Plan</Text>
            <View style={styles.row}>
              <Button
                variant={settings.mode === "METER_ONLY" ? "primary" : "secondary"}
                title="Meter-only"
                onPress={() => updateSettings({ mode: "METER_ONLY" })}
              />
              <Button
                variant={settings.mode === "SOFT_GATE" ? "primary" : "secondary"}
                title="Soft Gate"
                onPress={() => updateSettings({ mode: "SOFT_GATE" })}
              />
              <Button
                variant={settings.mode === "HARD_BLOCK" ? "primary" : "secondary"}
                title="Hard Block"
                onPress={() => updateSettings({ mode: "HARD_BLOCK" })}
              />
            </View>
            <View style={styles.row}>
              <Button
                variant={settings.plan === "PAYG" ? "primary" : "secondary"}
                title="PAYG"
                onPress={() => updateSettings({ plan: "PAYG" })}
              />
              <Button
                variant={settings.plan === "SUB" ? "primary" : "secondary"}
                title="SUB $9/mo"
                onPress={() => updateSettings({ plan: "SUB" })}
              />
            </View>
          </View>
          <View style={styles.card}>
            <Text style={styles.title}>Grace Minutes</Text>
            <Slider
              min={0}
              max={180}
              step={15}
              value={settings.graceSeconds}
              onChange={(v) => updateSettings({ graceSeconds: v })}
              formatLabel={(v) => `${(v / 60).toFixed(2)} min`}
            />
          </View>
          <View style={styles.card}>
            <Text style={styles.title}>Rate</Text>
            <View style={styles.inputRow}>
              <Text style={styles.dollar}>$</Text>
              <TextInput
                editable={settings.plan === "PAYG"}
                style={styles.input}
                value={rate}
                onChangeText={setRate}
                onBlur={() => {
                  const parsed = Math.max(0.05, parseFloat(rate || "0"));
                  updateSettings({ rateCents: Math.round(parsed * 100) });
                  setRate(parsed.toFixed(2));
                }}
                placeholder="0.05"
                placeholderTextColor={Colors.textMuted}
                keyboardType="decimal-pad"
              />
              <Text style={styles.suffix}>/min</Text>
            </View>
            {settings.plan === "SUB" ? <Text style={styles.hint}>Included</Text> : <Text style={styles.hint}>Current: {centsToDollarString(settings.rateCents)}/min</Text>}
          </View>
    
          <View style={styles.card}>
            <Text style={styles.title}>More</Text>
            <Link href="/(tabs)/settings/blocklist" style={styles.link}><Text style={styles.linkText}>Blocklist</Text></Link>
            <Link href="/(tabs)/settings/billing" style={styles.link}><Text style={styles.linkText}>Billing &amp; Account</Text></Link>
            <Link href="/(tabs)/settings/permissions" style={styles.link}><Text style={styles.linkText}>Permissions &amp; Privacy</Text></Link>
          </View>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: { flex: 1, backgroundColor: Colors.background, padding: 16, gap: 12 },
      card: { backgroundColor: Colors.card, borderRadius: 16, borderWidth: 1, borderColor: Colors.border, padding: 16, gap: 12 },
      title: { color: Colors.text, fontSize: 16, fontWeight: "700" },
      row: { flexDirection: "row", gap: 8, flexWrap: "wrap" },
      inputRow: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: Colors.border, borderRadius: 12, backgroundColor: Colors.surface, paddingHorizontal: 12, height: 48, gap: 6 },
      input: { flex: 1, color: Colors.text, fontSize: 16 },
      dollar: { color: Colors.text, fontSize: 18, fontWeight: "700" },
      suffix: { color: Colors.textMuted },
      hint: { color: Colors.textMuted, fontSize: 12 },
      link: { paddingVertical: 8 },
      linkText: { color: Colors.purple },
    });