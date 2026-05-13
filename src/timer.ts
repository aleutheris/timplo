export type Timer = {
  id: string;
  name: string;
  durationSeconds: number;
  remainingSeconds: number;
  isRunning: boolean;
  hasStarted: boolean;
};

export type TimerDraft = {
  name: string;
  minutes: number;
  seconds: number;
};

export const storageKey = 'timplo.timer-state.v1';
const MAX_TIMERS = 10;
const MAX_NAME_LENGTH = 15;
const MIN_DURATION_SECONDS = 1;
const MAX_DURATION_SECONDS = 59 * 60 + 59;

export const formatTime = (totalSeconds: number): string => {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;

  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
};

export const clampDuration = (minutes: number, seconds: number): number => {
  const safeMinutes = Number.isFinite(minutes) ? Math.max(0, Math.floor(minutes)) : 0;
  const safeSeconds = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;

  return safeMinutes * 60 + safeSeconds;
};

const createId = (): string => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `timer-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export const createTimer = (draft: TimerDraft): Timer => {
  const durationSeconds = clampDuration(draft.minutes, draft.seconds);

  return {
    id: createId(),
    name: draft.name.trim() || 'Timer',
    durationSeconds,
    remainingSeconds: durationSeconds,
    isRunning: false,
    hasStarted: false,
  };
};

export const createStarterTimers = (): Timer[] => [
  createTimer({ name: 'Focus', minutes: 25, seconds: 0 }),
  createTimer({ name: 'Break', minutes: 5, seconds: 0 }),
];

const isTimerLike = (value: unknown): value is Timer => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.name === 'string' &&
    typeof candidate.durationSeconds === 'number' &&
    typeof candidate.remainingSeconds === 'number' &&
    typeof candidate.isRunning === 'boolean'
  );
};

export const loadTimers = (): Timer[] => {
  if (typeof window === 'undefined') {
    return createStarterTimers();
  }

  const storedValue = window.localStorage.getItem(storageKey);

  if (!storedValue) {
    return createStarterTimers();
  }

  try {
    const parsed = JSON.parse(storedValue) as unknown;

    if (!Array.isArray(parsed)) {
      return createStarterTimers();
    }

    const timers = parsed
      .filter(isTimerLike)
      .slice(0, MAX_TIMERS)
      .map((timer) => {
        const safeDurationSeconds = Math.min(
          MAX_DURATION_SECONDS,
          Math.max(MIN_DURATION_SECONDS, Math.floor(timer.durationSeconds)),
        );
        const safeRemainingSeconds = Math.min(
          safeDurationSeconds,
          Math.max(MIN_DURATION_SECONDS, Math.floor(timer.remainingSeconds)),
        );
        const safeHasStarted = typeof (timer as { hasStarted?: unknown }).hasStarted === 'boolean'
          ? Boolean((timer as { hasStarted?: boolean }).hasStarted)
          : false;

        return {
          ...timer,
          name: timer.name.trim().slice(0, MAX_NAME_LENGTH) || 'Timer',
          durationSeconds: safeDurationSeconds,
          remainingSeconds: safeRemainingSeconds,
          isRunning: false,
          hasStarted: safeHasStarted,
        };
      });

    return timers.length > 0 ? timers : createStarterTimers();
  } catch {
    return createStarterTimers();
  }
};

export const saveTimers = (timers: Timer[]): void => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(storageKey, JSON.stringify(timers));
};
