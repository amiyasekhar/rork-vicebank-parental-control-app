import React from "react";
    import { Stack, router } from "expo-router";
    import { StyleSheet, Text, View } from "react-native";
    import { LinearGradient } from "expo-linear-gradient";
    import { Button } from "@/components/ui/Button";
    import { Colors, Gradients } from "@/constants/theme";
    
    export default function OBWelcome() {
      return (
        <View style={styles.container} testID="ob-welcome">
          <Stack.Screen options={{ headerShown: false }} />
          <LinearGradient colors={Gradients.purple} style={styles.bgGrad} />
          <View style={styles.bubbleA} />
          <View style={styles.bubbleB} />

          <View style={styles.center}>
            <View style={styles.hero}>
              <Text style={styles.brand}>
                <Text style={styles.brandWhite}>Vice</Text>
                <Text style={styles.brandPurple}>bank</Text>
              </Text>
              <Text style={styles.h1}>Financial accountability to keep you from gooning.</Text>
            </View>
          </View>

          <View style={styles.footer}>
            <Button title="Get Started" onPress={() => router.push("/onboarding/permissions")} />
          </View>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: { flex: 1, backgroundColor: "transparent", padding: 24, paddingTop: 72, justifyContent: "space-between" },
      bgGrad: { ...StyleSheet.absoluteFillObject, opacity: 0.06 },
      bubbleA: { position: "absolute", top: -60, right: -40, width: 220, height: 220, borderRadius: 110, backgroundColor: Colors.purple, opacity: 0.12 },
      bubbleB: { position: "absolute", bottom: 120, left: -70, width: 260, height: 260, borderRadius: 130, backgroundColor: Colors.purple, opacity: 0.08 },
      center: { flex: 1, gap: 20 },
      hero: { flexGrow: 1, alignItems: "center", justifyContent: "center", gap: 10 },
      brand: { fontSize: 34, fontWeight: "800", letterSpacing: 0.5, textAlign: "center" },
      brandWhite: { color: Colors.text },
      brandPurple: { color: Colors.purple },
      h1: { color: Colors.text, fontSize: 20, lineHeight: 30, textAlign: "center" },
      footer: { gap: 12, marginBottom: 12 },
    });