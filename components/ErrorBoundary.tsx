import React from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/theme";

interface State {
  hasError: boolean;
  error?: Error;
}
export class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  constructor(props: React.PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error) {
    console.error("ErrorBoundary caught", error);
  }
  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Something went wrong</Text>
          <ScrollView style={styles.scroll}>
            <Text style={styles.error}>{this.state.error?.message ?? "Unknown error"}</Text>
          </ScrollView>
          <Button title="Reload App" onPress={() => location.reload()} />
        </View>
      );
    }
    return this.props.children;
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "transparent", padding: 20, justifyContent: "center" },
  title: { color: Colors.text, fontSize: 18, fontWeight: "700", marginBottom: 12, textAlign: "center" },
  scroll: { maxHeight: 180, marginBottom: 16 },
  error: { color: Colors.textMuted },
});