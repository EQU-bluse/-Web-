import { Task, Priority, TaskStatus } from '../types';
import { getPriorityLabel, getAllAssignees } from '../utils/filter';
import { getStatusLabel } from '../utils/taskStatus';

interface FilterPanelProps {
  tasks: Task[];
  searchKeyword: string;
  onSearchChange: (keyword: string) => void;
  selectedAssignees: string[];
  onToggleAssignee: (assignee: string) => void;
  selectedPriorities: Priority[];
  onTogglePriority: (priority: Priority) => void;
  selectedStatuses: TaskStatus[];
  onToggleStatus: (status: TaskStatus) => void;
  onClearFilters: () => void;
}

export const FilterPanel = ({
  tasks,
  searchKeyword,
  onSearchChange,
  selectedAssignees,
  onToggleAssignee,
  selectedPriorities,
  onTogglePriority,
  selectedStatuses,
  onToggleStatus,
  onClearFilters
}: FilterPanelProps) => {
  const assignees = getAllAssignees(tasks);
  const priorities = [Priority.HIGH, Priority.MEDIUM, Priority.LOW];
  const statuses = [TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.DONE];

  const hasActiveFilters = selectedAssignees.length > 0 || selectedPriorities.length > 0 || selectedStatuses.length > 0 || searchKeyword;

  return (
    <aside className="filter-panel">
      <div className="filter-section">
        <h3 className="filter-title">🔍 搜索</h3>
        <input
          type="text"
          className="search-input"
          placeholder="搜索标题或描述..."
          value={searchKeyword}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="filter-section">
        <h3 className="filter-title">👤 负责人</h3>
        <div className="filter-options">
          {assignees.map(assignee => (
            <label key={assignee} className="filter-option">
              <input
                type="checkbox"
                checked={selectedAssignees.includes(assignee)}
                onChange={() => onToggleAssignee(assignee)}
              />
              <span>{assignee}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3 className="filter-title">⭐ 优先级</h3>
        <div className="filter-options">
          {priorities.map(priority => (
            <label key={priority} className="filter-option">
              <input
                type="checkbox"
                checked={selectedPriorities.includes(priority)}
                onChange={() => onTogglePriority(priority)}
              />
              <span>{getPriorityLabel(priority)}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3 className="filter-title">📊 状态</h3>
        <div className="filter-options">
          {statuses.map(status => (
            <label key={status} className="filter-option">
              <input
                type="checkbox"
                checked={selectedStatuses.includes(status)}
                onChange={() => onToggleStatus(status)}
              />
              <span>{getStatusLabel(status)}</span>
            </label>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <button className="clear-filters-btn" onClick={onClearFilters}>
          ✕ 清除所有筛选
        </button>
      )}
    </aside>
  );
};
