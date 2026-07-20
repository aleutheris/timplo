import { useEffect, useRef } from 'react';
import { stepDurationField } from '../timer';

const REPEAT_DELAY_MS = 400;
const REPEAT_INTERVAL_MS = 125;
const FIELD_OPTIONS = Array.from({ length: 60 }, (_, value) => String(value));

type DurationFieldProps = {
  ariaLabel: string;
  describedBy?: string;
  isInvalid: boolean;
  label: string;
  onChange: (raw: string) => void;
  usesCoarsePointer: boolean;
  value: string;
};

/**
 * One duration field (minutes or seconds), rendered to suit the pointer:
 * a text input with stepper buttons for a mouse, a native select — which the
 * platform presents as a roller — for touch. See ADR-260003.
 */
export const DurationField = ({
  ariaLabel,
  describedBy,
  isInvalid,
  label,
  onChange,
  usesCoarsePointer,
  value,
}: DurationFieldProps) => {
  const repeatDelayId = useRef<number>();
  const repeatIntervalId = useRef<number>();
  const pointerDriven = useRef(false);
  // Auto-repeat must read the newest value, not the one captured on press.
  const latestValue = useRef(value);
  latestValue.current = value;

  const stopRepeating = () => {
    window.clearTimeout(repeatDelayId.current);
    window.clearInterval(repeatIntervalId.current);
  };

  useEffect(() => stopRepeating, []);

  const step = (delta: number) => onChange(stepDurationField(latestValue.current, delta));

  const startRepeating = (delta: number) => {
    pointerDriven.current = true;
    step(delta);
    stopRepeating();
    repeatDelayId.current = window.setTimeout(() => {
      repeatIntervalId.current = window.setInterval(() => step(delta), REPEAT_INTERVAL_MS);
    }, REPEAT_DELAY_MS);
  };

  // A pointer press already stepped; swallow the click it produces. Keyboard
  // activation fires click without a press, so it still steps here.
  const handleClick = (delta: number) => {
    if (pointerDriven.current) {
      pointerDriven.current = false;
      return;
    }

    step(delta);
  };

  const handleKeyDown = (key: string) => {
    if (key === 'ArrowUp') {
      step(1);
    } else if (key === 'ArrowDown') {
      step(-1);
    }
  };

  if (usesCoarsePointer) {
    const selectValue = FIELD_OPTIONS.includes(value.trim()) ? value.trim() : '0';

    return (
      <label className="duration-label">
        <span>{label}</span>
        <select
          aria-describedby={describedBy}
          aria-invalid={isInvalid}
          aria-label={ariaLabel}
          className={`duration-select${isInvalid ? ' is-invalid' : ''}`}
          value={selectValue}
          onChange={(event) => onChange(event.target.value)}
        >
          {FIELD_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option.padStart(2, '0')}
            </option>
          ))}
        </select>
      </label>
    );
  }

  return (
    <label className="duration-label">
      <span>{label}</span>
      <div className="duration-control">
        <input
          aria-describedby={describedBy}
          aria-invalid={isInvalid}
          aria-label={ariaLabel}
          className={isInvalid ? 'is-invalid' : undefined}
          inputMode="numeric"
          maxLength={2}
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
              event.preventDefault();
              handleKeyDown(event.key);
            }
          }}
        />

        {/* Not tab stops, mirroring native number spinners; the input's arrow
            keys give keyboard users the same control. */}
        <span className="duration-steppers">
          <button
            aria-label={`Increase ${ariaLabel}`}
            className="stepper-button"
            tabIndex={-1}
            type="button"
            onClick={() => handleClick(1)}
            onPointerCancel={stopRepeating}
            onPointerDown={() => startRepeating(1)}
            onPointerLeave={stopRepeating}
            onPointerUp={stopRepeating}
          >
            <span aria-hidden="true">▲</span>
          </button>
          <button
            aria-label={`Decrease ${ariaLabel}`}
            className="stepper-button"
            tabIndex={-1}
            type="button"
            onClick={() => handleClick(-1)}
            onPointerCancel={stopRepeating}
            onPointerDown={() => startRepeating(-1)}
            onPointerLeave={stopRepeating}
            onPointerUp={stopRepeating}
          >
            <span aria-hidden="true">▼</span>
          </button>
        </span>
      </div>
    </label>
  );
};
