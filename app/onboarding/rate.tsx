import React, { useState } from "react";
import { Stack, router } from "expo-router";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "@/constants/theme";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/providers/AppStateProvider";

export default function OBRate() {
  const { settings, updateSettings } = useApp();
  const [rate, setRate] = useState<string>(((settings.rateCents ?? 5) / 100).toFixed(2));
  const [error, setError] = useState<string | undefined>();
  const onNext = () => {
    const parsed = parseFloat(rate);
    if (isNaN(parsed) || parsed < 0.05) {
      setError("Minimum $0.05/min");
      return;
    }
    updateSettings({ rateCents: Math.round(parsed * 100) });
    router.push("/onboarding/blocklist");
  };
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Set Your Rate" }} />
      <Text style={styles.helper}>
        This is the price you agree to pay only if you continue after your grace period.
        Your current grace is {Math.round((settings.graceSeconds ?? 0) / 60)} min. We meter time after that at the
        rate below. You can change this later in Settings.
      </Text>
      <View style={styles.inputWrap}>
        <Text style={styles.dollar}>$</Text>
        <TextInput
          keyboardType="decimal-pad"
          value={rate}
          onChangeText={(t) => {
            setRate(t);
            setError(undefined);
          }}
          placeholder="0.05"
          placeholderTextColor={Colors.textMuted}
          style={styles.input}
          testID="rate-input"
        />
        <Text style={styles.suffix}>/min</Text>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Continue" onPress={onNext} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 16, gap: 16 },
  helper: { color: Colors.textMuted },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
  },
  dollar: { color: Colors.text, fontSize: 18, fontWeight: "700" },
  suffix: { color: Colors.textMuted },
  input: { flex: 1, color: Colors.text, fontSize: 18, padding: 8 },
  error: { color: Colors.danger },
});