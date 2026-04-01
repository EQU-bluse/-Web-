import { Task, TaskStatus } from '../types';

export const moveTaskToStatus = (tasks: Task[], taskId: string, newStatus: TaskStatus): Task[] => {
  return tasks.map(task =>
    task.id === taskId ? { ...task, status: newStatus } : task
  );
};

export const getNextStatus = (currentStatus: TaskStatus): TaskStatus | null => {
  switch (currentStatus) {
    case TaskStatus.TODO:
      return TaskStatus.IN_PROGRESS;
    case TaskStatus.IN_PROGRESS:
      return TaskStatus.DONE;
    case TaskStatus.DONE:
      return null;
    default:
      return null;
  }
};

export const getPreviousStatus = (currentStatus: TaskStatus): TaskStatus | null => {
  switch (currentStatus) {
    case TaskStatus.TODO:
      return null;
    case TaskStatus.IN_PROGRESS:
      return TaskStatus.TODO;
    case TaskStatus.DONE:
      return TaskStatus.IN_PROGRESS;
    default:
      return null;
  }
};

export const getStatusLabel = (status: TaskStatus): string => {
  switch (status) {
    case TaskStatus.TODO:
      return '待办';
    case TaskStatus.IN_PROGRESS:
      return '进行中';
    case TaskStatus.DONE:
      return '已完成';
    default:
      return status;
  }
};

export const getTasksByStatus = (tasks: Task[], status: TaskStatus): Task[] => {
  return tasks.filter(task => task.status === status);
};
