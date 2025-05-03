// file: backend/models/UserSchema.js
// This file defines the User model for the application. 
// It includes fields for username, email, password hash, and macro goals (carbs, fat, protein).
// The model is used to interact with the MongoDB database and perform CRUD operations on user data.

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // hash will be stored here
    macroGoals: {
        carbsGoalGrams: { type: Number, default: 276 },
        fatGoalGrams: { type: Number, default: 73 },
        proteinGoalGrams: { type: Number, default: 111 }
    }
}, { timestamps: true });

userSchema.pre('save', async function (next)
{
    if (!this.isModified('password')) return next();

    try
    {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err)
    {
        next(err);
    }
});

userSchema.methods.matchPassword = async function (enteredPassword)
{
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;

