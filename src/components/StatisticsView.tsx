import { Task, TaskStatus, Priority } from '../types';
import { getStatusLabel } from '../utils/taskStatus';
import { getPriorityLabel } from '../utils/filter';

interface StatisticsViewProps {
  tasks: Task[];
}

export const StatisticsView = ({ tasks }: StatisticsViewProps) => {
  const statusCounts = {
    [TaskStatus.TODO]: tasks.filter(t => t.status === TaskStatus.TODO).length,
    [TaskStatus.IN_PROGRESS]: tasks.filter(t => t.status === TaskStatus.IN_PROGRESS).length,
    [TaskStatus.DONE]: tasks.filter(t => t.status === TaskStatus.DONE).length
  };

  const priorityCounts = {
    [Priority.HIGH]: tasks.filter(t => t.priority === Priority.HIGH).length,
    [Priority.MEDIUM]: tasks.filter(t => t.priority === Priority.MEDIUM).length,
    [Priority.LOW]: tasks.filter(t => t.priority === Priority.LOW).length
  };

  const assigneeCounts = tasks.reduce((acc, task) => {
    acc[task.assignee] = (acc[task.assignee] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalTasks = tasks.length;
  const completedTasks = statusCounts[TaskStatus.DONE];
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="statistics-view">
      <div className="stats-overview">
        <div className="stat-card">
          <h3>总任务数</h3>
          <div className="stat-value">{totalTasks}</div>
        </div>
        <div className="stat-card">
          <h3>已完成</h3>
          <div className="stat-value">{completedTasks}</div>
        </div>
        <div className="stat-card">
          <h3>完成率</h3>
          <div className="stat-value">{completionRate}%</div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stats-card">
          <h3 className="stats-card-title">📊 任务状态分布</h3>
          <div className="status-chart">
            {Object.entries(statusCounts).map(([status, count]) => (
              <div key={status} className="chart-item">
                <div className="chart-label">{getStatusLabel(status as TaskStatus)}</div>
                <div className="chart-bar-container">
                  <div
                    className={`chart-bar ${status}`}
                    style={{ width: `${totalTasks > 0 ? (count / totalTasks) * 100 : 0}%` }}
                  />
                </div>
                <div className="chart-count">{count}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="stats-card">
          <h3 className="stats-card-title">⭐ 优先级分布</h3>
          <div className="priority-chart">
            {Object.entries(priorityCounts).map(([priority, count]) => (
              <div key={priority} className="chart-item">
                <div className="chart-label">{getPriorityLabel(priority as Priority)}</div>
                <div className="chart-bar-container">
                  <div
                    className={`chart-bar ${priority}`}
                    style={{ width: `${totalTasks > 0 ? (count / totalTasks) * 100 : 0}%` }}
                  />
                </div>
                <div className="chart-count">{count}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="stats-card full-width">
          <h3 className="stats-card-title">👤 负责人任务统计</h3>
          <div className="assignee-chart">
            {Object.entries(assigneeCounts).map(([assignee, count]) => (
              <div key={assignee} className="chart-item">
                <div className="chart-label">{assignee}</div>
                <div className="chart-bar-container">
                  <div
                    className="chart-bar assignee"
                    style={{ width: `${totalTasks > 0 ? (count / totalTasks) * 100 : 0}%` }}
                  />
                </div>
                <div className="chart-count">{count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
