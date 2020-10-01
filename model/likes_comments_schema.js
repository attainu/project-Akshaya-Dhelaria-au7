const mongoose = require('mongoose');

const likeCommentSchema = new mongoose.Schema({
    Like:{
        type:Number
    },
    Comment:{
        type:String
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'signup'
    }
})

module.exports = mongoose.model('likes_and_comments' , likeCommentSchema , 'likes_and_comments')