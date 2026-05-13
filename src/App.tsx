import { useEffect, useMemo, useState } from 'react';
import { Timer, clampDuration, createTimer, formatTime, loadTimers, saveTimers } from './timer';
import { TimerList } from './components/TimerList';

const MAX_TIMERS = 10;
const MAX_NAME_LENGTH = 15;
const MAX_DURATION_SECONDS = 59 * 60 + 59;
const MIN_DURATION_SECONDS = 1;

const normalizeName = (name: string) => name.trim().slice(0, MAX_NAME_LENGTH);

const keepDurationInRange = (seconds: number) =>
  Math.min(MAX_DURATION_SECONDS, Math.max(MIN_DURATION_SECONDS, seconds));

const App = () => {
  const [timers, setTimers] = useState<Timer[]>(loadTimers);
  const [selectedTimerId, setSelectedTimerId] = useState<string | null>(null);

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

  const updateMinutes = (timerId: string, minutes: string) => {
    const parsedMinutes = Number.parseInt(minutes, 10);

    patchTimer(timerId, (timer) => {
      const nextDurationSeconds = keepDurationInRange(clampDuration(
        Number.isFinite(parsedMinutes) ? parsedMinutes : 0,
        timer.durationSeconds % 60,
      ));

      return {
        ...timer,
        durationSeconds: nextDurationSeconds,
        remainingSeconds: nextDurationSeconds,
        isRunning: false,
      };
    });
  };

  const updateSeconds = (timerId: string, seconds: string) => {
    const parsedSeconds = Number.parseInt(seconds, 10);

    patchTimer(timerId, (timer) => {
      const nextDurationSeconds = keepDurationInRange(clampDuration(
        Math.floor(timer.durationSeconds / 60),
        Number.isFinite(parsedSeconds) ? parsedSeconds : 0,
      ));

      return {
        ...timer,
        durationSeconds: nextDurationSeconds,
        remainingSeconds: nextDurationSeconds,
        isRunning: false,
      };
    });
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
      }

      return nextTimers;
    });
  };

  const selectTimer = (timerId: string) => {
    setSelectedTimerId(timerId);
  };

  return (
    <main className="app-shell">
      <section className="hero">
        <p className="eyebrow">Timplo</p>
        <h1>Simple tap-to-control countdown timers for web and mobile.</h1>
        <p className="hero-copy">
          Build your timer library first: add timers, edit names and durations,
          remove timers you do not need, and select the one you want to run next.
        </p>
      </section>

      <section className="layout layout-library">
        <TimerList
          activeTimerId={selectedTimerId}
          canAddTimer={timers.length < MAX_TIMERS}
          onAddTimer={addTimer}
          onDeleteTimer={removeTimer}
          onEditMinutes={updateMinutes}
          onEditName={updateName}
          onEditSeconds={updateSeconds}
          onSelectTimer={selectTimer}
          timers={timers}
        />
      </section>

      <footer className="footer-note">
        {selectedTimer ? (
          <span>
            Selected for next step: <strong>{selectedTimer.name}</strong> at {formatTime(selectedTimer.durationSeconds)}
          </span>
        ) : (
          <span>No timer selected yet.</span>
        )}
      </footer>
    </main>
  );
};

export default App;
