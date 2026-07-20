import { Timer } from '../timer';
import { TimerCard } from './TimerCard';

type TimerListProps = {
  activeTimerId: string | null;
  canAddTimer: boolean;
  onAddTimer: () => void;
  onDeleteTimer: (timerId: string) => void;
  onEditDuration: (timerId: string, durationSeconds: number) => void;
  onEditName: (timerId: string, name: string) => void;
  onSelectTimer: (timerId: string) => void;
  timers: Timer[];
};

export const TimerList = ({
  activeTimerId,
  canAddTimer,
  onAddTimer,
  onDeleteTimer,
  onEditDuration,
  onEditName,
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
      {timers.map((timer) => (
        <TimerCard
          key={timer.id}
          isActive={timer.id === activeTimerId}
          onDeleteTimer={onDeleteTimer}
          onEditDuration={onEditDuration}
          onEditName={onEditName}
          onSelectTimer={onSelectTimer}
          timer={timer}
        />
      ))}
    </div>
  </aside>
);
