import { Task, TaskStatus, Priority } from '../types';
import { getTasksByStatus, getTasksByPriority } from '../utils/filterUtils';

interface StatsViewProps {
  tasks: Task[];
}

const statusLabels: Record<TaskStatus, string> = {
  todo: '待办',
  inprogress: '进行中',
  done: '已完成',
};

const priorityLabels: Record<Priority, string> = {
  low: '低优先级',
  medium: '中优先级',
  high: '高优先级',
};

const statusColors: Record<TaskStatus, string> = {
  todo: '#1890ff',
  inprogress: '#faad14',
  done: '#52c41a',
};

const priorityColors: Record<Priority, string> = {
  low: '#52c41a',
  medium: '#faad14',
  high: '#ff4d4f',
};

export const StatsView = ({ tasks }: StatsViewProps) => {
  const statuses: TaskStatus[] = ['todo', 'inprogress', 'done'];
  const priorities: Priority[] = ['low', 'medium', 'high'];

  const statusData = statuses.map((status) => ({
    name: statusLabels[status],
    count: getTasksByStatus(tasks, status).length,
    color: statusColors[status],
  }));

  const priorityData = priorities.map((priority) => ({
    name: priorityLabels[priority],
    count: getTasksByPriority(tasks, priority).length,
    color: priorityColors[priority],
  }));

  const totalTasks = tasks.length;
  const maxStatusCount = Math.max(...statusData.map(d => d.count), 1);
  const maxPriorityCount = Math.max(...priorityData.map(d => d.count), 1);

  return (
    <div className="stats-view">
      <div className="stats-header">
        <h2>📊 任务统计</h2>
        <div className="total-tasks">总任务数: <strong>{totalTasks}</strong></div>
      </div>

      <div className="stats-grid">
        <div className="stats-card">
          <h3>按状态分布</h3>
          <div className="chart-container">
            {statusData.map((item) => (
              <div key={item.name} className="chart-bar">
                <div className="bar-label">{item.name}</div>
                <div className="bar-wrapper">
                  <div
                    className="bar-fill"
                    style={{
                      width: `${(item.count / maxStatusCount) * 100}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
                <div className="bar-count">{item.count}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="stats-card">
          <h3>按优先级分布</h3>
          <div className="chart-container">
            {priorityData.map((item) => (
              <div key={item.name} className="chart-bar">
                <div className="bar-label">{item.name}</div>
                <div className="bar-wrapper">
                  <div
                    className="bar-fill"
                    style={{
                      width: `${(item.count / maxPriorityCount) * 100}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
                <div className="bar-count">{item.count}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="stats-card full-width">
          <h3>各状态详细数据</h3>
          <div className="status-details">
            {statusData.map((item) => (
              <div key={item.name} className="status-detail">
                <div className="detail-icon" style={{ backgroundColor: item.color }}>
                  {item.count}
                </div>
                <div className="detail-info">
                  <div className="detail-title">{item.name}</div>
                  <div className="detail-percent">
                    {totalTasks > 0 ? ((item.count / totalTasks) * 100).toFixed(1) : 0}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
