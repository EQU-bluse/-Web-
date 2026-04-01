import { Task, TaskStatus } from '../types';
import { TaskCard } from './TaskCard';

interface BoardColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onMove: (taskId: string, status: TaskStatus) => void;
  onDelete: (taskId: string) => void;
  color: string;
}

export const BoardColumn = ({ title, status, tasks, onMove, onDelete, color }: BoardColumnProps) => {
  const columnTasks = tasks.filter(task => task.status === status);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('drag-over');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) {
      onMove(taskId, status);
    }
  };

  return (
    <div className="board-column">
      <div className="column-header" style={{ borderLeftColor: color }}>
        <h3>{title}</h3>
        <span className="task-count">{columnTasks.length}</span>
      </div>
      <div
        className="column-content"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {columnTasks.length === 0 ? (
          <div className="empty-state">拖入任务</div>
        ) : (
          columnTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onMove={onMove}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};
