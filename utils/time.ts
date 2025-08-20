export function formatSecondsMMSS(totalSeconds: number): string {
      const s = Math.max(0, Math.floor(totalSeconds));
      const mm = Math.floor(s / 60)
        .toString()
        .padStart(2, "0");
      const ss = Math.floor(s % 60)
        .toString()
        .padStart(2, "0");
      return `${mm}:${ss}`;
    }
    
    export function ceilDiv(a: number, b: number): number {
      return Math.ceil(a / b);
    }
    
    export function localMidnightEpochMs(now: number = Date.now()): number {
      const d = new Date(now);
      d.setHours(24, 0, 0, 0);
      return d.getTime();
    }