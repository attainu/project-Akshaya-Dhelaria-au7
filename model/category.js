const mongoose = require('mongoose')

var categorySchema  = mongoose.Schema({
    Category:{
        type:String,
        required:true
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
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'signup'
    }
},
    {
        versionKey:false
    }
)

module.exports = mongoose.model('category' , categorySchema , 'category')