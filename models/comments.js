const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    comment: String,
    likes: Number,
    dislikes: Number,
})

module.exports = mongoose.model('Comment', commentSchema);