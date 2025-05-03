// file: backend/Controllers/logController.js
// This file contains the controller functions for managing daily logs.
// It includes functions to get all logs, get a log by date, create a new log, update an existing log, and delete a log.
// The controller interacts with the DailyLog model to perform database operations.

import DailyLog from '../models/DailyLogSchema.js';

export const getLogs = async (req, res) =>
{
    const logs = await DailyLog.find({ user: req.user.id }); // use user
    res.json(logs);
};

export const getLogByDate = async (req, res) =>
{
    const { date } = req.params;
    const log = await DailyLog.findOne({ user: req.user.id, date }); // use user
    res.json(log);
};

export const createLog = async (req, res) =>
{
    const log = await DailyLog.create({ user: req.user.id, ...req.body }); // use user
    res.status(201).json(log);
};

export const updateLog = async (req, res) =>
{
    const log = await DailyLog.findByIdAndUpdate(req.params.logId, req.body, { new: true });
    res.json(log);
};

export const deleteLog = async (req, res) =>
{
    await DailyLog.findByIdAndDelete(req.params.logId);
    res.json({ message: 'Log deleted' });
};
