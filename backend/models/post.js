const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title: {type: String, required: true},
    type: {type: String, required: true},
    content: {type: String, required: true},
    img: {type: String},
    userId: {type: String, required: true},
    likes: {type: Number},
    dislikes: {type: Number},
    usersLiked: {type: Array},
    usersDisliked: {type: Array},
});

module.exports = mongoose.model('Post', postSchema);