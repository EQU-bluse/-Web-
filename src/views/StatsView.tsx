import { Task, TaskStatus, Priority } from '../types';
import { getStatusCounts, getPriorityCounts } from '../utils/filterUtils';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface StatsViewProps {
  tasks: Task[];
}

export function StatsView({ tasks }: StatsViewProps) {
  const statusCounts = getStatusCounts(tasks);
  const priorityCounts = getPriorityCounts(tasks);

  const statusData = [
    { name: '待办', value: statusCounts[TaskStatus.TODO], color: '#faad14' },
    { name: '进行中', value: statusCounts[TaskStatus.IN_PROGRESS], color: '#1890ff' },
    { name: '已完成', value: statusCounts[TaskStatus.DONE], color: '#52c41a' }
  ];

  const priorityData = [
    { name: '高', value: priorityCounts[Priority.HIGH], color: '#cf1322' },
    { name: '中', value: priorityCounts[Priority.MEDIUM], color: '#d46b08' },
    { name: '低', value: priorityCounts[Priority.LOW], color: '#389e0d' }
  ];

  const completionRate = tasks.length > 0
    ? Math.round((statusCounts[TaskStatus.DONE] / tasks.length) * 100)
    : 0;

  return (
    <div className="stats-view">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-title">总任务数</div>
          <div className="stat-value">{tasks.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">完成率</div>
          <div className="stat-value">{completionRate}%</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">进行中任务</div>
          <div className="stat-value">{statusCounts[TaskStatus.IN_PROGRESS]}</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">高优先级任务</div>
          <div className="stat-value">{priorityCounts[Priority.HIGH]}</div>
        </div>
      </div>

      <div className="chart-container">
        <h3 className="chart-title">各状态任务数量分布</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={statusData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" name="任务数">
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container">
        <h3 className="chart-title">各优先级任务数量分布</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={priorityData}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {priorityData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
