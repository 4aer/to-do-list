import React, { useEffect, useState } from 'react';
import { Plus, Check, Trash2, Edit3, X, Calendar, Filter, Search } from 'lucide-react';
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("medium");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error('Error fetching tasks:', err));
  }, []);

  const addTask = () => {
    if (!newTask.trim()) return;
    
    const taskData = {
      name: newTask,
      priority: newTaskPriority,
      due_date: newTaskDueDate || null
    };

    fetch('http://127.0.0.1:5000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData)
    })
    .then(res => res.json())
    .then(task => {
      setTasks([...tasks, task]);
      setNewTask('');
      setNewTaskPriority('medium');
      setNewTaskDueDate('');
    })
    .catch(err => console.error('Error adding task:', err));
  };

  const completeTask = (id) => {
    fetch(`http://127.0.0.1:5000/api/tasks/${id}`, {
      method: 'PATCH'
    })
    .then(res => res.json())
    .then(updated => {
      setTasks(tasks.map(task =>
        task.id === id ? updated : task
      ));
    })
    .catch(err => console.error('Error completing task:', err));
  };

  const deleteTask = (id) => {
    fetch(`http://127.0.0.1:5000/api/tasks/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      setTasks(tasks.filter(task => task.id !== id));
    })
    .catch(err => console.error('Error deleting task:', err));
  };

  const startEditing = (task) => {
    setEditingTask(task.id);
    setEditText(task.name);
  };

  const saveEdit = (id) => {
    if (!editText.trim()) return;

    fetch(`http://127.0.0.1:5000/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editText })
    })
    .then(res => res.json())
    .then(updated => {
      setTasks(tasks.map(task =>
        task.id === id ? updated : task
      ));
      setEditingTask(null);
      setEditText('');
    })
    .catch(err => console.error('Error updating task:', err));
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setEditText('');
  };

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

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'active' && !task.done) ||
                         (filter === 'completed' && task.done);
    const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.done).length,
    active: tasks.filter(t => !t.done).length,
    overdue: tasks.filter(t => !t.done && isOverdue(t.due_date)).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            My Todo List
          </h1>
          <p className="text-gray-600">Stay organized and productive</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="text-2xl font-bold text-blue-600">{taskStats.total}</div>
            <div className="text-sm text-gray-600">Total Tasks</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="text-2xl font-bold text-green-600">{taskStats.completed}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="text-2xl font-bold text-orange-600">{taskStats.active}</div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="text-2xl font-bold text-red-600">{taskStats.overdue}</div>
            <div className="text-sm text-gray-600">Overdue</div>
          </div>
        </div>

        {/* Add Task Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Task</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={newTask}
              onChange={e => setNewTask(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              onKeyPress={e => e.key === 'Enter' && addTask()}
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
              onClick={addTask}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
            >
              <Plus size={20} />
              Add Task
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search tasks..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'active', 'completed'].map(filterType => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                    filter === filterType
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {filterType}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tasks List */}
        <div className="bg-white rounded-xl shadow-lg border">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Filter size={20} />
              Tasks ({filteredTasks.length})
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            {filteredTasks.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <div className="text-4xl mb-4">📝</div>
                <p className="text-lg">No tasks found</p>
                <p className="text-sm">Add a new task to get started!</p>
              </div>
            ) : (
              filteredTasks.map(task => (
                <div
                  key={task.id}
                  className={`p-4 transition-all hover:bg-gray-50 ${
                    task.done ? 'opacity-75' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Complete/Uncomplete Button */}
                    <button
                      onClick={() => completeTask(task.id)}
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
                      {editingTask === task.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={editText}
                            onChange={e => setEditText(e.target.value)}
                            className="flex-1 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            onKeyPress={e => e.key === 'Enter' && saveEdit(task.id)}
                            autoFocus
                          />
                          <button
                            onClick={() => saveEdit(task.id)}
                            className="p-1 text-green-600 hover:bg-green-100 rounded"
                          >
                            <Check size={16} />
                          </button>
                          <button
                            onClick={cancelEdit}
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
                              className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(
                                task.priority
                              )}`}
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
                    {editingTask !== task.id && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => startEditing(task)}
                          className="p-2 text-gray-600 hover:bg-blue-100 hover:text-blue-600 rounded transition-colors"
                          title="Edit task"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="p-2 text-gray-600 hover:bg-red-100 hover:text-red-600 rounded transition-colors"
                          title="Delete task"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p>Built with Flask + React • Stay productive!</p>
        </div>
      </div>
    </div>
  );
}

export default App;