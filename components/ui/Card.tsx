import React, { memo, ReactNode } from "react";
    import { StyleSheet, Text, View, ViewStyle } from "react-native";
    import { Colors } from "@/constants/theme";
    
    interface Props {
      title?: string;
      right?: ReactNode;
      children?: ReactNode;
      style?: ViewStyle;
      testID?: string;
    }
    function CardBase({ title, right, children, style, testID }: Props) {
      return (
        <View testID={testID ?? "card"} style={[styles.card, style]}>
          {title ? (
            <View style={styles.header}>
              <Text style={styles.title}>{title}</Text>
              {right}
            </View>
          ) : null}
          <View style={styles.body}>{children}</View>
        </View>
      );
    }
    export const Card = memo(CardBase);
    
    const styles = StyleSheet.create({
      card: {
        backgroundColor: Colors.card,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.border,
        padding: 16,
      },
      header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12,
      },
      title: { color: Colors.text, fontSize: 16, fontWeight: "700" },
      body: {},
    });