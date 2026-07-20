import { useState } from 'react';
import { Timer, formatTime, parseDuration, parseDurationField } from '../timer';

type TimerCardProps = {
  isActive: boolean;
  onDeleteTimer: (timerId: string) => void;
  onEditDuration: (timerId: string, durationSeconds: number) => void;
  onEditName: (timerId: string, name: string) => void;
  onSelectTimer: (timerId: string) => void;
  timer: Timer;
};

export const TimerCard = ({
  isActive,
  onDeleteTimer,
  onEditDuration,
  onEditName,
  onSelectTimer,
  timer,
}: TimerCardProps) => {
  // Drafts hold exactly what the user typed, including an empty field. A null
  // draft means "not being edited" and falls back to the committed duration.
  const [minutesDraft, setMinutesDraft] = useState<string | null>(null);
  const [secondsDraft, setSecondsDraft] = useState<string | null>(null);

  const minutes = minutesDraft ?? String(Math.floor(timer.durationSeconds / 60));
  const seconds = secondsDraft ?? String(timer.durationSeconds % 60);

  const isValid = parseDuration(minutes, seconds) !== null;
  const minutesInvalid = parseDurationField(minutes) === null;
  const secondsInvalid = parseDurationField(seconds) === null;
  // Both fields parse but the total is 00:00 — flag the pair, not one field.
  const totalTooShort = isValid ? false : !minutesInvalid && !secondsInvalid;

  const errorId = `${timer.id}-duration-error`;
  const errorText = isValid
    ? null
    : totalTooShort
      ? 'Duration must be at least 00:01.'
      : 'Minutes and seconds must be whole numbers from 0 to 59.';

  // Only a valid pair is committed; an invalid one leaves the stored duration
  // untouched so the timer always keeps its last good value.
  const commitDuration = (nextMinutes: string, nextSeconds: string) => {
    const nextDuration = parseDuration(nextMinutes, nextSeconds);

    if (nextDuration !== null) {
      onEditDuration(timer.id, nextDuration);
    }
  };

  const editMinutes = (raw: string) => {
    setMinutesDraft(raw);
    commitDuration(raw, seconds);
  };

  const editSeconds = (raw: string) => {
    setSecondsDraft(raw);
    commitDuration(minutes, raw);
  };

  const selectTimer = () => {
    if (isValid) {
      onSelectTimer(timer.id);
    }
  };

  return (
    <article
      className={`timer-card${isActive ? ' timer-card-active' : ''}${isValid ? '' : ' timer-card-invalid'}`}
    >
      <button className="timer-card-head" type="button" disabled={!isValid} onClick={selectTimer}>
        <div>
          <p className="timer-card-name">{timer.name}</p>
          <p className="timer-card-time">{formatTime(timer.remainingSeconds)}</p>
        </div>

        <span className={`status-pill${timer.isRunning ? ' status-running' : ''}`}>
          {timer.isRunning ? 'Running' : timer.hasStarted ? 'Stopped' : 'Ready'}
        </span>
      </button>

      <label>
        <span>Name</span>
        <input
          aria-label={`Timer name for ${timer.name}`}
          maxLength={15}
          type="text"
          value={timer.name}
          onChange={(event) => onEditName(timer.id, event.target.value)}
        />
      </label>

      <div className="time-input-row">
        <label>
          <span>Minutes</span>
          <input
            aria-describedby={errorText ? errorId : undefined}
            aria-invalid={minutesInvalid || totalTooShort}
            aria-label={`Minutes for ${timer.name}`}
            className={minutesInvalid || totalTooShort ? 'is-invalid' : undefined}
            inputMode="numeric"
            maxLength={2}
            type="text"
            value={minutes}
            onChange={(event) => editMinutes(event.target.value)}
          />
        </label>

        <label>
          <span>Seconds</span>
          <input
            aria-describedby={errorText ? errorId : undefined}
            aria-invalid={secondsInvalid || totalTooShort}
            aria-label={`Seconds for ${timer.name}`}
            className={secondsInvalid || totalTooShort ? 'is-invalid' : undefined}
            inputMode="numeric"
            maxLength={2}
            type="text"
            value={seconds}
            onChange={(event) => editSeconds(event.target.value)}
          />
        </label>
      </div>

      {errorText ? (
        <p className="field-error" id={errorId} role="alert">
          {errorText}
        </p>
      ) : null}

      <div className="timer-actions">
        <button className="primary-button" type="button" disabled={!isValid} onClick={selectTimer}>
          Select
        </button>
        <button className="danger-button" type="button" onClick={() => onDeleteTimer(timer.id)}>
          Remove
        </button>
      </div>
    </article>
  );
};
