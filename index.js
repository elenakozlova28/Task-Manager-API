// Title: Task Manager API (Node.js + Express)

const express = require('express');
const app = express();
const port = 3000;





app.use(express.json());

let tasks = [];

// Get all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Get a task by ID
app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('Task not found');
    res.json(task);
});

// Create a new task
app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    if (!title) return res.status(400).send('Title is required');
    
    const newTask = {
        id: tasks.length + 1,
        title,
        description: description || '',
        completed: false
    };
    
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Update a task
app.put('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('Task not found');
    
    const { title, description, completed } = req.body;
    if (title) task.title = title;
    if (description) task.description = description;
    if (completed !== undefined) task.completed = completed;
    
    res.json(task);
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (taskIndex === -1) return res.status(404).send('Task not found');
    
    tasks.splice(taskIndex, 1);
    res.send('Task deleted');
});

// Mark a task as completed
app.patch('/tasks/:id/complete', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('Task not found');
    
    task.completed = true;
    res.json(task);
});

app.listen(port, () => {
    console.log(`Task Manager API is running on http://localhost:${port}`);
});
