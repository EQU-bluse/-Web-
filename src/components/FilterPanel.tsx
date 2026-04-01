import { Filters, Priority, TaskStatus } from '../types';

interface FilterPanelProps {
  filters: Filters;
  uniqueAssignees: string[];
  toggleAssignee: (assignee: string) => void;
  togglePriority: (priority: Priority) => void;
  toggleStatus: (status: TaskStatus) => void;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
}

const priorities: Priority[] = ['low', 'medium', 'high'];
const statuses: TaskStatus[] = ['todo', 'inprogress', 'done'];

const statusLabels: Record<TaskStatus, string> = {
  todo: '待办',
  inprogress: '进行中',
  done: '已完成',
};

const priorityLabels: Record<Priority, string> = {
  low: '低',
  medium: '中',
  high: '高',
};

export const FilterPanel = ({
  filters,
  uniqueAssignees,
  toggleAssignee,
  togglePriority,
  toggleStatus,
  setSearchQuery,
  resetFilters,
}: FilterPanelProps) => {
  return (
    <aside className="filter-panel">
      <div className="filter-header">
        <h2>筛选条件</h2>
        <button className="reset-btn" onClick={resetFilters}>
          重置
        </button>
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="搜索标题或描述..."
          value={filters.searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="filter-section">
        <h3>负责人</h3>
        <div className="filter-options">
          {uniqueAssignees.map((assignee) => (
            <label key={assignee} className="filter-option">
              <input
                type="checkbox"
                checked={filters.assignees.includes(assignee)}
                onChange={() => toggleAssignee(assignee)}
              />
              <span>{assignee}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3>优先级</h3>
        <div className="filter-options">
          {priorities.map((priority) => (
            <label key={priority} className="filter-option">
              <input
                type="checkbox"
                checked={filters.priorities.includes(priority)}
                onChange={() => togglePriority(priority)}
              />
              <span className={`priority-tag priority-${priority}`}>
                {priorityLabels[priority]}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3>状态</h3>
        <div className="filter-options">
          {statuses.map((status) => (
            <label key={status} className="filter-option">
              <input
                type="checkbox"
                checked={filters.statuses.includes(status)}
                onChange={() => toggleStatus(status)}
              />
              <span>{statusLabels[status]}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};
