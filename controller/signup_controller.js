const signupSchema = require('../model/signup_schema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const controller = {
    signup: async (req,res) => {
        let hashedPassword = bcrypt.hashSync(req.body.Password,10)
        let eachUser = new signupSchema({
            Name:req.body.Name,
            Email:req.body.Email,
            Password:hashedPassword
        })
        // if(!Name || !Email || !Password){
        //     console.log("Invalid")
        // }
        await eachUser.save()
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

    login: async (req,res) => {
        await signupSchema.findOne({
            Email:req.body.Email
        })
        .then((data) => {
            if(data === null){
                res.status(401).json({
                    message:"Please check your email/password"
                })
            }
            let checkPassword = bcrypt.compareSync(req.body.Password,data.Password)
            // console.log(req.body.Password,data.Password,checkPassword,data)
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