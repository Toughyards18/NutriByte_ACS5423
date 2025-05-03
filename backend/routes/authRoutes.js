// File: backend/routes/authRoutes.js
// This file defines the authentication routes for user registration and login.

import express from 'express'; // Import express
import { register, login } from '../controllers/authController.js'; // Import authentication controller
import protect from '../middleware/authMiddleware.js'; // Import authentication middleware

// Define routes
const router = express.Router();
router.post('/register', register);
router.post('/login', login);

export default router;

