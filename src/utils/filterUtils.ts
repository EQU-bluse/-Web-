import { Task, Filters, TaskStatus, Priority } from '../types';

export const filterTasks = (tasks: Task[], filters: Filters): Task[] => {
  return tasks.filter(task => {
    const matchesAssignee = filters.assignees.length === 0 || filters.assignees.includes(task.assignee);
    const matchesPriority = filters.priorities.length === 0 || filters.priorities.includes(task.priority);
    const matchesStatus = filters.statuses.length === 0 || filters.statuses.includes(task.status);
    
    const matchesSearch = filters.searchQuery === '' || 
      task.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(filters.searchQuery.toLowerCase());

    return matchesAssignee && matchesPriority && matchesStatus && matchesSearch;
  });
};

export const getUniqueAssignees = (tasks: Task[]): string[] => {
  return [...new Set(tasks.map(task => task.assignee))].sort();
};

export const getTasksByStatus = (tasks: Task[], status: TaskStatus): Task[] => {
  return tasks.filter(task => task.status === status);
};

export const getTasksByPriority = (tasks: Task[], priority: Priority): Task[] => {
  return tasks.filter(task => task.priority === priority);
};
