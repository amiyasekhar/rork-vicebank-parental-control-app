import React from "react";
    import { Stack, router } from "expo-router";
    import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
    import { LinearGradient } from "expo-linear-gradient";
    import { Shield, Clock3, DollarSign } from "lucide-react-native";
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
            <Text style={styles.brand}>
              <Text style={styles.brandWhite}>Vice</Text>
              <Text style={styles.brandPurple}>bank</Text>
            </Text>
            <Text style={styles.h1}>Block adult sites, meter time with a grace period, and only charge after it.</Text>

            <View style={styles.features}>
              <View style={styles.featureRow}>
                <Shield color={Colors.purple} size={20} />
                <Text style={styles.featureText}>Block access to flagged adult domains</Text>
              </View>
              <View style={styles.featureRow}>
                <Clock3 color={Colors.purple} size={20} />
                <Text style={styles.featureText}>Grace meter with an 80% early warning</Text>
              </View>
              <View style={styles.featureRow}>
                <DollarSign color={Colors.purple} size={20} />
                <Text style={styles.featureText}>Only pay per minute beyond grace (or choose SUB)</Text>
              </View>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.caption}>“We store domains and timers, never page content.”</Text>
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
      center: { gap: 20 },
      brand: { fontSize: 34, fontWeight: "800", letterSpacing: 0.5 },
      brandWhite: { color: Colors.text },
      brandPurple: { color: Colors.purple },
      h1: { color: Colors.text, fontSize: 20, lineHeight: 30 },
      features: { gap: 10, marginTop: 6 },
      featureRow: { flexDirection: "row", alignItems: "center", gap: 8 },
      featureText: { color: Colors.text, fontSize: 14 },
      footer: { gap: 12, marginBottom: 12 },
      caption: { color: Colors.textMuted, fontSize: 12, textAlign: "center" },
    });