const {Schema, model} = require('mongoose')

const signupSchema = new Schema({
    Name:{
        type:String,
        required:true,
        min:5,
        max:256
    },
    Email:{
        type:String,
        required:true,
        // unique:true
    },
    Password:{
        type:String,
        required:true,
        min:5,
        max:256
    },
    OTP:{
        type:Number
    }
},
    {
        versionKey:false
    }
)

const signup = model('signup' , signupSchema, 'signup')

module.exports = signup;