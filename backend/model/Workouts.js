// model/Workouts.js
const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // Store user ID as a string
    date: { type: Date, required: true },
    steps: { type: Number, required: true },
    heartRate: { type: Number, required: true },
    weight: { type: Number, required: true }
});

const WorkoutModel = mongoose.model('workouts', WorkoutSchema);

module.exports = WorkoutModel;
