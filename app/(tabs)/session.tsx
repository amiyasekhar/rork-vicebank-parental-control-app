import React, { useMemo } from "react";
    import { Stack } from "expo-router";
    import { StyleSheet, Text, View } from "react-native";
    import { Colors } from "@/constants/theme";
    import { Button } from "@/components/ui/Button";
    import { useSessionTimer } from "@/hooks/useSessionTimer";
    import { formatSecondsMMSS } from "@/utils/time";
    import { centsToDollarString } from "@/utils/currency";
    
    export default function SessionScreen() {
      const { session, startSession, stopSession, commitSession, settings, todayUsage } = useSessionTimer();
    
      const stateLabel = useMemo(() => {
        if (!session.running) return "Idle";
        if (settings.plan === "SUB") return "Included in subscription";
        if (session.withinGrace) return "Free minutes remaining";
        return `Now billing at ${centsToDollarString(settings.rateCents)}/min`;
      }, [session.running, session.withinGrace, settings.plan, settings.rateCents]);
    
      return (
        <View style={styles.container} testID="session">
          <Stack.Screen options={{ title: "Session" }} />
          <Text style={styles.h1}>{stateLabel}</Text>
          <Text style={styles.timer}>{formatSecondsMMSS(session.elapsedSeconds)}</Text>
          <View style={styles.row}>
            {!session.running ? (
              <Button title="Start" onPress={startSession} testID="start-btn" />
            ) : (
              <>
                <Button variant="secondary" title="Pause" onPress={stopSession} />
                <Button title="End Session" onPress={commitSession} />
              </>
            )}
          </View>
          <Text style={styles.note}>Grace remaining today: {formatSecondsMMSS(todayUsage.graceRemainingSeconds)}</Text>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: { flex: 1, backgroundColor: Colors.background, alignItems: "center", justifyContent: "center", padding: 16, gap: 16 },
      h1: { color: Colors.text, fontSize: 16 },
      timer: { color: Colors.text, fontSize: 48, fontWeight: "800", letterSpacing: 2 },
      row: { flexDirection: "row", gap: 12 },
      note: { color: Colors.textMuted },
    });