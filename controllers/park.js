const { application } = require('express');
const express = require('express');
const router = express.Router();
// const data = require('../data');
const Park = require('../models/park');
/*
    1) .get()
    2) .post()
    3) .put()
    4) .delete()
*/
//INDUCES

//index
router.get('/parks', (req, res) => {
    Park.find({},(error, allParks) => {
        res.render('index.ejs', {
            parks: allParks,
        });
    });
});

//new
router.get('/parks/new', (req, res) => {
    res.render('new.ejs')
});

//create
router.post('/parks', (req, res) => {
    Park.create(req.body, (error, createdPark) => {
        res.redirect('/parks')
    });
});

//show
router.get('/parks/:id', (req, res) => {
    Park.findById(req.params.id, (err, foundPark) => {
        res.render('show.ejs', {
            park: foundPark,
        });
    });
});

module.exports = router;