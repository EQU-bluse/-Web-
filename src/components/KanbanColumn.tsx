import { Task, TaskStatus } from '../types';
import { TaskCard } from './TaskCard';
import { getStatusLabel } from '../utils/taskStatus';

interface KanbanColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onMoveTask: (taskId: string, status: TaskStatus) => void;
  onDragStart: (taskId: string) => void;
  onDragEnd: () => void;
  isDragOver: boolean;
}

export const KanbanColumn = ({ status, tasks, onMoveTask, onDragStart, onDragEnd, isDragOver }: KanbanColumnProps) => {
  const columnColors = {
    todo: 'column-todo',
    inProgress: 'column-in-progress',
    done: 'column-done'
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) {
      onMoveTask(taskId, status);
    }
  };

  return (
    <div
      className={`kanban-column ${columnColors[status]} ${isDragOver ? 'drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="column-header">
        <h3>{getStatusLabel(status)}</h3>
        <span className="task-count">{tasks.length}</span>
      </div>
      <div className="column-tasks">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onMoveTask={onMoveTask}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          />
        ))}
        {tasks.length === 0 && (
          <div className="empty-state">暂无任务</div>
        )}
      </div>
    </div>
  );
};
