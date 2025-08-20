import React, { memo, useCallback, useMemo } from "react";
    import { GestureResponderEvent, PanResponder, PanResponderInstance, Platform, StyleSheet, Text, View } from "react-native";
    import { Colors } from "@/constants/theme";
    
    interface Props {
      min: number;
      max: number;
      step?: number;
      value: number;
      onChange: (v: number) => void;
      formatLabel?: (v: number) => string;
      testID?: string;
    }
    
    function SliderBase({ min, max, step = 1, value, onChange, formatLabel, testID }: Props) {
      const clamped = Math.min(max, Math.max(min, value));
      const ratio = (clamped - min) / (max - min || 1);
    
      const onMove = useCallback(
        (evt: GestureResponderEvent, width: number, pageX0: number) => {
          const x = evt.nativeEvent.pageX - pageX0;
          const r = Math.min(1, Math.max(0, x / Math.max(1, width)));
          const raw = min + r * (max - min);
          const stepped = Math.round(raw / step) * step;
          onChange(Number(stepped.toFixed(4)));
        },
        [max, min, onChange, step]
      );
    
      const pan: PanResponderInstance = useMemo(
        () =>
          PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {},
            onPanResponderMove: (_evt, _gesture) => {},
            onPanResponderRelease: () => {},
          }),
        []
      );
    
      return (
        <View
          testID={testID ?? "slider"}
          style={styles.container}
          onLayout={() => {}}
          {...pan.panHandlers}
        >
          <View style={styles.track} />
          <View style={[styles.fill, { width: `${ratio * 100}%` }]} />
          <View style={[styles.thumb, { left: `${ratio * 100}%` }]} />
          <Text style={styles.label}>
            {formatLabel ? formatLabel(clamped) : clamped.toFixed(0)}
          </Text>
        </View>
      );
    }
    
    export const Slider = memo(SliderBase);
    
    const styles = StyleSheet.create({
      container: { width: "100%", height: 40, justifyContent: "center" },
      track: {
        position: "absolute",
        height: 6,
        borderRadius: 3,
        backgroundColor: Colors.surfaceElevated,
        left: 0,
        right: 0,
      },
      fill: {
        position: "absolute",
        height: 6,
        borderRadius: 3,
        backgroundColor: Colors.purpleDark,
        left: 0,
      },
      thumb: {
        position: "absolute",
        width: 20,
        height: 20,
        borderRadius: 10,
        marginLeft: -10,
        backgroundColor: Colors.text,
        borderWidth: 2,
        borderColor: Colors.purpleDark,
      },
      label: { marginTop: 8, color: Colors.textMuted, fontSize: 12 },
    });