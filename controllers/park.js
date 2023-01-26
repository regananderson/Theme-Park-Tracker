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
//new
router.get('/parks/new', (req, res) => {
    res.render('new.ejs')
});

//create
router.post('/parks', (req, res) => {
    Park.create(req.body, (error, createdPark) => {
        res.send(createdPark)
    });
});

module.exports = router;