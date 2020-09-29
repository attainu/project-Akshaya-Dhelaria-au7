const mongoose = require("mongoose")
const Schema = mongoose.Schema

var categorySchema  = Schema({
    Category:{
        type:String,
        required:true,
        unique:true
    },
    Title:{
        type:String,
        require:true
    },
    Link:{
        type:String,
        require:true,
        unique:true
    },
    posted_by:{
        type:Schema.Types.ObjectId,
        ref:'signup',
        required:true
    }
},
    {
        versionKey:false,
        timestamp:true
    }
)

module.exports = mongoose.model('category' , categorySchema , 'category')