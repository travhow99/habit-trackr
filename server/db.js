const express = require("express");
const mongoose = require('mongoose');
const habitRoute = require('./routes/habitRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());

const uri = `mongodb+srv://${process.env.ATLAS_UN}:${process.env.ATLAS_PW}@habit-trackr.g6yvs.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const params = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
};

mongoose.connect(uri, params)
    .then(() => console.log('connected to db'))
    .catch((err) => console.log(`Error connecting to database: \n${err}`));

app.use(habitRoute);

app.listen(3000, () => {
    console.log("Server is running...");
});
