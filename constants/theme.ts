import { Platform } from "react-native";
    
    export const Colors = {
      background: "#0A0A0A",
      surface: "#111111",
      surfaceElevated: "#141414",
      card: "#0F0F10",
      border: "#232323",
      text: "#FFFFFF",
      textMuted: "#9CA3AF",
      success: "#22C55E",
      warning: "#F59E0B",
      danger: "#EF4444",
      purple: "#A855F7",
      purpleDark: "#6D28D9",
      amber: "#F59E0B",
      green: "#10B981",
      overlay: "rgba(0,0,0,0.5)",
    } as const;
    
    export const Gradients = {
      purple: [Colors.purple, Colors.purpleDark] as const,
      green: ["#34D399", "#059669"] as const,
      amber: ["#FCD34D", "#F59E0B"] as const,
    } as const;
    
    export const Shadows = {
      card: Platform.select({
        web: {
          boxShadow: "0px 8px 24px rgba(0,0,0,0.35)",
        } as unknown as undefined,
        default: {},
      }),
    } as const;