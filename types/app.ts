export type PlanType = "PAYG";
    export type ModeType = "METER_ONLY" | "SOFT_GATE" | "HARD_BLOCK";
    
    export interface BlocklistItem {
      id: string;
      domainPattern: string;
      enabled: boolean;
      isRecommended: boolean;
      createdAt: number;
    }
    
    export interface PermissionState {
      networkFilter: boolean;
      usageAccess: boolean;
      notifications: boolean;
    }
    
    export interface FeatureFlags {
      spinsPerDay: number;
      historyRetentionDays: number | null;
      csvExportsPerMonth: number | null;
      chestIntervalDays: number;
      premiumThemes: boolean;
      priorityBlocklist: boolean;
    }
    
    export interface SettingsState {
      onboardedAt?: number;
      protectionEnabled: boolean;
      mode: ModeType;
      plan: PlanType;
      graceSeconds: number;
      rateCents: number;
      resetTimeLocal: string;
      notifications: {
        graceWarning: boolean;
        billingStart: boolean;
        dailySummary: boolean;
      };
      spendingCaps: {
        enabled: boolean;
        dailyCapCents?: number;
        weeklyCapCents?: number;
        hardCapBehavior?: "BLOCK" | "WARN";
      };
      gamification: {
        enabled: boolean;
        leaderboardOptIn: boolean;
        rewardIntensity: "LOW" | "MEDIUM" | "HIGH";
      };
      permissions: PermissionState;
    }
    
    export interface TodayUsage {
      date: string;
      freeSeconds: number;
      paidSeconds: number;
      costCents: number;
      graceRemainingSeconds: number;
      resetsAtEpochMs: number;
    }
    
    export interface SessionState {
      id?: string;
      startedAt?: number;
      pausedAt?: number | null;
      totalPausedMs: number;
      running: boolean;
      withinGrace: boolean;
      paidActive: boolean;
      includedActive: boolean;
      elapsedSeconds: number;
    }
    
    export interface QuestionnaireAnswer {
      key: string;
      value: string | string[] | number | null;
    }
    
    export interface RewardsState {
      xp: number;
      level: number;
      streakDays: number;
      lastSpinAt?: number;
      spinsAvailable: number;
      chests: number;
      shields: number;
      badges: string[];
    }
    
    export interface HistoryDay {
      date: string;
      freeSeconds: number;
      paidSeconds: number;
      costCents: number;
    }
    
    export interface ChargeItem {
      id: string;
      date: string;
      minutes: number;
      amountCents: number;
    }
    
    export interface DomainUsage {
      domain: string;
      sessions: number;
      totalSeconds: number;
    }