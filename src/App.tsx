import { useEffect, useMemo, useState } from 'react';
import { Timer, createTimer, formatTime, loadTimers, saveTimers } from './timer';
import { TimerList } from './components/TimerList';
import { TimerStage } from './components/TimerStage';

const MAX_TIMERS = 10;
const MAX_NAME_LENGTH = 15;
const MAX_DURATION_SECONDS = 59 * 60 + 59;
const MIN_DURATION_SECONDS = 1;

const normalizeName = (name: string) => name.trim().slice(0, MAX_NAME_LENGTH);

const keepDurationInRange = (seconds: number) =>
  Math.min(MAX_DURATION_SECONDS, Math.max(MIN_DURATION_SECONDS, seconds));

const tickTimers = (timers: Timer[]): Timer[] =>
  timers.map((timer) => {
    if (!timer.isRunning) {
      return timer;
    }

    const nextRemainingSeconds = timer.remainingSeconds - 1;

    if (nextRemainingSeconds <= 0) {
      return {
        ...timer,
        remainingSeconds: timer.durationSeconds,
        isRunning: false,
        hasStarted: false,
      };
    }

    return {
      ...timer,
      remainingSeconds: nextRemainingSeconds,
      isRunning: true,
      hasStarted: true,
    };
  });

type ViewMode = 'library' | 'selected';
const selectedTimerStorageKey = 'timplo.selected-timer-id.v1';

const loadSelectedTimerId = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const value = window.localStorage.getItem(selectedTimerStorageKey);
  return value && value.trim().length > 0 ? value : null;
};

const App = () => {
  const [timers, setTimers] = useState<Timer[]>(loadTimers);
  const [selectedTimerId, setSelectedTimerId] = useState<string | null>(loadSelectedTimerId);
  const [viewMode, setViewMode] = useState<ViewMode>('library');

  useEffect(() => {
    setTimers((currentTimers) =>
      currentTimers.map((timer) => (timer.isRunning ? { ...timer, isRunning: false } : timer)),
    );
  }, []);

  useEffect(() => {
    if (timers.length === 0) {
      setSelectedTimerId(null);
      return;
    }

    if (!selectedTimerId || !timers.some((timer) => timer.id === selectedTimerId)) {
      setSelectedTimerId(timers[0]?.id ?? null);
    }
  }, [selectedTimerId, timers]);

  useEffect(() => {
    saveTimers(timers);
  }, [timers]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (selectedTimerId) {
      window.localStorage.setItem(selectedTimerStorageKey, selectedTimerId);
    } else {
      window.localStorage.removeItem(selectedTimerStorageKey);
    }
  }, [selectedTimerId]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTimers((currentTimers) => tickTimers(currentTimers));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const selectedTimer = useMemo(
    () => timers.find((timer) => timer.id === selectedTimerId) ?? timers[0] ?? null,
    [selectedTimerId, timers],
  );

  const patchTimer = (timerId: string, updater: (timer: Timer) => Timer) => {
    setTimers((currentTimers) =>
      currentTimers.map((timer) => (timer.id === timerId ? updater(timer) : timer)),
    );
  };

  const updateName = (timerId: string, name: string) => {
    patchTimer(timerId, (timer) => ({
      ...timer,
      name: normalizeName(name) || 'Timer',
    }));
  };

  // The card only commits a duration it has already validated; the clamp here
  // is a guardrail for the stored invariant, not input correction.
  const updateDuration = (timerId: string, durationSeconds: number) => {
    const nextDurationSeconds = keepDurationInRange(durationSeconds);

    patchTimer(timerId, (timer) => ({
      ...timer,
      durationSeconds: nextDurationSeconds,
      remainingSeconds: nextDurationSeconds,
      isRunning: false,
    }));
  };

  const addTimer = () => {
    if (timers.length >= MAX_TIMERS) {
      return;
    }

    const timer = createTimer({ name: `Timer ${timers.length + 1}`, minutes: 1, seconds: 0 });

    setTimers((currentTimers) => [...currentTimers, timer]);
    setSelectedTimerId(timer.id);
  };

  const removeTimer = (timerId: string) => {
    setTimers((currentTimers) => {
      const nextTimers = currentTimers.filter((timer) => timer.id !== timerId);

      if (selectedTimerId === timerId) {
        setSelectedTimerId(nextTimers[0]?.id ?? null);
        if (nextTimers.length === 0) {
          setViewMode('library');
        }
      }

      return nextTimers;
    });
  };

  const selectTimer = (timerId: string) => {
    setTimers((currentTimers) =>
      currentTimers.map((timer) =>
        timer.id === timerId
          ? timer
          : {
              ...timer,
              isRunning: false,
            },
      ),
    );
    setSelectedTimerId(timerId);
    setViewMode('selected');
  };

  const backToLibrary = () => {
    setViewMode('library');
  };

  const toggleSelectedTimer = () => {
    if (!selectedTimerId) {
      return;
    }

    setTimers((currentTimers) =>
      currentTimers.map((timer) => {
        if (timer.id !== selectedTimerId) {
          return {
            ...timer,
            isRunning: false,
          };
        }

        if (timer.isRunning) {
          return {
            ...timer,
            isRunning: false,
            hasStarted: true,
          };
        }

        return {
          ...timer,
          isRunning: true,
          hasStarted: true,
        };
      }),
    );
  };

  const resetSelectedTimer = () => {
    if (!selectedTimerId) {
      return;
    }

    setTimers((currentTimers) =>
      currentTimers.map((timer) =>
        timer.id === selectedTimerId
          ? {
              ...timer,
              remainingSeconds: timer.durationSeconds,
              isRunning: false,
              hasStarted: false,
            }
          : {
              ...timer,
              isRunning: false,
            },
      ),
    );
  };

  const selectedTimerDisplay = selectedTimer
    ? {
        ...selectedTimer,
        state: (selectedTimer.isRunning
          ? 'running'
          : selectedTimer.hasStarted
            ? 'stopped'
            : 'initial') as 'initial' | 'running' | 'stopped',
      }
    : null;

  return (
    <main className="app-shell">
      {viewMode === 'library' ? (
        <section className="layout layout-library">
          <TimerList
            activeTimerId={selectedTimerId}
            canAddTimer={timers.length < MAX_TIMERS}
            onAddTimer={addTimer}
            onDeleteTimer={removeTimer}
            onEditDuration={updateDuration}
            onEditName={updateName}
            onSelectTimer={selectTimer}
            timers={timers}
          />
        </section>
      ) : (
        <section className="layout layout-selected">
          <TimerStage
            activeTimer={selectedTimerDisplay}
            onBack={backToLibrary}
            onResetTimer={resetSelectedTimer}
            onToggleTimer={toggleSelectedTimer}
          />
        </section>
      )}

      <footer className="footer-note">
        {selectedTimer ? (
          <span>
            Selected timer: <strong>{selectedTimer.name}</strong> at {formatTime(selectedTimer.remainingSeconds)}
          </span>
        ) : (
          <span>No timer selected yet.</span>
        )}
      </footer>
    </main>
  );
};

export default App;
