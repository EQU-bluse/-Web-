import { useState } from 'react';
import { Priority, TaskStatus } from '../types';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: {
    title: string;
    description: string;
    assignee: string;
    dueDate: string;
    priority: Priority;
    status: TaskStatus;
  }) => void;
}

export const AddTaskModal = ({ isOpen, onClose, onAddTask }: AddTaskModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignee: '',
    dueDate: '',
    priority: Priority.MEDIUM as Priority,
    status: TaskStatus.TODO as TaskStatus
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.assignee || !formData.dueDate) {
      return;
    }
    onAddTask(formData);
    setFormData({
      title: '',
      description: '',
      assignee: '',
      dueDate: '',
      priority: Priority.MEDIUM,
      status: TaskStatus.TODO
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>新增任务</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>标题 *</label>
            <input
              type="text"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              placeholder="请输入任务标题"
              required
            />
          </div>
          <div className="form-group">
            <label>描述</label>
            <textarea
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              placeholder="请输入任务描述"
              rows={3}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>负责人 *</label>
              <input
                type="text"
                value={formData.assignee}
                onChange={e => setFormData({ ...formData, assignee: e.target.value })}
                placeholder="请输入负责人"
                required
              />
            </div>
            <div className="form-group">
              <label>截止日期 *</label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>优先级</label>
              <select
                value={formData.priority}
                onChange={e => setFormData({ ...formData, priority: e.target.value as Priority })}
              >
                <option value={Priority.HIGH}>高</option>
                <option value={Priority.MEDIUM}>中</option>
                <option value={Priority.LOW}>低</option>
              </select>
            </div>
            <div className="form-group">
              <label>状态</label>
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value as TaskStatus })}
              >
                <option value={TaskStatus.TODO}>待办</option>
                <option value={TaskStatus.IN_PROGRESS}>进行中</option>
                <option value={TaskStatus.DONE}>已完成</option>
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              取消
            </button>
            <button type="submit" className="btn-primary">
              创建任务
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
