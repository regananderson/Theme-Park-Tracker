const { application } = require('express');
const express = require('express');
const router = express.Router();
const data = require('../data');
const commentData = require('../comment_data'); //USE THIS DATA FOR COMMENT ROUTE
const Park = require('../models/park');
const Comment = require('../models/comments');

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
//comment
router.put('/parks/:id/comments', (req, res) => {
    Comment.create(req.body, (err, createdComment) => {
        Park.findByIdAndUpdate(
            req.params.id, 
            {$push: {comment: createdComment}},
            {new: true}
            )
        .then(newComment => {
            res.redirect(`/parks/${req.params.id}`)
        })
        .catch(err => res.json(err))

    });
    });


//create
router.post('/parks', (req, res) => {
    Park.create(req.body, (error, createdPark) => {
        res.redirect('/parks')
    });
});

//edit
router.get('/parks/:id/edit', (req, res) => {
    Park.findById(req.params.id, (error, foundPark) => {
        console.log(foundPark)
        res.render('edit.ejs', {
            park: foundPark,
        });
    });
});


//show
router.get('/parks/:id', (req, res) => {
    // Park.findOne({_id: req.params.id}, (err, foundPark) => {
    //     console.log(foundPark)
    //     Comment.find().where('_id').in(foundPark.comments).exec((err, comments) => {
    //         console.log(comments)
    //         res.render('show.ejs', {
    //             park: foundPark,
    //             comments: comments
    //         });

    //     });
    // });
    Park.findOne({_id: req.params.id}).populate('comment').exec((err, foundPark) => {
        console.log(foundPark)
        res.render('show.ejs', {
            park: foundPark,
        });
    });
});

module.exports = router;