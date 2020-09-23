const signupSchema = require('../model/signup_schema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendEmail = require('../utils/nodeMailer')

const controller = {
    signup: async (req,res) => {
        let hashedPassword = bcrypt.hashSync(req.body.Password,10)
        const otp = Math.floor(100000 + Math.random() * 900000)
        let eachUser = new signupSchema({
            Name:req.body.Name,
            Email:req.body.Email,
            Password:hashedPassword,
            OTP: otp
        })  
        // if(!Name || !Email || !Password){
        //     console.log("Invalid")
        // }
        // await eachUser.save()
        const message = eachUser.OTP
    
        try {
            sendEmail({
                email:eachUser.Email,
                message
            })
        }catch (error) {
            res.status(500).json({
                message:"Couldn't send the email",
                errors:error.message
            })
        }
        await eachUser.save()
        .then((val)=>{
            res.status(201).json({
                message:`Please verify the otp which is sent to the given email address ${eachUser.Email}`
            })
        })
        .catch((err)=>{
            console.log("Error is : ",JSON.stringify(err).indexOf("This email already exists"))
            if(JSON.stringify(err).indexOf("This email already exists")>-1){
                res.status(400).json({
                    error:"Email already exists!!!"
                })
            }
            else{
                console.log("Error while signing up the user ",JSON.stringify(err))
                    res.status(500).json({
                    message:"Error in creating user",
                    error:err.message
                })
            }
        })
    },

    verifyOtp: (req,res) => {
        signupSchema.findOne({
            OTP:req.body.OTP
        })
        .then((data) => {
            if(data == null){
                res.status(403).json({
                    message:"Please enter valid OTP"
                })
            }
            else{
                res.status(200).json({
                    message:"Email verified successfully"
                })
            }
        })
        .catch((err)=>{
            console.log("Error while verifying otp ",JSON.stringify(err))
            res.status(500).json({
                message:"Cannot verify otp",
                error:err.message
            })
        })
    },

    login: async (req,res) => {
        await signupSchema.findOne({
            Email:req.body.Email
        })
        .then((data) => {
            console.log("Data in login is" , data)
            if(data === null){
                res.status(401).json({
                    message:"Please check your email/password"
                })
            }
            let checkPassword = bcrypt.compareSync(req.body.Password,data.Password)
            console.log(req.body.Password,data.Password,checkPassword)
            if(checkPassword == true){
                const token = jwt.sign({
                    user_id:data._id,
                    Email:data.Email
                },"secret" , {
                    expiresIn:'24hr'
                })
                res.status(200).json({
                    message:"Successfully logged in",
                    tokenKey:token
                })
            }
            else{
                res.status(401).json({
                    message:"Invalid Password"
                })
            }
        })
        .catch((err)=>{
            console.log("Error while login done by user ",JSON.stringify(err))
            res.status(500).json({
                message:"Cannot log in",
                error:err.message
            })
        })
    }
}

module.exports =  controller;