import React, { useState } from "react";
import { Stack, router } from "expo-router";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "@/constants/theme";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Toggle } from "@/components/ui/Toggle";
import { useApp } from "@/providers/AppStateProvider";

export default function OBBlocklist() {
  const { blocklist, addCustomDomain, toggleBlocklistItem, updateSettings, setOnboarded } = useApp();
  const [input, setInput] = useState<string>("");
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Review Blocklist" }} />
      <Card title="Custom Domains">
        <View style={styles.addRow}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="example.com or *.site.com"
            placeholderTextColor={Colors.textMuted}
            style={styles.input}
          />
          <Button
            title="Add"
            onPress={() => {
              if (input.trim().length > 0) {
                addCustomDomain(input.trim());
                setInput("");
              }
            }}
          />
        </View>
        <FlatList
          data={blocklist}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>{item.domainPattern}</Text>
              <Toggle value={item.enabled} onValueChange={(v) => toggleBlocklistItem(item.id, v)} />
            </View>
          )}
          ListEmptyComponent={<Text style={styles.empty}>No custom domains yet.</Text>}
          style={{ maxHeight: 200 }}
        />
      </Card>
      <Button
        title="Go to Dashboard"
        onPress={() => {
          updateSettings({ protectionEnabled: true });
          setOnboarded();
          router.replace("/");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 16, gap: 16 },
  addRow: { flexDirection: "row", gap: 8, alignItems: "center" },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    color: Colors.text,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  item: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 10 },
  itemText: { color: Colors.text },
  empty: { color: Colors.textMuted },
});