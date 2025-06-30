import React from 'react';
import { Filter } from 'lucide-react';
import TaskItem from './TaskItem';

const TasksList = ({ 
  tasks, 
  editingTask, 
  editText, 
  setEditText,
  onCompleteTask,
  onDeleteTask,
  onStartEditing,
  onSaveEdit,
  onCancelEdit 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Filter size={20} />
          Tasks ({tasks.length})
        </h2>
      </div>
      <div className="divide-y divide-gray-100">
        {tasks.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <div className="text-4xl mb-4">📝</div>
            <p className="text-lg">No tasks found</p>
            <p className="text-sm">Add a new task to get started!</p>
          </div>
        ) : (
          tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              isEditing={editingTask === task.id}
              editText={editText}
              setEditText={setEditText}
              onComplete={onCompleteTask}
              onDelete={onDeleteTask}
              onStartEditing={onStartEditing}
              onSaveEdit={onSaveEdit}
              onCancelEdit={onCancelEdit}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TasksList;