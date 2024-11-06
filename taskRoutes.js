const express = require('express');
const router = express.Router();
const { createTask, updateTaskStatus } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a task (admin and user)
router.post('/create', authMiddleware('admin'), createTask);

// Update task status (admin and user)
router.patch('/update-status', authMiddleware('admin'), updateTaskStatus);

module.exports = router;
