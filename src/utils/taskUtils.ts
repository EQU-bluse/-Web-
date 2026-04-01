import { Task, TaskStatus } from '../types';

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const moveTask = (tasks: Task[], taskId: string, newStatus: TaskStatus): Task[] => {
  return tasks.map(task =>
    task.id === taskId ? { ...task, status: newStatus } : task
  );
};

export const addTask = (tasks: Task[], task: Omit<Task, 'id' | 'createdAt'>): Task[] => {
  const newTask: Task = {
    ...task,
    id: generateId(),
    createdAt: new Date().toISOString().split('T')[0],
  };
  return [...tasks, newTask];
};

export const deleteTask = (tasks: Task[], taskId: string): Task[] => {
  return tasks.filter(task => task.id !== taskId);
};
