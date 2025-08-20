import React, { memo } from "react";
    import { ActivityIndicator, GestureResponderEvent, Platform, Pressable, StyleSheet, Text, ViewStyle } from "react-native";
    import { LinearGradient } from "expo-linear-gradient";
    import { Colors, Gradients } from "@/constants/theme";
    
    type Variant = "primary" | "secondary" | "ghost";
    interface Props {
      title: string;
      onPress?: (e: GestureResponderEvent) => void;
      variant?: Variant;
      disabled?: boolean;
      loading?: boolean;
      style?: ViewStyle;
      testID?: string;
    }
    
    function ButtonBase({ title, onPress, variant = "primary", disabled, loading, style, testID }: Props) {
      const content = (
        <Pressable
          testID={testID ?? "btn"}
          onPress={onPress}
          disabled={disabled || loading}
          style={({ pressed }) => [
            styles.base,
            variant === "primary" && styles.primary,
            variant === "secondary" && styles.secondary,
            variant === "ghost" && styles.ghost,
            (disabled || loading) && styles.disabled,
            pressed && !disabled && !loading && styles.pressed,
            style,
          ]}
        >
          {variant === "primary" ? (
            <LinearGradient
              colors={Gradients.purple}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradient}
            />
          ) : null}
          {loading ? (
            <ActivityIndicator color={Colors.text} />
          ) : (
            <Text style={[styles.text, variant !== "primary" && styles.textAlt]} numberOfLines={1}>
              {title}
            </Text>
          )}
        </Pressable>
      );
      return content;
    }
    
    export const Button = memo(ButtonBase);
    
    const styles = StyleSheet.create({
      base: {
        minHeight: 48,
        borderRadius: 14,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 16,
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
      },
      primary: {
        backgroundColor: Colors.purpleDark,
        borderColor: "transparent",
      },
      secondary: {
        backgroundColor: Colors.surfaceElevated,
      },
      ghost: {
        backgroundColor: "transparent",
        borderColor: Colors.border,
      },
      disabled: {
        opacity: 0.5,
      },
      pressed: {
        opacity: Platform.OS === "web" ? 0.9 : 0.8,
      },
      text: {
        color: Colors.text,
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 0.2,
      },
      textAlt: {
        color: Colors.text,
      },
      gradient: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.5,
      },
    });