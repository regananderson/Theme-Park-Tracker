const { application } = require('express');
const express = require('express');
const router = express.Router();
const data = require('../data');
const Park = require('../models/park');
/*
    1) .get()
    2) .post()
    3) .put()
    4) .delete()
*/
//INDUCES

//seed
router.get('/parks/seed', (req, res) => {
    Park.create(data, (err, park) => {
        res.redirect('/parks')
    });
});

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

//destroy
router.delete('/parks/:id', (req, res) => {
    Park.findByIdAndDelete(req.params.id, (err, data) => {
       res.redirect('/parks') ;
    });
});

//update
router.put('/parks/:id', (req, res) => {
    Park.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        },
        (error, updatedPark) => {
            res.redirect(`/parks/${req.params.id}`)
        }
    )
})


//create
router.post('/parks', (req, res) => {
    Park.create(req.body, (error, createdPark) => {
        res.redirect('/parks')
    });
});

//edit
router.get('/parks/:id/edit', (req, res) => {
    Park.findById(req.params.id, (error, foundPark) => {
        res.render('edit.ejs', {
            park: foundPark,
        });
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