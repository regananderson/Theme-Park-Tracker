const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parkSchema = new Schema({
    name: {type: String, required: true},
    description: String,
    location: String,
    img: String,
});

module.exports = mongoose.model('Park', parkSchema);