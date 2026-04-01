import { Task, TaskStatus } from '../types';
import { KanbanColumn } from '../components/KanbanColumn';

interface KanbanViewProps {
  tasks: Task[];
  onMoveTask: (taskId: string, status: TaskStatus) => void;
}

export function KanbanView({ tasks, onMoveTask }: KanbanViewProps) {
  const handleDrop = (taskId: string, status: TaskStatus) => {
    onMoveTask(taskId, status);
  };

  const columns = [
    {
      status: TaskStatus.TODO,
      title: '待办',
      colorClass: 'todo',
      icon: '📝'
    },
    {
      status: TaskStatus.IN_PROGRESS,
      title: '进行中',
      colorClass: 'inprogress',
      icon: '🔄'
    },
    {
      status: TaskStatus.DONE,
      title: '已完成',
      colorClass: 'done',
      icon: '✅'
    }
  ];

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter(task => task.status === status);
  };

  return (
    <div className="kanban-board">
      {columns.map(column => (
        <KanbanColumn
          key={column.status}
          title={column.title}
          status={column.status}
          tasks={getTasksByStatus(column.status)}
          colorClass={column.colorClass}
          icon={column.icon}
          onDrop={handleDrop}
        />
      ))}
    </div>
  );
}
