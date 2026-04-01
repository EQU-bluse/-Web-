export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'inProgress',
  DONE = 'done'
}

export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
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
}

export type ViewType = 'kanban' | 'statistics';
