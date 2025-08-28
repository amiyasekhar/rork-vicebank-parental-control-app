import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import createContextHook from "@nkzw/create-context-hook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { localMidnightEpochMs } from "@/utils/time";
import type { BlocklistItem, FeatureFlags, HistoryDay, PlanType, SessionState, SettingsState, TodayUsage, ChargeItem, DomainUsage, QuestionnaireAnswer } from "@/types/app";

const SETTINGS_KEY = "vicebank.settings.v1";
const BLOCKLIST_KEY = "vicebank.blocklist.v1";
const USAGE_TODAY_KEY = "vicebank.usage.today.v1";
const QUESTIONNAIRE_KEY = "vicebank.q.answers.v1";

function defaultSettings(): SettingsState {
  return {
    protectionEnabled: true,
    mode: "SOFT_GATE",
    plan: "PAYG",
    graceSeconds: 180,
    rateCents: 5,
    resetTimeLocal: "12:00 AM",
    notifications: { graceWarning: true, billingStart: true, dailySummary: true },
    spendingCaps: { enabled: false },
    gamification: { enabled: true, leaderboardOptIn: false, rewardIntensity: "MEDIUM" },
    permissions: { networkFilter: false, usageAccess: false, notifications: false },
  };
}

function flagsForPlan(plan: PlanType): FeatureFlags {
  return plan === "SUB"
    ? {
        spinsPerDay: 2,
        historyRetentionDays: null,
        csvExportsPerMonth: null,
        chestIntervalDays: 3,
        premiumThemes: true,
        priorityBlocklist: true,
      }
    : {
        spinsPerDay: 1,
        historyRetentionDays: 30,
        csvExportsPerMonth: 3,
        chestIntervalDays: 4,
        premiumThemes: false,
        priorityBlocklist: false,
      };
}

export const [AppProvider, useApp] = createContextHook(() => {
  const queryClient = useQueryClient();
  const [settings, setSettings] = useState<SettingsState>(defaultSettings());
  const [blocklist, setBlocklist] = useState<BlocklistItem[]>([]);
  const [todayUsage, setTodayUsage] = useState<TodayUsage>({
    date: new Date().toDateString(),
    freeSeconds: 0,
    paidSeconds: 0,
    costCents: 0,
    graceRemainingSeconds: 180,
    resetsAtEpochMs: localMidnightEpochMs(),
  });
  const [session, setSession] = useState<SessionState>({
    running: false,
    withinGrace: true,
    paidActive: false,
    includedActive: false,
    totalPausedMs: 0,
    pausedAt: null,
    elapsedSeconds: 0,
  });
  const [answers, setAnswers] = useState<QuestionnaireAnswer[]>([]);
  const bootedRef = useRef<boolean>(false);
  const [booted, setBooted] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const [s, b, u, q] = await Promise.all([
          AsyncStorage.getItem(SETTINGS_KEY),
          AsyncStorage.getItem(BLOCKLIST_KEY),
          AsyncStorage.getItem(USAGE_TODAY_KEY),
          AsyncStorage.getItem(QUESTIONNAIRE_KEY),
        ]);
        if (s) setSettings(JSON.parse(s) as SettingsState);
        if (b) setBlocklist(JSON.parse(b) as BlocklistItem[]);
        if (u) setTodayUsage(JSON.parse(u) as TodayUsage);
        if (q) setAnswers(JSON.parse(q) as QuestionnaireAnswer[]);
      } catch (e) {
        console.log("Failed to load persisted state", e);
      } finally {
        bootedRef.current = true;
        setBooted(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (!booted) return;
    AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)).catch(() => {});
  }, [settings, booted]);
  useEffect(() => {
    if (!booted) return;
    AsyncStorage.setItem(BLOCKLIST_KEY, JSON.stringify(blocklist)).catch(() => {});
  }, [blocklist, booted]);
  useEffect(() => {
    if (!booted) return;
    AsyncStorage.setItem(USAGE_TODAY_KEY, JSON.stringify(todayUsage)).catch(() => {});
  }, [todayUsage, booted]);
  useEffect(() => {
    if (!booted) return;
    AsyncStorage.setItem(QUESTIONNAIRE_KEY, JSON.stringify(answers)).catch(() => {});
  }, [answers, booted]);

  const isOnboarded = Boolean(settings.onboardedAt);
  const featureFlags = useMemo<FeatureFlags>(() => flagsForPlan(settings.plan), [settings.plan]);

  const updateSettings = useCallback((patch: Partial<SettingsState>) => {
    setSettings((prev) => ({ ...prev, ...patch }));
  }, []);

  const addCustomDomain = useCallback((pattern: string) => {
    const item: BlocklistItem = {
      id: `${Date.now()}`,
      domainPattern: pattern.trim(),
      enabled: true,
      isRecommended: false,
      createdAt: Date.now(),
    };
    setBlocklist((prev) => [item, ...prev]);
  }, []);
  const toggleBlocklistItem = useCallback((id: string, enabled: boolean) => {
    setBlocklist((prev) => prev.map((i) => (i.id === id ? { ...i, enabled } : i)));
  }, []);
  const removeBlocklistItem = useCallback((id: string) => {
    setBlocklist((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const startSession = useCallback(() => {
    console.log("Start session");
    setSession({
      id: `${Date.now()}`,
      startedAt: Date.now(),
      pausedAt: null,
      totalPausedMs: 0,
      running: true,
      withinGrace: settings.plan === "SUB" ? false : todayUsage.graceRemainingSeconds > 0,
      paidActive: false,
      includedActive: settings.plan === "SUB",
      elapsedSeconds: 0,
    });
  }, [settings.plan, todayUsage.graceRemainingSeconds]);

  const stopSession = useCallback(() => {
    console.log("Stop session");
    setSession((prev) => ({ ...prev, running: false }));
  }, []);

  const tickSession = useCallback(() => {
    setSession((prev) => {
      if (!prev.running || !prev.startedAt) return prev;
      const now = Date.now();
      const elapsedMs = now - prev.startedAt - prev.totalPausedMs - (prev.pausedAt ? now - prev.pausedAt : 0);
      const elapsedSeconds = Math.max(0, Math.floor(elapsedMs / 1000));
      let withinGrace = prev.withinGrace;
      let paidActive = prev.paidActive;
      let includedActive = prev.includedActive;
      if (settings.plan === "SUB") {
        withinGrace = false;
        includedActive = true;
        paidActive = false;
      } else {
        withinGrace = todayUsage.graceRemainingSeconds - elapsedSeconds > 0;
        paidActive = !withinGrace;
        includedActive = false;
      }
      return { ...prev, elapsedSeconds, withinGrace, paidActive, includedActive };
    });
  }, [settings.plan, todayUsage.graceRemainingSeconds]);

  useEffect(() => {
    if (!session.running) return;
    const id = setInterval(() => tickSession(), 1000);
    return () => clearInterval(id);
  }, [session.running, tickSession]);

  const commitSession = useCallback(() => {
    setSession((prev) => ({ ...prev, running: false }));
    setTodayUsage((prevUsage) => {
      const used = session.elapsedSeconds;
      const free = settings.plan === "SUB" ? 0 : Math.min(prevUsage.graceRemainingSeconds, used);
      const paidSeconds = settings.plan === "SUB" ? Math.max(0, used - free) : Math.max(0, used - free);
      const paidMinutesRounded = settings.plan === "SUB" ? 0 : Math.ceil(paidSeconds / 60);
      const costCents = settings.plan === "SUB" ? 0 : paidMinutesRounded * settings.rateCents;
      const graceRemainingSeconds = Math.max(0, prevUsage.graceRemainingSeconds - free);
      return {
        ...prevUsage,
        freeSeconds: prevUsage.freeSeconds + free,
        paidSeconds: prevUsage.paidSeconds + paidSeconds,
        costCents: prevUsage.costCents + costCents,
        graceRemainingSeconds,
      };
    });
  }, [session.elapsedSeconds, settings.plan, settings.rateCents]);

  useEffect(() => {
    const now = Date.now();
    if (now >= todayUsage.resetsAtEpochMs) {
      setTodayUsage({
        date: new Date().toDateString(),
        freeSeconds: 0,
        paidSeconds: 0,
        costCents: 0,
        graceRemainingSeconds: settings.graceSeconds,
        resetsAtEpochMs: localMidnightEpochMs(),
      });
    }
  }, [todayUsage.resetsAtEpochMs, settings.graceSeconds]);

  const historyQuery = useQuery<HistoryDay[]>({
    queryKey: ["usage-history"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 300));
      const days: HistoryDay[] = Array.from({ length: 14 }).map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return {
          date: d.toISOString().slice(0, 10),
          freeSeconds: Math.floor(Math.random() * 120),
          paidSeconds: Math.floor(Math.random() * 900),
          costCents: Math.floor(Math.random() * 100),
        };
      });
      return days.reverse();
    },
  });

  const chargesQuery = useQuery<ChargeItem[]>({
    queryKey: ["charges"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 300));
      return Array.from({ length: 8 }).map((_, i) => ({
        id: `c_${i}`,
        date: new Date(Date.now() - i * 86400000).toISOString().slice(0, 10),
        minutes: Math.ceil(Math.random() * 25),
        amountCents: Math.ceil(Math.random() * 400),
      }));
    },
  });

  const domainsQuery = useQuery<DomainUsage[]>({
    queryKey: ["domains-usage"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 200));
      return [
        { domain: "example-adult.com", sessions: 3, totalSeconds: 1200 },
        { domain: "nsfw-site.net", sessions: 2, totalSeconds: 600 },
      ];
    },
  });

  const setOnboarded = useCallback(() => {
    setSettings((prev) => ({ ...prev, onboardedAt: Date.now(), graceSeconds: prev.graceSeconds || 180 }));
    setTodayUsage((prev) => ({
      ...prev,
      graceRemainingSeconds: settings.graceSeconds,
    }));
  }, [settings.graceSeconds]);

  const setQuestionAnswer = useCallback((ans: QuestionnaireAnswer) => {
    setAnswers((prev) => {
      const idx = prev.findIndex((a) => a.key === ans.key);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = ans;
        return copy;
      }
      return [...prev, ans];
    });
  }, []);

  const resetAll = useCallback(async () => {
    await Promise.all([
      AsyncStorage.removeItem(SETTINGS_KEY),
      AsyncStorage.removeItem(BLOCKLIST_KEY),
      AsyncStorage.removeItem(USAGE_TODAY_KEY),
      AsyncStorage.removeItem(QUESTIONNAIRE_KEY),
    ]).catch(() => {});
    setSettings(defaultSettings());
    setBlocklist([]);
    setTodayUsage({
      date: new Date().toDateString(),
      freeSeconds: 0,
      paidSeconds: 0,
      costCents: 0,
      graceRemainingSeconds: 180,
      resetsAtEpochMs: localMidnightEpochMs(),
    });
    setAnswers([]);
  }, []);

  return {
    booted,
    settings,
    featureFlags,
    isOnboarded,
    updateSettings,
    blocklist,
    addCustomDomain,
    toggleBlocklistItem,
    removeBlocklistItem,
    todayUsage,
    session,
    startSession,
    stopSession,
    commitSession,
    setOnboarded,
    historyQuery,
    chargesQuery,
    domainsQuery,
    answers,
    setQuestionAnswer,
    queryClient,
    resetAll,
  };
});

export type AppContextType = ReturnType<typeof useApp>;