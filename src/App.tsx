import { useState } from 'react';
import { ViewMode } from './types';
import { Navbar } from './components/Navbar';
import { FilterPanel } from './components/FilterPanel';
import { BoardView } from './components/BoardView';
import { StatsView } from './components/StatsView';
import { AddTaskModal } from './components/AddTaskModal';
import { useTaskManager } from './hooks/useTaskManager';
import { useFilters } from './hooks/useFilters';
import './App.css';

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('board');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { tasks, moveTask, addTask, deleteTask } = useTaskManager();
  const {
    filters,
    filteredTasks,
    uniqueAssignees,
    toggleAssignee,
    togglePriority,
    toggleStatus,
    setSearchQuery,
    resetFilters,
  } = useFilters(tasks);

  return (
    <div className="app">
      <Navbar
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onAddTask={() => setIsModalOpen(true)}
      />

      <div className="app-body">
        <FilterPanel
          filters={filters}
          uniqueAssignees={uniqueAssignees}
          toggleAssignee={toggleAssignee}
          togglePriority={togglePriority}
          toggleStatus={toggleStatus}
          setSearchQuery={setSearchQuery}
          resetFilters={resetFilters}
        />

        <main className="main-content">
          {viewMode === 'board' ? (
            <BoardView
              tasks={filteredTasks}
              onMove={moveTask}
              onDelete={deleteTask}
            />
          ) : (
            <StatsView tasks={filteredTasks} />
          )}
        </main>
      </div>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addTask}
      />
    </div>
  );
}

export default App;
