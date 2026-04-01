import { useState } from 'react';
import { Task, TaskStatus } from '../types';
import { TaskCard } from './TaskCard';

interface KanbanColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  colorClass: string;
  icon: string;
  onDrop: (taskId: string, status: TaskStatus) => void;
}

export function KanbanColumn({ title, status, tasks, colorClass, icon, onDrop }: KanbanColumnProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId) {
      onDrop(taskId, status);
    }
  };

  return (
    <div
      className={`kanban-column ${isDragOver ? 'drop-highlight' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className={`column-header ${colorClass}`}>
        <h3 className="column-title">
          <span>{icon}</span>
          {title}
        </h3>
        <span className="column-count">{tasks.length}</span>
      </div>
      {tasks.length === 0 ? (
        <div className="no-tasks">暂无任务</div>
      ) : (
        tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onDragStart={(taskId) => {
            }}
          />
        ))
      )}
    </div>
  );
}
