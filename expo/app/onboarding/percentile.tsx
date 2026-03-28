import React, { useEffect, useRef, useState } from "react";
import { Stack, router } from "expo-router";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/theme";
import { Button } from "@/components/ui/Button";
import { useSessionTimer } from "@/hooks/useSessionTimer";

export default function OBPercentile() {
  // Multiples of 10 between 60 and 90 inclusive
  const [percentile] = useState<number>(() => (Math.floor(Math.random() * 4) + 6) * 10);
  const progress = useRef(new Animated.Value(0)).current;
  const [done, setDone] = useState(false);
  const { startSession } = useSessionTimer();

  useEffect(() => {
    // Animate with random steps to simulate dynamic loading
    const steps = Array.from({ length: 5 }).map(() => 0.2 + Math.random() * 0.2);
    let acc = 0;
    const seq = steps.map((d, i) =>
      Animated.timing(progress, {
        toValue: Math.min(1, (acc += d)),
        duration: 300 + Math.random() * 600,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      })
    );
    Animated.sequence([...seq, Animated.timing(progress, { toValue: 1, duration: 400, useNativeDriver: false })]).start(() => setDone(true));
  }, [progress]);

  const widthInterpolate = progress.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] });

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Analyzing…" }} />
      <View style={styles.card}>
        <Text style={styles.title}>Crunching your answers…</Text>
        <View style={styles.barWrap}>
          <View style={styles.barTrack} />
          <Animated.View style={[styles.barFill, { width: widthInterpolate }]} />
        </View>
        {done ? (
          <View style={{ gap: 8 }}>
            <Text style={styles.h1}>You are in the {percentile}th percentile of porn users.</Text>
            <Text style={styles.copy}>We&apos;re going to fix that for you — if you have the genuine initiative.</Text>
          </View>
        ) : (
          <Text style={styles.copy}>This will only take a moment…</Text>
        )}
      </View>

      <View pointerEvents="box-none" style={styles.centerOverlay}>
        <Button
          title="Put my money where my mouth is"
          disabled={!done}
          onPress={() => {
            try { startSession(); } catch {}
            router.push("/onboarding/grace");
          }}
          style={styles.cta}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "transparent", padding: 16 },
  card: { backgroundColor: Colors.card, borderRadius: 16, borderWidth: 1, borderColor: Colors.border, padding: 16, gap: 12 },
  title: { color: Colors.textMuted },
  barWrap: { height: 10, borderRadius: 6, overflow: "hidden", position: "relative", backgroundColor: Colors.surface },
  barTrack: { ...StyleSheet.absoluteFillObject, backgroundColor: Colors.surfaceElevated },
  barFill: { height: "100%", backgroundColor: Colors.purpleDark },
  h1: { color: Colors.text, fontSize: 16, fontWeight: "700" },
  copy: { color: Colors.textMuted },
  centerOverlay: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, alignItems: "center", justifyContent: "center" },
  cta: { alignSelf: "center", width: "88%", maxWidth: 480 },
});

