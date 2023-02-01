//require dependencies
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const parkRouter = require('./controllers/park');
const usersRouter = require('./controllers/users');

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
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
}));

// app.use((req, res, next) => {
//     console.log(req.session)
//     next();
// })

//authentication middleware
function isAuthenticated(req, res, next) {
    if(!req.session.userId) {
        res.locals.user = null;
        return res.redirect('/login');
    }
    res.locals.user = req.session.userId;
    next();
};

//mount routes
app.get('/', (req, res) => res.render('home.ejs'));

app.use(usersRouter);
app.use(isAuthenticated, parkRouter);


//tell app to listen on designated port
app.listen(PORT, () => {
    console.log(`Express app is listening on port: ${PORT}`)
})