import { Task, TaskStatus } from '../types';

interface TaskCardProps {
  task: Task;
  onMove: (taskId: string, status: TaskStatus) => void;
  onDelete: (taskId: string) => void;
}

const statusLabels: Record<TaskStatus, string> = {
  todo: '待办',
  inprogress: '进行中',
  done: '已完成',
};

const priorityColors: Record<string, string> = {
  low: '#52c41a',
  medium: '#faad14',
  high: '#ff4d4f',
};

export const TaskCard = ({ task, onMove, onDelete }: TaskCardProps) => {
  const getAvailableMoves = (currentStatus: TaskStatus): TaskStatus[] => {
    switch (currentStatus) {
      case 'todo':
        return ['inprogress'];
      case 'inprogress':
        return ['todo', 'done'];
      case 'done':
        return ['inprogress'];
      default:
        return [];
    }
  };

  const availableMoves = getAvailableMoves(task.status);

  return (
    <div className="task-card">
      <div className="task-card-header">
        <h4 className="task-title">{task.title}</h4>
        <button className="delete-btn" onClick={() => onDelete(task.id)}>
          ×
        </button>
      </div>
      <p className="task-description">{task.description}</p>
      <div className="task-meta">
        <span className="task-assignee">👤 {task.assignee}</span>
        <span className="task-due-date">📅 {task.dueDate}</span>
        <span
          className="task-priority"
          style={{ backgroundColor: priorityColors[task.priority] }}
        >
          {task.priority === 'low' ? '低' : task.priority === 'medium' ? '中' : '高'}
        </span>
      </div>
      <div className="task-actions">
        {availableMoves.map((status) => (
          <button
            key={status}
            className="move-btn"
            onClick={() => onMove(task.id, status)}
          >
            → {statusLabels[status]}
          </button>
        ))}
      </div>
    </div>
  );
};
