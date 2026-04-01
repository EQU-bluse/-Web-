import { Task, TaskStatus, Priority } from '../types';

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const createTask = (
  title: string,
  description: string,
  assignee: string,
  dueDate: string,
  priority: Priority
): Task => {
  return {
    id: generateId(),
    title,
    description,
    assignee,
    dueDate,
    priority,
    status: TaskStatus.TODO,
    createdAt: new Date().toISOString().split('T')[0]
  };
};

export const changeTaskStatus = (task: Task, newStatus: TaskStatus): Task => {
  return {
    ...task,
    status: newStatus
  };
};

export const getTasksByStatus = (tasks: Task[], status: TaskStatus): Task[] => {
  return tasks.filter(task => task.status === status);
};

export const isOverdue = (dueDate: string): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(dueDate) < today;
};
