import React, { useMemo, useState } from "react";
import { Stack } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/theme";
import { useApp } from "@/providers/AppStateProvider";
import { formatSecondsMMSS } from "@/utils/time";
import { centsToDollarString } from "@/utils/currency";
import { Button } from "@/components/ui/Button";

export default function HistoryScreen() {
  const { historyQuery, chargesQuery, domainsQuery } = useApp();
  const [tab, setTab] = useState<"usage" | "charges" | "domains">("usage");
  const data = useMemo(() => {
    if (tab === "usage") return historyQuery.data ?? [];
    if (tab === "charges") return chargesQuery.data ?? [];
    return domainsQuery.data ?? [];
  }, [tab, historyQuery.data, chargesQuery.data, domainsQuery.data]);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "History / Ledger" }} />
      <View style={styles.tabs}>
        <Button variant={tab === "usage" ? "primary" : "ghost"} title="Usage" onPress={() => setTab("usage")} />
        <Button variant={tab === "charges" ? "primary" : "ghost"} title="Charges" onPress={() => setTab("charges")} />
        <Button variant={tab === "domains" ? "primary" : "ghost"} title="Domains" onPress={() => setTab("domains")} />
      </View>
      {tab === "usage" ? (
        <FlatList
          data={data as any[]}
          keyExtractor={(i: any, idx) => i.date + idx}
          renderItem={({ item }: any) => (
            <View style={styles.item}>
              <Text style={styles.date}>{item.date}</Text>
              <Text style={styles.text}>Free {formatSecondsMMSS(item.freeSeconds)} · Paid {formatSecondsMMSS(item.paidSeconds)} · {centsToDollarString(item.costCents)}</Text>
            </View>
          )}
        />
      ) : null}
      {tab === "charges" ? (
        <FlatList
          data={data as any[]}
          keyExtractor={(i: any) => i.id}
          renderItem={({ item }: any) => (
            <View style={styles.item}>
              <Text style={styles.date}>{item.date}</Text>
              <Text style={styles.text}>{item.minutes} min · {centsToDollarString(item.amountCents)}</Text>
            </View>
          )}
        />
      ) : null}
      {tab === "domains" ? (
        <FlatList
          data={data as any[]}
          keyExtractor={(i: any, idx) => i.domain + idx}
          renderItem={({ item }: any) => (
            <View style={styles.item}>
              <Text style={styles.date}>{item.domain}</Text>
              <Text style={styles.text}>Sessions {item.sessions} · {formatSecondsMMSS(item.totalSeconds)}</Text>
            </View>
          )}
        />
      ) : null}
      <Button
        title="Export CSV"
        variant="secondary"
        onPress={() => {
          try {
            const rows: string[] = [];
            rows.push("date,free_seconds,paid_seconds,cost_cents");
            (historyQuery.data ?? []).forEach((d) => rows.push(`${d.date},${d.freeSeconds},${d.paidSeconds},${d.costCents}`));
            const csv = rows.join("\n");
            if (typeof window !== "undefined") {
              const blob = new Blob([csv], { type: "text/csv" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "usage.csv";
              a.click();
              URL.revokeObjectURL(url);
            } else {
              console.log("CSV:\n", csv);
            }
          } catch {
            console.log("Failed to export CSV");
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "transparent", padding: 16, gap: 12 },
  tabs: { flexDirection: "row", gap: 8 },
  item: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: Colors.border },
  date: { color: Colors.text, fontWeight: "700", marginBottom: 4 },
  text: { color: Colors.textMuted },
});