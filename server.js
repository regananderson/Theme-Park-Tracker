//require dependencies
const express = require('express');
const mongoose = require('mongoose');
const parkRouter = require('./controllers/park');
const methodOverride = require('method-override');

//initialize express app
const app = express();

//configure settings
require('dotenv').config();
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

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
//body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static('public'));


//mount routes
app.get('/', (req, res) => res.render('home.ejs')
);

app.use(parkRouter);


//tell app to listen on designated port
app.listen(PORT, () => {
    console.log(`Express app is listening on port: ${PORT}`)
})