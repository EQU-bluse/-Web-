import { ViewType } from '../types';

interface HeaderProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  onAddTask: () => void;
}

export const Header = ({ currentView, onViewChange, onAddTask }: HeaderProps) => {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="app-title">📋 团队任务看板</h1>
      </div>
      <div className="header-right">
        <div className="view-tabs">
          <button
            className={`view-tab ${currentView === 'kanban' ? 'active' : ''}`}
            onClick={() => onViewChange('kanban')}
          >
            看板视图
          </button>
          <button
            className={`view-tab ${currentView === 'statistics' ? 'active' : ''}`}
            onClick={() => onViewChange('statistics')}
          >
            统计视图
          </button>
        </div>
        <button className="add-task-btn" onClick={onAddTask}>
          + 新增任务
        </button>
      </div>
    </header>
  );
};
