// File: backend/routes/logRoutes.js
// This file defines the routes for food log management, including getting logs, creating, updating, and deleting logs.
import express from 'express'; // Import express for routing
import { getLogs, getLogByDate, createLog, updateLog, deleteLog } from '../controllers/logController.js'; // Import log controller functions
import protect from '../middleware/authMiddleware.js'; // Import authentication middleware

const router = express.Router();
router.use(protect); // Apply authentication middleware to all routes
router.get('/', getLogs); // Get all logs
router.get('/:date', getLogByDate); // Get logs by date
router.post('/', createLog); // Create a new log
router.put('/:logId', updateLog); // Update an existing log
router.delete('/:logId', deleteLog);

export default router;

