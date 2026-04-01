import { useState } from 'react';
import { Task } from '../types';
import { isOverdue } from '../utils/taskUtils';

interface TaskCardProps {
  task: Task;
  onDragStart: (taskId: string) => void;
}

export function TaskCard({ task, onDragStart }: TaskCardProps) {
  const [isDragging, setIsDragging] = useState(false);

  const priorityClassMap = {
    high: 'priority-high',
    medium: 'priority-medium',
    low: 'priority-low'
  };

  const priorityLabels = {
    high: '高',
    medium: '中',
    low: '低'
  };

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    onDragStart(task.id);
    e.dataTransfer.setData('text/plain', task.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      className={`task-card ${isDragging ? 'dragging' : ''}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <h4 className="task-title">{task.title}</h4>
      <p className="task-description">{task.description}</p>
      <div className="task-meta">
        <div className="task-assignee">
          <div className="avatar">{task.assignee[0]}</div>
          <span>{task.assignee}</span>
        </div>
        <span className={`task-priority ${priorityClassMap[task.priority]}`}>
          {priorityLabels[task.priority]}
        </span>
        <div className={`task-due ${isOverdue(task.dueDate) && task.status !== 'done' ? 'overdue' : ''}`}>
          📅 {task.dueDate}
        </div>
      </div>
    </div>
  );
}
