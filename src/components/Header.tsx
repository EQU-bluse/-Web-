import { ViewType } from '../types';

interface HeaderProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export function Header({ currentView, onViewChange }: HeaderProps) {
  return (
    <header className="app-header">
      <h1 className="app-title">
        <span>📋</span>
        团队任务看板
      </h1>
      <div className="view-tabs">
        <button
          className={`view-tab ${currentView === 'kanban' ? 'active' : ''}`}
          onClick={() => onViewChange('kanban')}
        >
          看板视图
        </button>
        <button
          className={`view-tab ${currentView === 'stats' ? 'active' : ''}`}
          onClick={() => onViewChange('stats')}
        >
          统计视图
        </button>
      </div>
    </header>
  );
}
