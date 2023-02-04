const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

//sign up users
router.get('/signup', (req, res) => {
    res.render('signup.ejs', {
        error: null,
        tabTitle: "Sign up",
    });
});

router.post('/signup', (req, res) => {
    let error = null;

    if (req.body.password !== req.body.passwordConf) {
        error = 'Password and confirmation must match to continue';
        return res.render('signup.ejs', {
            error
        })
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    req.body.password = hashedPassword;
    User.create(req.body, (err, newUser) => {
        req.session.userId = newUser._id;
        res.redirect('/parks');
    });
});

//login users
router.get('/login', (req, res) => {
    res.render('login.ejs', {
        error: null,
        tabTitle: "Login",
    });
});

router.post('/login', (req, res) => {
    const error = 'Email and password combination not found';
    User.findOne({
        email: req.body.email
    }, (err, foundUser) => {
        if (!foundUser) {
            return res.render('login.ejs', {
                error,

            });
        }
        const isMatched = bcrypt.compareSync(req.body.password, foundUser.password);

        if (!isMatched) {
            return res.render('login.ejs', {
                error
            });
        }
        req.session.userId = foundUser._id;
        res.redirect('/parks');
    });
});

//logout users
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/')
    });
});

module.exports = router;