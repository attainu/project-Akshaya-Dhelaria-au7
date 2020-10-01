const mongoose = require("mongoose")
const Schema = mongoose.Schema

var categorySchema  = new Schema({
    Category:{
        type:String,
        required:true,
        unique:true
    }
},
    {
        versionKey:false,
        timestamp:true
    }
)

module.exports = mongoose.model('category' , categorySchema , 'category')