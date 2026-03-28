import React, { memo, useCallback, useMemo, useRef, useState } from "react";
    import { GestureResponderEvent, LayoutChangeEvent, PanResponder, PanResponderInstance, Platform, StyleSheet, Text, View } from "react-native";
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
      const [trackWidth, setTrackWidth] = useState<number>(0);
      const [trackPageX, setTrackPageX] = useState<number>(0);

      const clamped = Math.min(max, Math.max(min, value));
      const ratio = (clamped - min) / (max - min || 1);

      const commitFromX = useCallback(
        (xFromPage: number) => {
          const x = xFromPage - trackPageX;
          const r = Math.min(1, Math.max(0, x / Math.max(1, trackWidth)));
          const raw = min + r * (max - min);
          const stepped = Math.round(raw / step) * step;
          onChange(Number(stepped.toFixed(4)));
        },
        [max, min, onChange, step, trackPageX, trackWidth]
      );

      const onLayoutTrack = useCallback((e: LayoutChangeEvent) => {
        const { width } = e.nativeEvent.layout;
        setTrackWidth(width);
        // measure pageX using onLayout target's layout; fallback via refs would be more precise
      }, []);

      const pan: PanResponderInstance = useMemo(
        () =>
          PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: (evt) => {
              // Lazily capture absolute left when first interacting
              if (trackPageX === 0) {
                // Native event lacks direct pageX of element; best-effort using touch point
                setTrackPageX(evt.nativeEvent.pageX - ratio * Math.max(1, trackWidth));
              }
              commitFromX(evt.nativeEvent.pageX);
            },
            onPanResponderMove: (evt) => {
              commitFromX(evt.nativeEvent.pageX);
            },
            onPanResponderRelease: (evt) => {
              commitFromX(evt.nativeEvent.pageX);
            },
          }),
        [commitFromX, ratio, trackWidth, trackPageX]
      );

      return (
        <View testID={testID ?? "slider"} style={styles.container}>
          <View style={styles.trackContainer} onLayout={onLayoutTrack} {...pan.panHandlers}>
            <View style={styles.track} />
            <View style={[styles.fill, { width: `${ratio * 100}%` }]} />
            <View style={[styles.thumb, { left: `${ratio * 100}%` }]} />
          </View>
          <Text style={styles.label}>
            {formatLabel ? formatLabel(clamped) : clamped.toFixed(0)}
          </Text>
        </View>
      );
    }
    
    export const Slider = memo(SliderBase);
    
    const styles = StyleSheet.create({
      container: { width: "100%", gap: 8 },
      trackContainer: {
        width: "100%",
        height: 40,
        justifyContent: "center",
      },
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
      label: { marginTop: 8, color: Colors.textMuted, fontSize: 12, textAlign: "center" },
    });