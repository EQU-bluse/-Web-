import { useState, useCallback, useMemo } from 'react';
import { Filters, TaskStatus, Priority, Task } from '../types';
import { filterTasks } from '../utils/filterUtils';

export function useFilters(tasks: Task[]) {
  const [filters, setFilters] = useState<Filters>({
    assignees: [],
    priorities: [],
    statuses: [],
    searchKeyword: ''
  });

  const filteredTasks = useMemo(() => {
    return filterTasks(tasks, filters);
  }, [tasks, filters]);

  const toggleAssignee = useCallback((assignee: string) => {
    setFilters(prev => ({
      ...prev,
      assignees: prev.assignees.includes(assignee)
        ? prev.assignees.filter(a => a !== assignee)
        : [...prev.assignees, assignee]
    }));
  }, []);

  const togglePriority = useCallback((priority: Priority) => {
    setFilters(prev => ({
      ...prev,
      priorities: prev.priorities.includes(priority)
        ? prev.priorities.filter(p => p !== priority)
        : [...prev.priorities, priority]
    }));
  }, []);

  const toggleStatus = useCallback((status: TaskStatus) => {
    setFilters(prev => ({
      ...prev,
      statuses: prev.statuses.includes(status)
        ? prev.statuses.filter(s => s !== status)
        : [...prev.statuses, status]
    }));
  }, []);

  const setSearchKeyword = useCallback((keyword: string) => {
    setFilters(prev => ({
      ...prev,
      searchKeyword: keyword
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      assignees: [],
      priorities: [],
      statuses: [],
      searchKeyword: ''
    });
  }, []);

  return {
    filters,
    filteredTasks,
    toggleAssignee,
    togglePriority,
    toggleStatus,
    setSearchKeyword,
    resetFilters
  };
}
