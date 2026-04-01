import { useState } from 'react';
import { Filters, TaskStatus, Priority, Task } from '../types';
import { filterTasks, getUniqueAssignees } from '../utils/filterUtils';

export const useFilters = (tasks: Task[]) => {
  const [filters, setFilters] = useState<Filters>({
    assignees: [],
    priorities: [],
    statuses: [],
    searchQuery: '',
  });

  const uniqueAssignees = getUniqueAssignees(tasks);
  const filteredTasks = filterTasks(tasks, filters);

  const toggleAssignee = (assignee: string) => {
    setFilters(prev => ({
      ...prev,
      assignees: prev.assignees.includes(assignee)
        ? prev.assignees.filter(a => a !== assignee)
        : [...prev.assignees, assignee],
    }));
  };

  const togglePriority = (priority: Priority) => {
    setFilters(prev => ({
      ...prev,
      priorities: prev.priorities.includes(priority)
        ? prev.priorities.filter(p => p !== priority)
        : [...prev.priorities, priority],
    }));
  };

  const toggleStatus = (status: TaskStatus) => {
    setFilters(prev => ({
      ...prev,
      statuses: prev.statuses.includes(status)
        ? prev.statuses.filter(s => s !== status)
        : [...prev.statuses, status],
    }));
  };

  const setSearchQuery = (query: string) => {
    setFilters(prev => ({
      ...prev,
      searchQuery: query,
    }));
  };

  const resetFilters = () => {
    setFilters({
      assignees: [],
      priorities: [],
      statuses: [],
      searchQuery: '',
    });
  };

  return {
    filters,
    filteredTasks,
    uniqueAssignees,
    toggleAssignee,
    togglePriority,
    toggleStatus,
    setSearchQuery,
    resetFilters,
  };
};
