import { useCallback } from 'react';
import { Task, TaskStatus, Priority } from '../types';
import { createTask, changeTaskStatus } from '../utils/taskUtils';
import { useLocalStorage } from './useLocalStorage';
import { mockTasks } from '../data/mockTasks';

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('kanban-tasks', mockTasks);

  const addTask = useCallback((
    title: string,
    description: string,
    assignee: string,
    dueDate: string,
    priority: Priority
  ) => {
    const newTask = createTask(title, description, assignee, dueDate, priority);
    setTasks(prev => [...prev, newTask]);
  }, [setTasks]);

  const moveTask = useCallback((taskId: string, newStatus: TaskStatus) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? changeTaskStatus(task, newStatus) : task
    ));
  }, [setTasks]);

  return {
    tasks,
    addTask,
    moveTask
  };
}
