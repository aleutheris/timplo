export type Timer = {
  id: string;
  name: string;
  durationSeconds: number;
  remainingSeconds: number;
  isRunning: boolean;
};

export type TimerDraft = {
  name: string;
  minutes: number;
  seconds: number;
};

export const storageKey = 'timplo.timer-state.v1';

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

    const timers = parsed.filter(isTimerLike).map((timer) => ({
      ...timer,
      name: timer.name.trim() || 'Timer',
      durationSeconds: Math.max(0, Math.floor(timer.durationSeconds)),
      remainingSeconds: Math.min(
        Math.max(0, Math.floor(timer.remainingSeconds)),
        Math.max(0, Math.floor(timer.durationSeconds)),
      ),
    }));

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
