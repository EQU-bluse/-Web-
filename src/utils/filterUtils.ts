import { Task, Filters, TaskStatus, Priority } from '../types';

export const filterTasks = (tasks: Task[], filters: Filters): Task[] => {
  return tasks.filter(task => {
    if (filters.assignees.length > 0 && !filters.assignees.includes(task.assignee)) {
      return false;
    }

    if (filters.priorities.length > 0 && !filters.priorities.includes(task.priority)) {
      return false;
    }

    if (filters.statuses.length > 0 && !filters.statuses.includes(task.status)) {
      return false;
    }

    if (filters.searchKeyword) {
      const keyword = filters.searchKeyword.toLowerCase();
      const matchTitle = task.title.toLowerCase().includes(keyword);
      const matchDescription = task.description.toLowerCase().includes(keyword);
      if (!matchTitle && !matchDescription) {
        return false;
      }
    }

    return true;
  });
};

export const getStatusCounts = (tasks: Task[]): Record<TaskStatus, number> => {
  return {
    [TaskStatus.TODO]: tasks.filter(t => t.status === TaskStatus.TODO).length,
    [TaskStatus.IN_PROGRESS]: tasks.filter(t => t.status === TaskStatus.IN_PROGRESS).length,
    [TaskStatus.DONE]: tasks.filter(t => t.status === TaskStatus.DONE).length
  };
};

export const getPriorityCounts = (tasks: Task[]): Record<Priority, number> => {
  return {
    [Priority.HIGH]: tasks.filter(t => t.priority === Priority.HIGH).length,
    [Priority.MEDIUM]: tasks.filter(t => t.priority === Priority.MEDIUM).length,
    [Priority.LOW]: tasks.filter(t => t.priority === Priority.LOW).length
  };
};
