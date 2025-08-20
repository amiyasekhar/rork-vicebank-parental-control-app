import React, { memo } from "react";
    import { StyleSheet, Text, View } from "react-native";
    import { Colors } from "@/constants/theme";
    
    type Tone = "info" | "warning";
    interface Props {
      tone?: Tone;
      text: string;
      testID?: string;
    }
    
    function BannerBase({ tone = "info", text, testID }: Props) {
      return (
        <View
          testID={testID ?? "banner"}
          style={[
            styles.base,
            tone === "warning" ? styles.warning : styles.info,
          ]}
        >
          <Text style={styles.text}>{text}</Text>
        </View>
      );
    }
    
    export const Banner = memo(BannerBase);
    
    const styles = StyleSheet.create({
      base: {
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginBottom: 12,
      },
      info: { backgroundColor: "#141622", borderWidth: 1, borderColor: "#262A45" },
      warning: { backgroundColor: "#2A1E12", borderWidth: 1, borderColor: "#5C3A17" },
      text: { color: Colors.text, fontSize: 14 },
    });