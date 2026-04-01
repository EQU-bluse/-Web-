import { Task, TaskStatus } from '../types';
import { BoardColumn } from './BoardColumn';

interface BoardViewProps {
  tasks: Task[];
  onMove: (taskId: string, status: TaskStatus) => void;
  onDelete: (taskId: string) => void;
}

const columns = [
  { title: '待办 Todo', status: 'todo' as TaskStatus, color: '#1890ff' },
  { title: '进行中 In Progress', status: 'inprogress' as TaskStatus, color: '#faad14' },
  { title: '已完成 Done', status: 'done' as TaskStatus, color: '#52c41a' },
];

export const BoardView = ({ tasks, onMove, onDelete }: BoardViewProps) => {
  return (
    <div className="board-view">
      {columns.map((column) => (
        <BoardColumn
          key={column.status}
          title={column.title}
          status={column.status}
          tasks={tasks}
          onMove={onMove}
          onDelete={onDelete}
          color={column.color}
        />
      ))}
    </div>
  );
};
