import { useState } from 'react';
import { Priority } from '../types';
import { assignees } from '../data/mockTasks';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (title: string, description: string, assignee: string, dueDate: string, priority: Priority) => void;
}

export function AddTaskModal({ isOpen, onClose, onAdd }: AddTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState(assignees[0]);
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState(Priority.MEDIUM);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title, description, assignee, dueDate, priority);
    setTitle('');
    setDescription('');
    setDueDate('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">新增任务</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">标题 *</label>
              <input
                type="text"
                className="form-input"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="输入任务标题"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">描述</label>
              <textarea
                className="form-textarea"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="输入任务描述"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">负责人</label>
                <select
                  className="form-select"
                  value={assignee}
                  onChange={e => setAssignee(e.target.value)}
                >
                  {assignees.map(a => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">截止日期</label>
                <input
                  type="date"
                  className="form-input"
                  value={dueDate}
                  onChange={e => setDueDate(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">优先级</label>
              <select
                className="form-select"
                value={priority}
                onChange={e => setPriority(e.target.value as Priority)}
              >
                <option value={Priority.HIGH}>高</option>
                <option value={Priority.MEDIUM}>中</option>
                <option value={Priority.LOW}>低</option>
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              取消
            </button>
            <button type="submit" className="btn-submit">
              添加任务
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
