const express = require("express");
const habitModel = require('../models/habit');
const app = express();

app.get('/api/habits', async (request, response) => {
    const habits = await habitModel.find({});

    try {
        response.send(habits);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.post('/api/habit', async (request, response) => {
    const habit = new habitModel(request.body);

    try {
        await habit.save();
        response.send(habit);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.patch('/api/habit/:id', async (request, response) => {
    try {
        const habit = await habitModel.findByIdAndUpdate(request.params.id, request.body);

        await habit.save();
        response.send(habit);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.delete('/api/habit/:id', async (request, response) => {
    try {
        const habit = await habitModel.findByIdAndDelete(request.params.id);

        if (!habit) response.status(404).send('No habit found');

        response.status(200).send();
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = app;