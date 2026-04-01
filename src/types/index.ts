export type TaskStatus = 'todo' | 'inprogress' | 'done';

export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  priority: Priority;
  status: TaskStatus;
  createdAt: string;
}

export interface Filters {
  assignees: string[];
  priorities: Priority[];
  statuses: TaskStatus[];
  searchQuery: string;
}

export type ViewMode = 'board' | 'stats';
