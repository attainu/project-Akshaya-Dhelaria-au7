const mongoose = require('mongoose')

var categorySchema  = mongoose.Schema({
    Category:{
        type:String,
        required:true
    },
    Link:{
        type:String,
        require:true,
        unique:true
    },
    Id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'signups'
    }
})

module.exports = mongoose.model('category' , categorySchema , 'category')