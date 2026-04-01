import { useState, useEffect } from 'react';
import { Task, TaskStatus } from '../types';
import { mockTasks } from '../utils/mockData';
import { moveTask, addTask, deleteTask } from '../utils/taskUtils';

const STORAGE_KEY = 'team-task-board-tasks';

export const useTaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : mockTasks;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const handleMoveTask = (taskId: string, newStatus: TaskStatus) => {
    setTasks(prev => moveTask(prev, taskId, newStatus));
  };

  const handleAddTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    setTasks(prev => addTask(prev, task));
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => deleteTask(prev, taskId));
  };

  return {
    tasks,
    moveTask: handleMoveTask,
    addTask: handleAddTask,
    deleteTask: handleDeleteTask,
  };
};
