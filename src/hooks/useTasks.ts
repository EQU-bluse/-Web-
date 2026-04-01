import { useState, useEffect } from 'react';
import { Task, TaskStatus, Priority } from '../types';
import { moveTaskToStatus } from '../utils/taskStatus';
import { saveTasksToStorage, loadTasksFromStorage } from '../utils/storage';
import { generateMockTasks } from '../utils/mockData';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const savedTasks = loadTasksFromStorage();
    if (savedTasks && savedTasks.length > 0) {
      setTasks(savedTasks);
    } else {
      setTasks(generateMockTasks());
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      saveTasksToStorage(tasks);
    }
  }, [tasks]);

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTasks(prev => [...prev, newTask]);
  };

  const moveTask = (taskId: string, newStatus: TaskStatus) => {
    setTasks(prev => moveTaskToStatus(prev, taskId, newStatus));
  };

  return {
    tasks,
    addTask,
    moveTask
  };
};
