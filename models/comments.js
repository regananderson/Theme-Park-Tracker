const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    comment: String,
})

module.exports = mongoose.model('Comment', commentSchema);