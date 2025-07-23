import React, { useState } from 'react';

const ProductivityPlanner = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    const addTask = () => {
        if (newTask.trim()) {
            setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
            setNewTask('');
        }
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const removeTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <div className="planner-page productivity-planner-page">
            <div className="planner-header">
                <h1>Productivity Planner</h1>
                <p>Organize tasks, set goals, and boost your efficiency with smart scheduling and progress tracking.</p>
            </div>

            <div className="planner-content">
                <div className="task-input-section">
                    <div className="input-group">
                        <input
                            type="text"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            placeholder="Add a new task..."
                            onKeyPress={(e) => e.key === 'Enter' && addTask()}
                        />
                        <button onClick={addTask} className="add-task-btn">Add Task</button>
                    </div>
                </div>

                <div className="tasks-section">
                    <h2>Your Tasks</h2>
                    {tasks.length === 0 ? (
                        <div className="empty-state">
                            <p>No tasks yet. Add your first task above!</p>
                        </div>
                    ) : (
                        <div className="task-list">
                            {tasks.map(task => (
                                <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => toggleTask(task.id)}
                                    />
                                    <span className="task-text">{task.text}</span>
                                    <button onClick={() => removeTask(task.id)} className="remove-btn">
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="productivity-stats">
                    <h3>Progress</h3>
                    <p>Completed: {tasks.filter(t => t.completed).length} / {tasks.length} tasks</p>
                    {tasks.length > 0 && (
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{ width: `${(tasks.filter(t => t.completed).length / tasks.length) * 100}%` }}
                            ></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductivityPlanner;
