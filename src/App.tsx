import { useState } from 'react';
import { TaskStatus, ViewType } from './types';
import { useTasks } from './hooks/useTasks';
import { useFilter } from './hooks/useFilter';
import { searchAndFilterTasks } from './utils/filter';
import { Header } from './components/Header';
import { FilterPanel } from './components/FilterPanel';
import { KanbanColumn } from './components/KanbanColumn';
import { StatisticsView } from './components/StatisticsView';
import { AddTaskModal } from './components/AddTaskModal';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('kanban');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  const { tasks, addTask, moveTask } = useTasks();
  const {
    searchKeyword,
    setSearchKeyword,
    filters,
    toggleAssignee,
    togglePriority,
    toggleStatus,
    clearFilters
  } = useFilter();

  const filteredTasks = searchAndFilterTasks(tasks, searchKeyword, filters);

  const todoTasks = filteredTasks.filter(t => t.status === TaskStatus.TODO);
  const inProgressTasks = filteredTasks.filter(t => t.status === TaskStatus.IN_PROGRESS);
  const doneTasks = filteredTasks.filter(t => t.status === TaskStatus.DONE);

  const handleDragStart = (taskId: string) => {
    setDraggedTaskId(taskId);
  };

  const handleDragEnd = () => {
    setDraggedTaskId(null);
  };

  const isColumnDragOver = (status: TaskStatus) => {
    if (!draggedTaskId) return false;
    const task = tasks.find(t => t.id === draggedTaskId);
    return task && task.status !== status;
  };

  return (
    <div className="app">
      <Header
        currentView={currentView}
        onViewChange={setCurrentView}
        onAddTask={() => setIsModalOpen(true)}
      />

      <div className="main-container">
        <FilterPanel
          tasks={tasks}
          searchKeyword={searchKeyword}
          onSearchChange={setSearchKeyword}
          selectedAssignees={filters.assignees}
          onToggleAssignee={toggleAssignee}
          selectedPriorities={filters.priorities}
          onTogglePriority={togglePriority}
          selectedStatuses={filters.statuses}
          onToggleStatus={toggleStatus}
          onClearFilters={clearFilters}
        />

        <main className="main-content">
          {currentView === 'kanban' ? (
            <div className="kanban-board">
              <KanbanColumn
                status={TaskStatus.TODO}
                tasks={todoTasks}
                onMoveTask={moveTask}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                isDragOver={isColumnDragOver(TaskStatus.TODO)}
              />
              <KanbanColumn
                status={TaskStatus.IN_PROGRESS}
                tasks={inProgressTasks}
                onMoveTask={moveTask}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                isDragOver={isColumnDragOver(TaskStatus.IN_PROGRESS)}
              />
              <KanbanColumn
                status={TaskStatus.DONE}
                tasks={doneTasks}
                onMoveTask={moveTask}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                isDragOver={isColumnDragOver(TaskStatus.DONE)}
              />
            </div>
          ) : (
            <StatisticsView tasks={filteredTasks} />
          )}
        </main>
      </div>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={addTask}
      />
    </div>
  );
}

export default App;
