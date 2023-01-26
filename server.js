//require dependencies
const express = require('express');
const mongoose = require('mongoose');

//initialize express app
const app = express();

//configure settings
require('dotenv').config();
const PORT = process.env.PORT;

//configure database
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DATABASE_URL);

//database connection error/success
const db = mongoose.connection;

db.on('error',(err) => {
    console.log(err.message + ' is mongo not running?');
});
db.on('connected', () => {
    console.log('mongo connected');
});
//mount middleware

//mount routes

//tell app to listen on designated port
app.listen(PORT, () => {
    console.log(`Express app is listening on port: ${PORT}`)
})