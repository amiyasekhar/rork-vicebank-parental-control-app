import React, { useEffect } from "react";
import { router, Stack } from "expo-router";
import { InteractionManager, StyleSheet, Text, View } from "react-native";
import { useApp } from "@/providers/AppStateProvider";
import { Colors } from "@/constants/theme";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Banner } from "@/components/ui/Banner";
import { centsToDollarString } from "@/utils/currency";
import { formatSecondsMMSS } from "@/utils/time";

export default function Dashboard() {
  const { isOnboarded, settings, todayUsage } = useApp();

  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      if (!isOnboarded) {
        console.log("[Dashboard] Redirecting to onboarding/welcome");
        router.replace("/onboarding/welcome");
      }
    });
    return () => task.cancel();
  }, [isOnboarded]);

  return (
    <View style={styles.container} testID="dashboard">
      <Stack.Screen options={{ title: "Vicebank" }} />
      {!settings.protectionEnabled ? (
        <Banner tone="warning" text="Protection OFF — Turn Protection ON" />
      ) : null}

      <Card title="Grace / Usage">
        <Text style={styles.kv}>Grace remaining: {formatSecondsMMSS(todayUsage.graceRemainingSeconds)}</Text>
        <Text style={styles.kv}>
          Used: {formatSecondsMMSS(todayUsage.freeSeconds)} free · {formatSecondsMMSS(todayUsage.paidSeconds)} {settings.plan === "SUB" ? "included" : "paid"}
        </Text>
        <Text style={styles.small}>Resets at {settings.resetTimeLocal}</Text>
      </Card>

      <Card title="Billing">
        {settings.plan === "PAYG" ? (
          <Text style={styles.kv}>
            Rate: {centsToDollarString(settings.rateCents)}/min · This month: {centsToDollarString(todayUsage.costCents)}
          </Text>
        ) : (
          <Text style={styles.kv}>Subscription: $9/mo · Per-minute charges: Included</Text>
        )}
      </Card>

      <View style={styles.row}>
        <Button title="Start Session" onPress={() => router.push("/(tabs)/session")} />
        <Button variant="secondary" title="Edit Blocklist" onPress={() => router.push("/(tabs)/settings/blocklist")} />
      </View>
      <View style={styles.row}>
        <Button variant="ghost" title="History" onPress={() => router.push("/(tabs)/history")} />
        <Button variant="ghost" title="Breath &amp; Motivate" onPress={() => router.push("/modal")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 16, gap: 16 },
  kv: { color: Colors.text, fontSize: 16, marginBottom: 6 },
  small: { color: Colors.textMuted, fontSize: 12 },
  row: { flexDirection: "row", gap: 10 },
});