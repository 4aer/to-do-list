import React from 'react';
import { Check, Trash2, Edit3, X, Calendar } from 'lucide-react';

const TaskItem = ({ 
  task, 
  isEditing, 
  editText, 
  setEditText,
  onComplete,
  onDelete,
  onStartEditing,
  onSaveEdit,
  onCancelEdit 
}) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 border-red-300 text-red-800';
      case 'medium': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'low': return 'bg-green-100 border-green-300 text-green-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSaveEdit(task.id);
    }
  };

  return (
    <div className={`p-4 transition-all hover:bg-gray-50 ${task.done ? 'opacity-75' : ''}`}>
      <div className="flex items-center gap-4">
        {/* Complete/Uncomplete Button */}
        <button
          onClick={() => onComplete(task.id)}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
            task.done
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 hover:border-green-500'
          }`}
        >
          {task.done && <Check size={14} />}
        </button>

        {/* Task Content */}
        <div className="flex-1">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={editText}
                onChange={e => setEditText(e.target.value)}
                className="flex-1 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                onKeyPress={handleKeyPress}
                autoFocus
              />
              <button
                onClick={() => onSaveEdit(task.id)}
                className="p-1 text-green-600 hover:bg-green-100 rounded"
              >
                <Check size={16} />
              </button>
              <button
                onClick={onCancelEdit}
                className="p-1 text-red-600 hover:bg-red-100 rounded"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`font-medium ${
                    task.done
                      ? 'line-through text-gray-500'
                      : 'text-gray-800'
                  }`}
                >
                  {task.name}
                </span>
                <span
                  className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(task.priority)}`}
                >
                  {task.priority}
                </span>
              </div>
              {task.due_date && (
                <div className="flex items-center gap-1 text-sm">
                  <Calendar size={14} />
                  <span
                    className={
                      isOverdue(task.due_date) && !task.done
                        ? 'text-red-600 font-medium'
                        : 'text-gray-600'
                    }
                  >
                    Due: {formatDate(task.due_date)}
                    {isOverdue(task.due_date) && !task.done && ' (Overdue)'}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {!isEditing && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onStartEditing(task)}
              className="p-2 text-gray-600 hover:bg-blue-100 hover:text-blue-600 rounded transition-colors"
              title="Edit task"
            >
              <Edit3 size={16} />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-2 text-gray-600 hover:bg-red-100 hover:text-red-600 rounded transition-colors"
              title="Delete task"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;