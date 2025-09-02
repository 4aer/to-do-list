# Todo List App

A simple task management application built to learn **React** and **Flask**.

## Features

- Create, edit, and delete tasks
- Mark tasks as complete/incomplete
- Set priority levels and due dates
- Search and filter tasks
- Basic task statistics

## Tech Stack

**Frontend:** React, Tailwind CSS  
**Backend:** Flask, Python

## Setup

### Backend
```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Install dependencies
pip install flask flask-cors

# Run server
python app.py
```

### Frontend
```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## Learning Goals

This project was created as a learning exercise to:
- Practice React hooks and component structure
- Learn Flask REST API development
- Understand frontend-backend communication
- Work with CORS and HTTP methods

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `PATCH /api/tasks/:id` - Toggle completion
- `GET /api/tasks/stats` - Get statistics
