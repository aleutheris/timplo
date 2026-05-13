import { useEffect, useMemo, useState } from 'react';
import { Timer, clampDuration, createStarterTimers, createTimer, formatTime, loadTimers, saveTimers } from './timer';
import { TimerList } from './components/TimerList';
import { TimerStage } from './components/TimerStage';

const tickTimers = (timers: Timer[]): Timer[] =>
  timers.map((timer) => {
    if (!timer.isRunning || timer.remainingSeconds <= 0) {
      return timer;
    }

    const nextRemainingSeconds = timer.remainingSeconds - 1;

    return {
      ...timer,
      remainingSeconds: nextRemainingSeconds,
      isRunning: nextRemainingSeconds > 0,
    };
  });

const App = () => {
  const [timers, setTimers] = useState<Timer[]>(loadTimers);
  const [activeTimerId, setActiveTimerId] = useState<string | null>(null);

  useEffect(() => {
    if (timers.length === 0) {
      const starterTimers = createStarterTimers();
      setTimers(starterTimers);
      setActiveTimerId(starterTimers[0]?.id ?? null);
      return;
    }

    if (!activeTimerId || !timers.some((timer) => timer.id === activeTimerId)) {
      setActiveTimerId(timers[0]?.id ?? null);
    }
  }, [activeTimerId, timers]);

  useEffect(() => {
    saveTimers(timers);
  }, [timers]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTimers((currentTimers) => tickTimers(currentTimers));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const activeTimer = useMemo(
    () => timers.find((timer) => timer.id === activeTimerId) ?? timers[0] ?? null,
    [activeTimerId, timers],
  );

  const patchTimer = (timerId: string, updater: (timer: Timer) => Timer) => {
    setTimers((currentTimers) =>
      currentTimers.map((timer) => (timer.id === timerId ? updater(timer) : timer)),
    );
  };

  const updateName = (timerId: string, name: string) => {
    patchTimer(timerId, (timer) => ({
      ...timer,
      name,
    }));
  };

  const updateMinutes = (timerId: string, minutes: string) => {
    const parsedMinutes = Number.parseInt(minutes, 10);

    patchTimer(timerId, (timer) => {
      const nextDurationSeconds = clampDuration(
        Number.isFinite(parsedMinutes) ? parsedMinutes : 0,
        timer.durationSeconds % 60,
      );

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
      const nextDurationSeconds = clampDuration(
        Math.floor(timer.durationSeconds / 60),
        Number.isFinite(parsedSeconds) ? parsedSeconds : 0,
      );

      return {
        ...timer,
        durationSeconds: nextDurationSeconds,
        remainingSeconds: nextDurationSeconds,
        isRunning: false,
      };
    });
  };

  const addTimer = () => {
    const timer = createTimer({ name: `Timer ${timers.length + 1}`, minutes: 1, seconds: 0 });

    setTimers((currentTimers) => [...currentTimers, timer]);
    setActiveTimerId(timer.id);
  };

  const removeTimer = (timerId: string) => {
    setTimers((currentTimers) => {
      const nextTimers = currentTimers.filter((timer) => timer.id !== timerId);

      if (nextTimers.length === 0) {
        const starterTimers = createStarterTimers();
        setActiveTimerId(starterTimers[0]?.id ?? null);
        return starterTimers;
      }

      if (activeTimerId === timerId) {
        setActiveTimerId(nextTimers[0]?.id ?? null);
      }

      return nextTimers;
    });
  };

  const selectTimer = (timerId: string) => {
    setActiveTimerId(timerId);
    patchTimer(timerId, (timer) => ({
      ...timer,
      remainingSeconds: timer.remainingSeconds > 0 ? timer.remainingSeconds : timer.durationSeconds,
      isRunning: true,
    }));
  };

  const toggleActiveTimer = () => {
    if (!activeTimer) {
      return;
    }

    patchTimer(activeTimer.id, (timer) => {
      const resetRemainingSeconds = timer.remainingSeconds > 0 ? timer.remainingSeconds : timer.durationSeconds;

      return {
        ...timer,
        remainingSeconds: resetRemainingSeconds,
        isRunning: !timer.isRunning && resetRemainingSeconds > 0 ? true : !timer.isRunning,
      };
    });
  };

  const resetTimer = (timerId: string) => {
    patchTimer(timerId, (timer) => ({
      ...timer,
      remainingSeconds: timer.durationSeconds,
      isRunning: false,
    }));
  };

  const normalizedActiveTimer = activeTimer
    ? {
        ...activeTimer,
        progress:
          activeTimer.durationSeconds === 0
            ? 1
            : 1 - activeTimer.remainingSeconds / activeTimer.durationSeconds,
      }
    : null;

  return (
    <main className="app-shell">
      <section className="hero">
        <p className="eyebrow">Timplo</p>
        <h1>Simple tap-to-control countdown timers for web and mobile.</h1>
        <p className="hero-copy">
          Create multiple named timers, edit their duration, pick the one you want,
          and tap the active view to pause or resume.
        </p>
      </section>

      <section className="layout">
        <TimerList
          activeTimerId={activeTimerId}
          onAddTimer={addTimer}
          onDeleteTimer={removeTimer}
          onEditMinutes={updateMinutes}
          onEditName={updateName}
          onEditSeconds={updateSeconds}
          onResetTimer={resetTimer}
          onSelectTimer={selectTimer}
          onToggleTimer={toggleActiveTimer}
          timers={timers}
        />

        <TimerStage
          activeTimer={normalizedActiveTimer}
          onResetTimer={resetTimer}
          onToggleTimer={toggleActiveTimer}
        />
      </section>

      <footer className="footer-note">
        {activeTimer ? (
          <span>
            Active timer: <strong>{activeTimer.name}</strong> at {formatTime(activeTimer.remainingSeconds)}
          </span>
        ) : (
          <span>No active timer yet.</span>
        )}
      </footer>
    </main>
  );
};

export default App;
