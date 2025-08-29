import React from "react";
import { Stack } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/theme";
import { useApp } from "@/providers/AppStateProvider";
import { formatSecondsMMSS } from "@/utils/time";
import { centsToDollarString } from "@/utils/currency";

export default function HistoryScreen() {
  const { historyQuery } = useApp();
  const data = historyQuery.data ?? [];

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "History" }} />
      <FlatList
        data={data as any[]}
        keyExtractor={(i: any, idx) => i.date + idx}
        renderItem={({ item }: any) => {
          const watchedSeconds = (item.freeSeconds ?? 0) + (item.paidSeconds ?? 0);
          return (
            <View style={styles.item}>
              <Text style={styles.date}>{item.date}</Text>
              <Text style={styles.text}>Watched {formatSecondsMMSS(watchedSeconds)} · {centsToDollarString(item.costCents)}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "transparent", padding: 16, gap: 12 },
  item: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: Colors.border },
  date: { color: Colors.text, fontWeight: "700", marginBottom: 4 },
  text: { color: Colors.textMuted },
});