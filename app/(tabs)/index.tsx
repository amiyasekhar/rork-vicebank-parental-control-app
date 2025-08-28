import React, { useEffect } from "react";
import { router, Stack } from "expo-router";
import { InteractionManager, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Gauge, DollarSign } from "lucide-react-native";
import { useApp } from "@/providers/AppStateProvider";
import { Colors } from "@/constants/theme";
import { Card } from "@/components/ui/Card";
import { centsToDollarString } from "@/utils/currency";
import { formatSecondsMMSS } from "@/utils/time";

export default function Dashboard() {
  const { isOnboarded, settings, todayUsage, booted } = useApp();

  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      if (!isOnboarded) {
        console.log("[Dashboard] Redirecting to onboarding/welcome");
        router.replace("/onboarding/welcome");
      }
    });
    return () => task.cancel();
  }, [isOnboarded]);

  if (!booted) {
    return (
      <View style={styles.container} testID="dashboard-skeleton">
        <Stack.Screen options={{ title: "Vicebank" }} />
        <Text style={styles.small}>Loading…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container} testID="dashboard">
      <Stack.Screen options={{ title: "Vicebank" }} />
      <LinearGradient colors={["#1B1326", "#0A0A0A"]} style={styles.bgGrad} />
      <View style={styles.bubbleA} />
      <View style={styles.bubbleB} />
      {/* Protection banner removed per product decision */}

      <View style={styles.cardsWrap}>
        <Card title="Time watched today" style={styles.narrowCard}>
          <View style={styles.rowCenter}>
            <Gauge color={Colors.purple} />
            <Text style={styles.big}>{formatSecondsMMSS(todayUsage.freeSeconds + todayUsage.paidSeconds)}</Text>
          </View>
          <Text style={styles.small}>Grace remaining: {formatSecondsMMSS(todayUsage.graceRemainingSeconds)} · Resets {settings.resetTimeLocal}</Text>
        </Card>

        <Card title="Money lost today" style={styles.narrowCard}>
          <View style={styles.rowCenter}>
            <DollarSign color={Colors.purple} />
            <Text style={styles.big}>{centsToDollarString(todayUsage.costCents)}</Text>
          </View>
          {settings.plan === "PAYG" ? (
            <Text style={styles.small}>Rate: {centsToDollarString(settings.rateCents)}/min</Text>
          ) : (
            <Text style={styles.small}>Included in subscription</Text>
          )}
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "transparent", padding: 16, gap: 16 },
  bgGrad: { ...StyleSheet.absoluteFillObject, opacity: 0.35 },
  bubbleA: { position: "absolute", top: -60, right: -40, width: 220, height: 220, borderRadius: 110, backgroundColor: Colors.purple, opacity: 0.12 },
  bubbleB: { position: "absolute", bottom: 120, left: -70, width: 260, height: 260, borderRadius: 130, backgroundColor: Colors.purple, opacity: 0.08 },
  kv: { color: Colors.text, fontSize: 16, marginBottom: 6 },
  small: { color: Colors.textMuted, fontSize: 12 },
  row: { flexDirection: "row", gap: 10 },
  rowCenter: { flexDirection: "row", alignItems: "center", gap: 8 },
  big: { color: Colors.text, fontSize: 32, fontWeight: "800", letterSpacing: 1 },
  cardsWrap: { flex: 1, alignItems: "center", justifyContent: "center", gap: 16 },
  narrowCard: { maxWidth: 420, width: "100%" },
});