const express = require("express");
const habitModel = require('../models/habit');
const app = express();

app.get('/habits', async (request, response) => {
    const habits = await habitModel.find({});

    try {
        response.send(habits);
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = app;