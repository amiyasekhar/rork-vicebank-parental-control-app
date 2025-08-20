import React, { memo, useCallback } from "react";
    import { Pressable, StyleSheet, Text, View } from "react-native";
    import { Colors } from "@/constants/theme";
    
    interface Props {
      value: boolean;
      onValueChange: (v: boolean) => void;
      label?: string;
      testID?: string;
    }
    
    function ToggleBase({ value, onValueChange, label, testID }: Props) {
      const onPress = useCallback(() => onValueChange(!value), [onValueChange, value]);
      return (
        <View style={styles.row}>
          {label ? <Text style={styles.label}>{label}</Text> : null}
          <Pressable
            testID={testID ?? "toggle"}
            onPress={onPress}
            style={[styles.base, value ? styles.on : styles.off]}
          >
            <View style={[styles.knob, value ? styles.knobOn : styles.knobOff]} />
          </Pressable>
        </View>
      );
    }
    
    export const Toggle = memo(ToggleBase);
    
    const styles = StyleSheet.create({
      row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      },
      label: { color: Colors.text, fontSize: 16, marginRight: 12 },
      base: {
        width: 56,
        height: 32,
        borderRadius: 16,
        padding: 4,
        borderWidth: 1,
        borderColor: Colors.border,
      },
      on: { backgroundColor: "#2D1B69" },
      off: { backgroundColor: Colors.surfaceElevated },
      knob: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: Colors.text,
      },
      knobOn: { alignSelf: "flex-end" },
      knobOff: { alignSelf: "flex-start" },
    });