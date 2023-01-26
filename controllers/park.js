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

//create
router.post('/parks', (req, res) => {
    res.send(req.body)
});

module.exports = router;