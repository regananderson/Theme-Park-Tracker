const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parkSchema = new Schema({
    name: {type: String, required: true},
    description: String,
    location: String,
    img: String,
    comment: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}
    ],
    // user: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Park', parkSchema);