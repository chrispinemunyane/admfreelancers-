const Task = require('../models/Task');

// Create a new task
const createTask = async (req, res) => {
  const { title, description, assignedTo, deadline } = req.body;

  if (!title || !assignedTo || !deadline) {
    return res.status(400).json({ msg: 'Please fill in all fields' });
  }

  try {
    const newTask = new Task({
      title,
      description,
      assignedTo,
      deadline,
      createdBy: req.user._id, // Logged-in admin or user who created the task
    });

    await newTask.save();
    res.json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update task status
const updateTaskStatus = async (req, res) => {
  const { taskId, status } = req.body;

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    task.status = status;
    await task.save();

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = { createTask, updateTaskStatus };
