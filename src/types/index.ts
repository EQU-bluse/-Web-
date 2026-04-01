export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'inprogress',
  DONE = 'done'
}

export enum Priority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low'
}

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
  searchKeyword: string;
}

export type ViewType = 'kanban' | 'stats';
