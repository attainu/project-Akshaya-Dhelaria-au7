const mongoose = require('mongoose')

const signupSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true,
        min:5,
        max:256
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true,
        min:5,
        max:256
    }
})

const signup = mongoose.model('signup' , signupSchema)

module.exports = signup;