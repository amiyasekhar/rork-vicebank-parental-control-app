import React, { useState } from "react";
import { Stack } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "@/constants/theme";
import { useApp } from "@/providers/AppStateProvider";
import { Button } from "@/components/ui/Button";
import { Toggle } from "@/components/ui/Toggle";

export default function SettingsBlocklist() {
  const { blocklist, addCustomDomain, toggleBlocklistItem, removeBlocklistItem } = useApp();
  const [input, setInput] = useState<string>("");
  const isEmpty = blocklist.length === 0;
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Blocklist" }} />
      <View style={styles.row}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="example.com or *.site.com"
          placeholderTextColor={Colors.textMuted}
          style={styles.input}
        />
        <Button title="Add" onPress={() => { if (input.trim()) { addCustomDomain(input.trim()); setInput(""); } }} />
      </View>
      <FlatList
        data={blocklist}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={{ flex: 1 }}>
              <Text style={styles.text}>{item.domainPattern}</Text>
              {item.isRecommended ? <Text style={styles.sub}>Recommended</Text> : null}
            </View>
            <Toggle value={item.enabled} onValueChange={(v) => toggleBlocklistItem(item.id, v)} />
            <Pressable onPress={() => removeBlocklistItem(item.id)} style={styles.remove}><Text style={styles.removeTxt}>Remove</Text></Pressable>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        ListEmptyComponent={<Text style={styles.text}>No custom domains yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "transparent", padding: 16 },
  row: { flexDirection: "row", gap: 8, marginBottom: 12 },
  input: { flex: 1, height: 48, backgroundColor: Colors.surface, borderRadius: 12, borderWidth: 1, borderColor: Colors.border, color: Colors.text, paddingHorizontal: 12 },
  item: { flexDirection: "row", alignItems: "center", paddingVertical: 12 },
  text: { color: Colors.text, fontSize: 16 },
  sub: { color: Colors.textMuted, fontSize: 12 },
  remove: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, borderWidth: 1, borderColor: Colors.border, marginLeft: 8 },
  removeTxt: { color: Colors.textMuted, fontSize: 12 },
  sep: { height: 1, backgroundColor: Colors.border },
});