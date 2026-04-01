import { useState } from 'react';
import { ViewType, TaskStatus, Priority } from './types';
import { useTasks } from './hooks/useTasks';
import { useFilters } from './hooks/useFilters';
import { Header } from './components/Header';
import { FilterPanel } from './components/FilterPanel';
import { AddTaskModal } from './components/AddTaskModal';
import { KanbanView } from './views/KanbanView';
import { StatsView } from './views/StatsView';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('kanban');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  const { tasks, addTask, moveTask } = useTasks();
  const {
    filters,
    filteredTasks,
    toggleAssignee,
    togglePriority,
    toggleStatus,
    setSearchKeyword,
    resetFilters
  } = useFilters(tasks);

  const handleDragStart = (taskId: string, e: React.DragEvent) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.setData('text/plain', taskId);
  };

  const handleMoveTask = (taskId: string, status: TaskStatus) => {
    moveTask(taskId, status);
    setDraggedTaskId(null);
  };

  const handleAddTask = (
    title: string,
    description: string,
    assignee: string,
    dueDate: string,
    priority: Priority
  ) => {
    addTask(title, description, assignee, dueDate, priority);
  };

  return (
    <div className="app">
      <Header currentView={currentView} onViewChange={setCurrentView} />

      <div className="app-main">
        {currentView === 'kanban' && (
          <FilterPanel
            filters={filters}
            onSearch={setSearchKeyword}
            onToggleAssignee={toggleAssignee}
            onTogglePriority={togglePriority}
            onToggleStatus={toggleStatus}
            onReset={resetFilters}
          />
        )}

        <main className="main-content">
          {currentView === 'kanban' ? (
            <KanbanView
              tasks={filteredTasks}
              onMoveTask={handleMoveTask}
            />
          ) : (
            <StatsView tasks={filteredTasks} />
          )}
        </main>
      </div>

      {currentView === 'kanban' && (
        <button className="add-btn" onClick={() => setIsModalOpen(true)}>
          +
        </button>
      )}

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddTask}
      />
    </div>
  );
}

export default App;
