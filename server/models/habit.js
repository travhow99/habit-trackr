const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        default: 'uncategorized',
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

const Habit = mongoose.model('Habit', HabitSchema);

module.exports = Habit;