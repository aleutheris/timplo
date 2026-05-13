import { Timer, formatTime } from '../timer';

type TimerStageProps = {
  activeTimer: (Timer & { state: 'initial' | 'running' | 'stopped' }) | null;
  onBack: () => void;
  onResetTimer: () => void;
  onToggleTimer: () => void;
};

export const TimerStage = ({ activeTimer, onBack, onResetTimer, onToggleTimer }: TimerStageProps) => {
  const stageTone = activeTimer
    ? activeTimer.state === 'running'
      ? 'stage-running'
      : activeTimer.state === 'stopped'
        ? 'stage-stopped'
        : 'stage-initial'
    : 'stage-idle';

  const helperText = activeTimer
    ? activeTimer.state === 'running'
      ? 'Tap to stop'
      : activeTimer.state === 'stopped'
        ? 'Tap to resume'
        : 'Tap to start'
    : 'Select a timer from the library';

  return (
    <section className={`panel stage-panel ${stageTone}`}>
      <div className="stage-toolbar">
        <button className="secondary-button" type="button" onClick={onBack}>
          Back to timers
        </button>
      </div>

      {activeTimer ? (
        <button className="stage-touch-target" type="button" onClick={onToggleTimer}>
          <div className="stage-square">
            <p className="panel-label">Selected timer</p>
            <h2>{activeTimer.name}</h2>
            <strong className="stage-time">{formatTime(activeTimer.remainingSeconds)}</strong>
            <p className="stage-status">{helperText}</p>
          </div>
        </button>
      ) : (
        <div className="stage-empty">
          <p className="panel-label">Active timer</p>
          <h2>No timer selected</h2>
          <p>Pick a timer from the list to move it into the countdown view.</p>
        </div>
      )}

      {activeTimer ? (
        <div className="stage-footer">
          <button className="secondary-button" type="button" onClick={onResetTimer}>
            Reset
          </button>
        </div>
      ) : null}
    </section>
  );
};
