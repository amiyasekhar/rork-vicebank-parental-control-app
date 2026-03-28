import { useEffect } from "react";
    import { Platform } from "react-native";
    import { useApp } from "@/providers/AppStateProvider";
    import * as Haptics from "expo-haptics";
    
    export function useSessionTimer() {
      const { session, startSession, stopSession, commitSession, settings, todayUsage } = useApp();
    
      useEffect(() => {
        if (!session.running) return;
        const nearBoundary = settings.plan === "PAYG" && session.withinGrace && session.elapsedSeconds >= Math.floor((todayUsage.graceRemainingSeconds * 0.8));
        if (nearBoundary && Platform.OS !== "web") {
          Haptics.selectionAsync().catch(() => {});
        }
      }, [session.running, session.elapsedSeconds, settings.plan, session.withinGrace, todayUsage.graceRemainingSeconds]);
    
      return { session, startSession, stopSession, commitSession, settings, todayUsage };
    }