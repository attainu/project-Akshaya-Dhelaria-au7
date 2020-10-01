const likeCommentSchema = require('../model/likes_comments_schema');
// const categorySchema = require('../model/category')

const likesCommentsController = {
    likes:(req,res)=> {
        likeCommentSchema.findById({_id:req.params._id},(err,data)=>{
            if(err){
                res.json({
                    message:"Error while finding the category",
                    error:err.message
                })
            }
            const categoryData = data
            // console.log(categoryData)
            likeCommentSchema.findByIdAndUpdate({_id:categoryData._id},{$inc:{Like:1}},{new:true},(err,result) => {
                if(err){
                    console.log("error" , err)
                }
                console.log("result is ",result)
                res.json({
                    message:"Liked successfully",
                    data:result
                })
            })
        })
    },
    dislikes:(req,res)=> {
        likeCommentSchema.findById({_id:req.params._id},(err,data)=>{
            if(err){
                res.json({
                    message:"Error while finding the category",
                    error:err.message
                })
            }
            const categoryData = data
            // console.log(categoryData)
            likeCommentSchema.findByIdAndUpdate({_id:categoryData._id},{$inc:{Like:-1}},{new:true},(err,result) => {
                if(err){
                    console.log("error" , err)
                }
                console.log("result is ",result)
                res.json({
                    message:"Disliked",
                    data:result
                })
            })
        })
    },

    comment:(req,res) => {
        likeCommentSchema.findById({_id:req.params._id},(err,data)=>{
            if(err){
                res.json({
                    message:"Error while finding the category",
                    error:err.message
                })
            }
            const categoryData = data
            // console.log(categoryData)
            categorySchema.findByIdAndUpdate({_id:categoryData._id},{Comment:req.body.Comment},{new:true},(err,result) => {
                if(err){
                    console.log("error" , err)
                }
                console.log("result is ",result)
                res.json({
                    message:"Commented",
                    data:result
                })
            })
        })
    }
}

module.exports = likesCommentsController;

//.where({user_id:req.app.get("data1").user_id})