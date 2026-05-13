import { Timer, formatTime } from '../timer';

type TimerStageProps = {
  activeTimer: (Timer & { progress: number }) | null;
  onResetTimer: (timerId: string) => void;
  onToggleTimer: () => void;
};

export const TimerStage = ({ activeTimer, onResetTimer, onToggleTimer }: TimerStageProps) => {
  const stageTone = activeTimer
    ? activeTimer.remainingSeconds === 0
      ? 'stage-finished'
      : activeTimer.isRunning
        ? 'stage-running'
        : 'stage-paused'
    : 'stage-idle';

  return (
    <section className={`panel stage-panel ${stageTone}`}>
      {activeTimer ? (
        <button className="stage-touch-target" type="button" onClick={onToggleTimer}>
          <div className="stage-ring" style={{ ['--progress' as string]: activeTimer.progress }}>
            <div className="stage-core">
              <p className="panel-label">Active timer</p>
              <h2>{activeTimer.name}</h2>
              <strong className="stage-time">{formatTime(activeTimer.remainingSeconds)}</strong>
              <p className="stage-status">
                {activeTimer.remainingSeconds === 0
                  ? 'Complete'
                  : activeTimer.isRunning
                    ? 'Tap to pause'
                    : 'Tap to resume'}
              </p>
            </div>
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
          <button className="secondary-button" type="button" onClick={onToggleTimer}>
            Pause / resume
          </button>
          <button className="secondary-button" type="button" onClick={() => onResetTimer(activeTimer.id)}>
            Reset
          </button>
        </div>
      ) : null}
    </section>
  );
};
