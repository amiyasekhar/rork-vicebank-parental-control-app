import React, { useState } from "react";
    import { Stack, router } from "expo-router";
    import { StyleSheet, Text, View } from "react-native";
    import { Slider } from "@/components/ui/Slider";
    import { Colors } from "@/constants/theme";
    import { formatSecondsMMSS } from "@/utils/time";
    import { Button } from "@/components/ui/Button";
    import { useApp } from "@/providers/AppStateProvider";
    
    export default function OBGrace() {
      const { settings, updateSettings } = useApp();
      const [val, setVal] = useState<number>(settings.graceSeconds ?? 180);
      return (
        <View style={styles.container}>
          <Stack.Screen options={{ title: "Set Grace" }} />
          <Text style={styles.helper}>Warn at 80%, meter after.</Text>
          <Slider
            min={0}
            max={180}
            step={15}
            value={val}
            onChange={setVal}
            formatLabel={(v) => `${formatSecondsMMSS(v)} min`}
          />
          <Button
            title="Continue"
            onPress={() => {
              updateSettings({ graceSeconds: val });
              router.push("/onboarding/mode-plan");
            }}
          />
        </View>
      );
    }
    const styles = StyleSheet.create({
      container: { flex: 1, backgroundColor: Colors.background, padding: 16, gap: 16 },
      helper: { color: Colors.textMuted },
    });