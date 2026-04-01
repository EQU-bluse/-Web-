import { Filters, TaskStatus, Priority } from '../types';
import { assignees } from '../data/mockTasks';

interface FilterPanelProps {
  filters: Filters;
  onSearch: (keyword: string) => void;
  onToggleAssignee: (assignee: string) => void;
  onTogglePriority: (priority: Priority) => void;
  onToggleStatus: (status: TaskStatus) => void;
  onReset: () => void;
}

export function FilterPanel({
  filters,
  onSearch,
  onToggleAssignee,
  onTogglePriority,
  onToggleStatus,
  onReset
}: FilterPanelProps) {
  const priorityLabels: Record<Priority, string> = {
    [Priority.HIGH]: '高',
    [Priority.MEDIUM]: '中',
    [Priority.LOW]: '低'
  };

  const statusLabels: Record<TaskStatus, string> = {
    [TaskStatus.TODO]: '待办',
    [TaskStatus.IN_PROGRESS]: '进行中',
    [TaskStatus.DONE]: '已完成'
  };

  return (
    <aside className="sidebar">
      <div className="filter-section">
        <h3 className="filter-title">搜索</h3>
        <input
          type="text"
          className="search-input"
          placeholder="搜索标题或描述..."
          value={filters.searchKeyword}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="filter-section">
        <h3 className="filter-title">负责人</h3>
        {assignees.map(assignee => (
          <div key={assignee} className="filter-item">
            <input
              type="checkbox"
              id={`assignee-${assignee}`}
              checked={filters.assignees.includes(assignee)}
              onChange={() => onToggleAssignee(assignee)}
            />
            <label htmlFor={`assignee-${assignee}`} className="filter-label">
              {assignee}
            </label>
          </div>
        ))}
      </div>

      <div className="filter-section">
        <h3 className="filter-title">优先级</h3>
        {(Object.values(Priority) as Priority[]).map(priority => (
          <div key={priority} className="filter-item">
            <input
              type="checkbox"
              id={`priority-${priority}`}
              checked={filters.priorities.includes(priority)}
              onChange={() => onTogglePriority(priority)}
            />
            <label htmlFor={`priority-${priority}`} className="filter-label">
              {priorityLabels[priority]}
            </label>
          </div>
        ))}
      </div>

      <div className="filter-section">
        <h3 className="filter-title">状态</h3>
        {(Object.values(TaskStatus) as TaskStatus[]).map(status => (
          <div key={status} className="filter-item">
            <input
              type="checkbox"
              id={`status-${status}`}
              checked={filters.statuses.includes(status)}
              onChange={() => onToggleStatus(status)}
            />
            <label htmlFor={`status-${status}`} className="filter-label">
              {statusLabels[status]}
            </label>
          </div>
        ))}
      </div>

      <button className="btn-cancel" style={{ width: '100%' }} onClick={onReset}>
        重置筛选
      </button>
    </aside>
  );
}
