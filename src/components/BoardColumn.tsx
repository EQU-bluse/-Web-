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

  return (
    <div className="board-column">
      <div className="column-header" style={{ borderLeftColor: color }}>
        <h3>{title}</h3>
        <span className="task-count">{columnTasks.length}</span>
      </div>
      <div className="column-content">
        {columnTasks.length === 0 ? (
          <div className="empty-state">暂无任务</div>
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
