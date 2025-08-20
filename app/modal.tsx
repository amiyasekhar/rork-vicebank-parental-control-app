    import { router } from "expo-router";
    import { StatusBar } from "expo-status-bar";
    import {
      Modal,
      Platform,
      Pressable,
      StyleSheet,
      Text,
      TouchableOpacity,
      View,
    } from "react-native";
    import { Colors } from "@/constants/theme";
    
    export default function ModalScreen() {
      return (
        <Modal
          animationType="fade"
          transparent={true}
          visible={true}
          onRequestClose={() => router.back()}
        >
          <Pressable style={styles.overlay} onPress={() => router.back()}>
            <View style={styles.modalContent}>
              <Text style={styles.title}>Breath &amp; Motivate</Text>
              <Text style={styles.description}>
                Take a 60-second break. Inhale 4s · Hold 4s · Exhale 6s. You&apos;ve got this.
              </Text>
    
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => router.back()}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
    
          <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
        </Modal>
      );
    }
    
    const styles = StyleSheet.create({
      overlay: {
        flex: 1,
        backgroundColor: Colors.overlay,
        justifyContent: "center",
        alignItems: "center",
      },
      modalContent: {
        backgroundColor: Colors.card,
        borderRadius: 20,
        padding: 24,
        margin: 20,
        alignItems: "center",
        minWidth: 300,
        borderWidth: 1,
        borderColor: Colors.border,
      },
      title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16,
        color: Colors.text,
      },
      description: {
        textAlign: "center",
        marginBottom: 24,
        color: Colors.textMuted,
        lineHeight: 20,
      },
      closeButton: {
        backgroundColor: Colors.purpleDark,
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 10,
        minWidth: 100,
      },
      closeButtonText: {
        color: "white",
        fontWeight: "600",
        textAlign: "center",
      },
    });