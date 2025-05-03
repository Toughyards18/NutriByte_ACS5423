// File: backend/models/DailyLogSchema.js
// This model defines the DailyLog schema for user daily food intake logs.

import mongoose from 'mongoose';

const dailyLogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to User model
        required: true
    },
    date: {
        type: String, // We'll use ISO string format like '2024-05-02'
        required: true
    },
    foods: [
        {
            fdcId: Number,
            description: String,
            brandOwner: String,
            servingSize: Number,
            servingSizeUnit: String,
            nutrients: [
                {
                    nutrientName: String,
                    amount: Number,
                    nutrientUnit: String
                }
            ]
        }
    ],
    notes: {
        type: String,
        default: ''
    }
}, { timestamps: true });

const DailyLog = mongoose.model('DailyLog', dailyLogSchema);

export default DailyLog;

