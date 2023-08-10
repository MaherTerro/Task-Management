require('dotenv').config();
const routes = require('./Routes/routes');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', routes)
app.listen(5000, () => {
    console.log(`Server Started at ${5000}`)
})