from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)  # This allows React to connect to Flask

# Linked list muna for easy insertion and deletion (better one)
tasks = []
task_id_counter = 1

def get_task_by_id(task_id):
    """Helper function to find task by ID"""
    for task in tasks:
        if task['id'] == task_id:
            return task
    return None

# GET all tasks
@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)

# POST a new task with enhanced features
@app.route('/api/tasks', methods=['POST'])
def add_task():
    global task_id_counter
    data = request.get_json()
    
    # Validate required fields
    if not data or not data.get('name'):
        return jsonify({"error": "Task name is required"}), 400
    
    new_task = {
        "id": task_id_counter,
        "name": data['name'].strip(),
        "done": False,
        "priority": data.get('priority', 'medium'),  # low, medium, high
        "due_date": data.get('due_date'),  # ISO date string or None
        "created_at": datetime.now().isoformat(),
        "completed_at": None
    }
    
    # Validate priority
    if new_task['priority'] not in ['low', 'medium', 'high']:
        new_task['priority'] = 'medium'
    
    # Validate due_date format if provided
    if new_task['due_date']:
        try:
            datetime.fromisoformat(new_task['due_date'].replace('Z', '+00:00'))
        except ValueError:
            return jsonify({"error": "Invalid due_date format. Use ISO format (YYYY-MM-DD)"}), 400
    
    tasks.append(new_task)
    task_id_counter += 1
    
    return jsonify(new_task), 201

# PATCH to toggle task completion status (marking as done)
@app.route('/api/tasks/<int:task_id>', methods=['PATCH'])
def toggle_task_completion(task_id):
    task = get_task_by_id(task_id)
    if not task:
        return jsonify({"error": "Task not found"}), 404
    
    # Toggle completion status
    task['done'] = not task['done']
    
    # Set completed_at timestamp
    if task['done']:
        task['completed_at'] = datetime.now().isoformat()
    else:
        task['completed_at'] = None
    
    return jsonify(task)

# PUT to update task details (not even using GET and POST for this one)
@app.route('/api/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    task = get_task_by_id(task_id)
    if not task:
        return jsonify({"error": "Task not found"}), 404
    
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    # Update task name if provided
    if 'name' in data:
        if not data['name'].strip():
            return jsonify({"error": "Task name cannot be empty"}), 400
        task['name'] = data['name'].strip()
    
    # Update priority if provided
    if 'priority' in data:
        if data['priority'] in ['low', 'medium', 'high']:
            task['priority'] = data['priority']
    
    # Update due_date if provided
    if 'due_date' in data:
        if data['due_date']:
            try:
                datetime.fromisoformat(data['due_date'].replace('Z', '+00:00'))
                task['due_date'] = data['due_date']
            except ValueError:
                return jsonify({"error": "Invalid due_date format"}), 400
        else:
            task['due_date'] = None
    
    return jsonify(task)

# DELETE a task
@app.route('/api/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    global tasks
    task = get_task_by_id(task_id)
    if not task:
        return jsonify({"error": "Task not found"}), 404
    
    tasks = [task for task in tasks if task['id'] != task_id]
    return jsonify({"message": "Task deleted successfully"})

# GET task stats
@app.route('/api/tasks/stats', methods=['GET'])
def get_task_stats():
    total_tasks = len(tasks)
    completed_tasks = len([task for task in tasks if task['done']])
    active_tasks = total_tasks - completed_tasks
    
    # Overdue
    current_date = datetime.now().date()
    overdue_tasks = 0
    for task in tasks:
        if not task['done'] and task['due_date']:
            try:
                due_date = datetime.fromisoformat(task['due_date'].replace('Z', '+00:00')).date()
                if due_date < current_date:
                    overdue_tasks += 1
            except ValueError:
                continue
    
    # This arranges tasks by priority
    priority_counts = {'low': 0, 'medium': 0, 'high': 0}
    for task in tasks:
        if not task['done']:  # Only count active tasks
            priority_counts[task['priority']] += 1
    
    return jsonify({
        "total": total_tasks,
        "completed": completed_tasks,
        "active": active_tasks,
        "overdue": overdue_tasks,
        "by_priority": priority_counts
    })

# DELETE all completed tasks
@app.route('/api/tasks/cleanup', methods=['DELETE'])
def cleanup_completed_tasks():
    global tasks
    initial_count = len(tasks)
    tasks = [task for task in tasks if not task['done']]
    deleted_count = initial_count - len(tasks)
    
    return jsonify({
        "message": f"Deleted {deleted_count} completed tasks",
        "deleted_count": deleted_count
    })

# Error handlers for 404 and 500

@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Endpoint not found"}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    # Sample data (testing)
    sample_tasks = [
        {
            "id": 1,
            "name": "Learn Flask and React",
            "done": False,
            "priority": "high",
            "due_date": "2025-06-25",
            "created_at": datetime.now().isoformat(),
            "completed_at": None
        },
        {
            "id": 2,
            "name": "Build a todo app",
            "done": True,
            "priority": "medium",
            "due_date": None,
            "created_at": datetime.now().isoformat(),
            "completed_at": datetime.now().isoformat()
        },
        {
            "id": 3,
            "name": "Add more features",
            "done": False,
            "priority": "low",
            "due_date": "2025-06-30",
            "created_at": datetime.now().isoformat(),
            "completed_at": None
        }
    ]
    
    tasks.extend(sample_tasks)
    task_id_counter = 4
    
    app.run(debug=True)