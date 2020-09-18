const signupSchema = require('../model/signup_schema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const controller = {
    signup: (req,res) => {
        let hashedPassword = bcrypt.hashSync(req.body.Password,10)
        let eachUser = new signupSchema({
            Name: req.body.Name,
            Email:req.body.Email,
            Password: hashedPassword
        })
        eachUser.save()
        .then((data) => {
            res.json({
                message:"Successfully signed in"
            })
        })
        .catch((err)=>{
            console.log("Error while signup done by user ",JSON.stringify(err))
            res.json({
                error:err
            })
        })
    },

    login:(req,res) => {
        signupSchema.findOne({
            Email:req.body.Email
        })
        .then((data) => {
            if(data === null){
                res.status(401).json({
                    message:"Please check your email/password"
                })
            }
            let checkPassword = bcrypt.compareSync(req.body.Password,data.Password)
            if(checkPassword == true){
                const token = jwt.sign({
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