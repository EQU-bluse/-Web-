import { Task, TaskStatus } from '../types';
import { getPriorityLabel } from '../utils/filter';
import { getNextStatus, getPreviousStatus, getStatusLabel } from '../utils/taskStatus';

interface TaskCardProps {
  task: Task;
  onMoveTask: (taskId: string, status: TaskStatus) => void;
  onDragStart: (taskId: string) => void;
  onDragEnd: () => void;
}

export const TaskCard = ({ task, onMoveTask, onDragStart, onDragEnd }: TaskCardProps) => {
  const priorityColors = {
    high: 'priority-high',
    medium: 'priority-medium',
    low: 'priority-low'
  };

  const previousStatus = getPreviousStatus(task.status);
  const nextStatus = getNextStatus(task.status);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('taskId', task.id);
    onDragStart(task.id);
  };

  return (
    <div
      className="task-card"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
    >
      <div className="task-header">
        <span className={`task-priority ${priorityColors[task.priority]}`}>
          {getPriorityLabel(task.priority)}
        </span>
      </div>
      <h4 className="task-title">{task.title}</h4>
      <p className="task-description">{task.description}</p>
      <div className="task-footer">
        <div className="task-assignee">👤 {task.assignee}</div>
        <div className="task-due-date">📅 {task.dueDate}</div>
      </div>
      <div className="task-actions">
        {previousStatus && (
          <button
            className="task-move-btn left"
            onClick={() => onMoveTask(task.id, previousStatus!)}
          >
            ← {getStatusLabel(previousStatus)}
          </button>
        )}
        {nextStatus && (
          <button
            className="task-move-btn right"
            onClick={() => onMoveTask(task.id, nextStatus!)}
          >
            {getStatusLabel(nextStatus)} →
          </button>
        )}
      </div>
    </div>
  );
};
