import React, { useMemo, useState } from "react";
import { Stack, router } from "expo-router";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Colors } from "@/constants/theme";
import { useApp } from "@/providers/AppStateProvider";

interface Q {
  key: string;
  title: string;
  type: "single" | "multi" | "likert";
  options?: string[];
}

const QUESTIONS: Q[] = [
  { key: "Q1", title: "Gender", type: "single", options: ["Male", "Female", "Non-binary", "Prefer not to say"] },
  { key: "Q2", title: "Age range", type: "single", options: ["13-17", "18-24", "25-34", "35-44", "45+"] },
  { key: "Q3", title: "Past-30-days frequency", type: "single", options: ["Never", "1-3", "4-10", "11-20", "20+"] },
  { key: "Q4", title: "Typical daily time", type: "single", options: ["<10m", "10-30m", "30-60m", "1-2h", "2h+"] },
  { key: "Q5", title: "First exposure age", type: "single", options: ["<10", "10-12", "13-15", "16+"] },
  { key: "Q6", title: "Escalation", type: "single", options: ["No", "Maybe", "Yes", "Prefer not to say"] },
  { key: "Q7", title: "Arousal without porn", type: "likert", options: ["1", "2", "3", "4", "5"] },
  { key: "Q8", title: "Triggers (multi-select)", type: "multi", options: ["Lonely", "Stress", "Bored", "Late night", "Social media"] },
  { key: "Q9", title: "Spent money last 3 months", type: "single", options: ["No", "Yes: <$10", "$10-$50", "$50-$200", "$200+"] },
  { key: "Q10", title: "Goals & boundaries (multi-select)", type: "multi", options: ["Reduce time", "Weekday block", "Hard block nights", "Grace only", "Prefer not to say"] },
];

export default function OBQ() {
  const { setQuestionAnswer } = useApp();
  const [step, setStep] = useState<number>(0);
  const [selected, setSelected] = useState<string[]>([]);

  const q = QUESTIONS[step];
  const pct = Math.round(((step + 1) / QUESTIONS.length) * 100);

  const next = () => {
    setQuestionAnswer({ key: q.key, value: q.type === "single" ? selected[0] ?? null : selected });
    if (step === QUESTIONS.length - 1) {
      router.push("/onboarding/rate");
    } else {
      setSelected([]);
      setStep((s) => s + 1);
    }
  };

  const skip = () => router.push("/onboarding/rate");

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Question ${step + 1} of 10` }} />
      <Card title={q.title}>
        <ScrollView style={{ maxHeight: 300 }}>
          <View style={{ gap: 12 }}>
            {q.options?.map((opt) => {
              const on = selected.includes(opt);
              return (
                <Pressable
                  key={opt}
                  testID={`qopt-${opt}`}
                  onPress={() => {
                    setSelected((prev) => {
                      if (q.type === "single") return [opt];
                      if (prev.includes(opt)) return prev.filter((x) => x !== opt);
                      return [...prev, opt];
                    });
                  }}
                  style={[styles.option, on && styles.optionOn]}
                >
                  <Text style={styles.optText}>{opt}</Text>
                </Pressable>
              );
            })}
            <Pressable onPress={() => setSelected(["Prefer not to say"])} style={styles.prefer}>
              <Text style={styles.preferText}>Prefer not to say</Text>
            </Pressable>
          </View>
        </ScrollView>
      </Card>
      <View style={styles.actions}>
        <Button variant="ghost" title="Skip" onPress={skip} />
        <Button title="Next" onPress={next} />
      </View>
      <Text style={styles.progress}>{pct}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 16, gap: 16 },
  option: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 12,
    backgroundColor: Colors.surface,
  },
  optionOn: { borderColor: Colors.purpleDark, backgroundColor: "#1B1730" },
  optText: { color: Colors.text },
  actions: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  progress: { color: Colors.textMuted, textAlign: "center" },
  prefer: { padding: 8 },
  preferText: { color: Colors.textMuted, fontSize: 12, textAlign: "center" },
});