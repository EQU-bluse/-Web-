import { Task, Filters, Priority, TaskStatus } from '../types';

export const searchTasks = (tasks: Task[], keyword: string): Task[] => {
  if (!keyword.trim()) {
    return tasks;
  }
  const lowerKeyword = keyword.toLowerCase();
  return tasks.filter(
    task =>
      task.title.toLowerCase().includes(lowerKeyword) ||
      task.description.toLowerCase().includes(lowerKeyword)
  );
};

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
    return true;
  });
};

export const searchAndFilterTasks = (tasks: Task[], keyword: string, filters: Filters): Task[] => {
  const searched = searchTasks(tasks, keyword);
  return filterTasks(searched, filters);
};

export const getAllAssignees = (tasks: Task[]): string[] => {
  return [...new Set(tasks.map(task => task.assignee))].sort();
};

export const getPriorityLabel = (priority: Priority): string => {
  switch (priority) {
    case Priority.HIGH:
      return '高';
    case Priority.MEDIUM:
      return '中';
    case Priority.LOW:
      return '低';
    default:
      return priority;
  }
};

export const getStatusOptions = (): { value: TaskStatus; label: string }[] => [
  { value: TaskStatus.TODO, label: '待办' },
  { value: TaskStatus.IN_PROGRESS, label: '进行中' },
  { value: TaskStatus.DONE, label: '已完成' }
];

export const getPriorityOptions = (): { value: Priority; label: string }[] => [
  { value: Priority.HIGH, label: '高' },
  { value: Priority.MEDIUM, label: '中' },
  { value: Priority.LOW, label: '低' }
];
