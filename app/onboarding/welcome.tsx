import React from "react";
    import { Stack, router } from "expo-router";
    import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
    import { LinearGradient } from "expo-linear-gradient";
    import { Button } from "@/components/ui/Button";
    import { Colors, Gradients } from "@/constants/theme";
    
    export default function OBWelcome() {
      return (
        <View style={styles.container} testID="ob-welcome">
          <Stack.Screen options={{ headerShown: false }} />
          <LinearGradient colors={Gradients.purple} style={styles.bgGrad} />
          <View style={styles.center}>
            <Text style={styles.brand}>
              <Text style={styles.brandWhite}>Vice</Text>
              <Text style={styles.brandPurple}>bank</Text>
            </Text>
            <Text style={styles.h1}>Block adult sites, monitor time, use a small grace period—and only charge beyond it.</Text>
          </View>
          <View style={styles.footer}>
            <Text style={styles.caption}>&quot;We store domains and timers, never page content.&quot;</Text>
            <Button title="Get Started" onPress={() => router.push("/onboarding/permissions")} />
          </View>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: { flex: 1, backgroundColor: Colors.background, padding: 24, justifyContent: "space-between" },
      bgGrad: { ...StyleSheet.absoluteFillObject, opacity: 0.08 },
      center: { gap: 16, marginTop: 40 },
      brand: { fontSize: 28, fontWeight: "800", letterSpacing: 0.5 },
      brandWhite: { color: Colors.text },
      brandPurple: { color: Colors.purple },
      h1: { color: Colors.text, fontSize: 18, lineHeight: 26 },
      footer: { gap: 12 },
      caption: { color: Colors.textMuted, fontSize: 12, textAlign: "center" },
    });