import { ViewMode } from '../types';

interface NavbarProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onAddTask: () => void;
}

export const Navbar = ({ viewMode, onViewModeChange, onAddTask }: NavbarProps) => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h1 className="app-title">📋 团队任务看板</h1>
        <div className="navbar-actions">
          <div className="view-toggle">
            <button
              className={`view-btn ${viewMode === 'board' ? 'active' : ''}`}
              onClick={() => onViewModeChange('board')}
            >
              看板视图
            </button>
            <button
              className={`view-btn ${viewMode === 'stats' ? 'active' : ''}`}
              onClick={() => onViewModeChange('stats')}
            >
              统计视图
            </button>
          </div>
          <button className="add-task-btn" onClick={onAddTask}>
            + 新增任务
          </button>
        </div>
      </div>
    </nav>
  );
};
