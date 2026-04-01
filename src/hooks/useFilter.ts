import { useState } from 'react';
import { Filters, Priority, TaskStatus } from '../types';

export const useFilter = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filters, setFilters] = useState<Filters>({
    assignees: [],
    priorities: [],
    statuses: []
  });

  const toggleAssignee = (assignee: string) => {
    setFilters(prev => ({
      ...prev,
      assignees: prev.assignees.includes(assignee)
        ? prev.assignees.filter(a => a !== assignee)
        : [...prev.assignees, assignee]
    }));
  };

  const togglePriority = (priority: Priority) => {
    setFilters(prev => ({
      ...prev,
      priorities: prev.priorities.includes(priority)
        ? prev.priorities.filter(p => p !== priority)
        : [...prev.priorities, priority]
    }));
  };

  const toggleStatus = (status: TaskStatus) => {
    setFilters(prev => ({
      ...prev,
      statuses: prev.statuses.includes(status)
        ? prev.statuses.filter(s => s !== status)
        : [...prev.statuses, status]
    }));
  };

  const clearFilters = () => {
    setFilters({
      assignees: [],
      priorities: [],
      statuses: []
    });
    setSearchKeyword('');
  };

  return {
    searchKeyword,
    setSearchKeyword,
    filters,
    toggleAssignee,
    togglePriority,
    toggleStatus,
    clearFilters
  };
};
