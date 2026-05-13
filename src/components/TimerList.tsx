import { Timer, formatTime } from '../timer';

type TimerListProps = {
  activeTimerId: string | null;
  canAddTimer: boolean;
  onAddTimer: () => void;
  onDeleteTimer: (timerId: string) => void;
  onEditMinutes: (timerId: string, minutes: string) => void;
  onEditName: (timerId: string, name: string) => void;
  onEditSeconds: (timerId: string, seconds: string) => void;
  onSelectTimer: (timerId: string) => void;
  timers: Timer[];
};

export const TimerList = ({
  activeTimerId,
  canAddTimer,
  onAddTimer,
  onDeleteTimer,
  onEditMinutes,
  onEditName,
  onEditSeconds,
  onSelectTimer,
  timers,
}: TimerListProps) => (
  <aside className="panel timer-list-panel">
    <div className="panel-heading">
      <div>
        <p className="panel-label">Timer library</p>
        <h2>Build a stack of timers</h2>
      </div>

      <button className="secondary-button" type="button" onClick={onAddTimer} disabled={!canAddTimer}>
        Add timer
      </button>
    </div>

    {!canAddTimer ? <p className="panel-helper">Maximum of 10 timers reached.</p> : null}

    <div className="timer-grid">
      {timers.map((timer) => {
        const isActive = timer.id === activeTimerId;

        return (
          <article key={timer.id} className={`timer-card${isActive ? ' timer-card-active' : ''}`}>
            <button className="timer-card-head" type="button" onClick={() => onSelectTimer(timer.id)}>
              <div>
                <p className="timer-card-name">{timer.name}</p>
                <p className="timer-card-time">{formatTime(timer.remainingSeconds)}</p>
              </div>

              <span className={`status-pill${timer.isRunning ? ' status-running' : ''}`}>
                {timer.remainingSeconds === 0 ? 'Done' : timer.isRunning ? 'Running' : 'Paused'}
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
                  aria-label={`Minutes for ${timer.name}`}
                  inputMode="numeric"
                  max="59"
                  min="0"
                  type="number"
                  value={Math.floor(timer.durationSeconds / 60)}
                  onChange={(event) => onEditMinutes(timer.id, event.target.value)}
                />
              </label>

              <label>
                <span>Seconds</span>
                <input
                  aria-label={`Seconds for ${timer.name}`}
                  inputMode="numeric"
                  max="59"
                  min="0"
                  type="number"
                  value={timer.durationSeconds % 60}
                  onChange={(event) => onEditSeconds(timer.id, event.target.value)}
                />
              </label>
            </div>

            <div className="timer-actions">
              <button className="primary-button" type="button" onClick={() => onSelectTimer(timer.id)}>
                Select
              </button>
              <button className="danger-button" type="button" onClick={() => onDeleteTimer(timer.id)}>
                Remove
              </button>
            </div>
          </article>
        );
      })}
    </div>
  </aside>
);
