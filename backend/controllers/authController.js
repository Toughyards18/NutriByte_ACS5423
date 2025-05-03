// file: backend/Controllers/authController.js
// This file contains the authentication controller for user registration and login. 
// It handles the logic for creating new users, validating credentials, and generating JWT tokens for authenticated users. 
// The controller interacts with the User model to perform database operations and uses bcrypt for password hashing and JWT for token generation.
import jwt from 'jsonwebtoken';
import User from '../models/UserSchema.js'; // Import the User model
import bcrypt from 'bcryptjs';

export const register = async (req, res) =>
{
    try
    {
        const { username, email, password } = req.body;
        // const salt = await bcrypt.genSalt(12);
        // const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ username, email, password });
        res.status(201).json({ message: 'User created' });
    } catch (error)
    {

        console.error("Registration error:", error);
        if (error.code === 11000)  // <--- Catch Duplicate Username or Email
        {
            const field = Object.keys(error.keyPattern)[0];
            const errorMessage = `Duplicate ${field} exists.`;
            return res.status(400).json({ message: errorMessage });
        }
        res.status(400).json({ message: 'Registration failed', error: error.message });
    }
};

export const login = async (req, res) =>
{
    try
    {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (process.env.DB_LOGGING === "true")
        {
            const match = await user.matchPassword(password);
            const salt = await bcrypt.genSalt(12);
            const hashedPassword = await bcrypt.hash(password, salt);
            console.log("Log In user:", user, email, password);
            console.log("bcrypt:", hashedPassword);
        }


        if (user && (await user.matchPassword(password))) 
        {
            const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '7d' });
            res.json({ token, user: { id: user._id, username: user.username, email: user.email, macroGoals: user.macroGoals } });
        }
        else
        {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error)
    {
        console.error("Login error:", error);
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};

