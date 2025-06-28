# Todo List Application

A full-stack task management application built with **React** (frontend) and **Flask** (backend), featuring a clean, responsive design and comprehensive task management capabilities.

## ✨ Features

### Task Management
- ✅ **CRUD Operations**: Create, read, update, and delete tasks
- 🎯 **Priority Levels**: Organize tasks with High, Medium, and Low priority
- 📅 **Due Date Tracking**: Set due dates with automatic overdue detection
- ✏️ **Inline Editing**: Edit task names directly in the interface
- ✔️ **Task Completion**: Mark tasks as complete/incomplete with visual feedback

### User Interface
- 🔍 **Real-time Search**: Find tasks instantly as you type
- 🎛️ **Smart Filtering**: Filter by All, Active, or Completed tasks
- 📊 **Dashboard Stats**: View total, completed, active, and overdue task counts
- 🎨 **Modern Design**: Clean gradient UI with smooth animations
- 📱 **Responsive Layout**: Works perfectly on desktop, tablet, and mobile

### Visual Indicators
- 🚨 **Overdue Alerts**: Overdue tasks highlighted in red
- 🟥🟨🟩 **Priority Colors**: Color-coded priority badges
- ✨ **Hover Effects**: Interactive elements with smooth transitions
- 📋 **Visual Completion**: Strikethrough text for completed tasks

## 🛠️ Tech Stack

### Frontend
- **React** - Modern React with Hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful SVG icons

### Backend
- **Flask** - Lightweight Python web framework
- **Flask-CORS** - Cross-Origin Resource Sharing support
- **Python** - High-level programming language

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js**
- **Python**
- **npm**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/4aer/to-do-list.git
   cd to-do-list
   ```

2. **Set up the Backend (Flask)**
   ```bash
   # Create a virtual environment
   python -m venv venv
   
   # Activate virtual environment
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   
   # Install Python dependencies
   pip install flask flask-cors
   
   # Run the Flask server
   python app.py
   ```
   The Flask server will start on `http://127.0.0.1:5000`

3. **Set up the Frontend (React)**
   ```bash
   # In a new terminal, install Node dependencies
   npm install
   
   # Start the development server
   npm run dev
   ```
   The React app will start on `http://localhost:5173`

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tasks` | Retrieve all tasks |
| `POST` | `/api/tasks` | Create a new task |
| `PATCH` | `/api/tasks/:id` | Toggle task completion status |
| `PUT` | `/api/tasks/:id` | Update task details |
| `DELETE` | `/api/tasks/:id` | Delete a specific task |
| `GET` | `/api/tasks/stats` | Get task statistics |
| `DELETE` | `/api/tasks/cleanup` | Delete all completed tasks |

## 🎨 Features in Detail

### Task Priority System
- **High Priority**: Red badge with urgent styling
- **Medium Priority**: Yellow badge for moderate importance
- **Low Priority**: Green badge for less urgent tasks

### Due Date Management
- Set optional due dates for tasks
- Automatic detection of overdue tasks
- Visual indicators for overdue items
- Calendar icon for date display

### Search and Filter
- **Search**: Real-time text search across task names
- **Filter Options**:
  - **All**: Show all tasks
  - **Active**: Show only incomplete tasks
  - **Completed**: Show only finished tasks

### Statistics Dashboard
Real-time counters showing:
- Total number of tasks
- Completed tasks count
- Active (incomplete) tasks
- Overdue tasks count
