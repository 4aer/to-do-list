import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import StatsCards from './components/StatsCards';
import AddTaskForm from './components/AddTaskForm';
import SearchAndFilter from './components/SearchAndFilter';
import TasksList from './components/TasksList';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
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

  const addTask = (taskData) => {
    fetch('http://127.0.0.1:5000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData)
    })
    .then(res => res.json())
    .then(task => {
      setTasks([...tasks, task]);
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
    overdue: tasks.filter(t => !t.done && t.due_date && new Date(t.due_date) < new Date()).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header />
        
        <StatsCards taskStats={taskStats} />
        
        <AddTaskForm onAddTask={addTask} />
        
        <SearchAndFilter 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filter={filter}
          setFilter={setFilter}
        />
        
        <TasksList 
          tasks={filteredTasks}
          editingTask={editingTask}
          editText={editText}
          setEditText={setEditText}
          onCompleteTask={completeTask}
          onDeleteTask={deleteTask}
          onStartEditing={startEditing}
          onSaveEdit={saveEdit}
          onCancelEdit={cancelEdit}
        />
        
        <Footer />
      </div>
    </div>
  );
}

export default App;