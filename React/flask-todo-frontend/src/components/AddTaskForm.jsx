import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const AddTaskForm = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("medium");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");

  const handleSubmit = () => {
    if (!newTask.trim()) return;
    
    const taskData = {
      name: newTask,
      priority: newTaskPriority,
      due_date: newTaskDueDate || null
    };

    onAddTask(taskData);
    
    // Reset form
    setNewTask('');
    setNewTaskPriority('medium');
    setNewTaskDueDate('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Task</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          onKeyPress={handleKeyPress}
        />
        <select
          value={newTaskPriority}
          onChange={e => setNewTaskPriority(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <input
          type="date"
          value={newTaskDueDate}
          onChange={e => setNewTaskDueDate(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
        >
          <Plus size={20} />
          Add Task
        </button>
      </div>
    </div>
  );
};

export default AddTaskForm;