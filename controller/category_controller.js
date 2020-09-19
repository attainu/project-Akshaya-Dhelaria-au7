const categorySchema = require('../model/category')

const controller = {
    createCategory: (req,res) => {
        let eachCategory = new categorySchema({
            ...req.body
        })
        eachCategory.save()
        .then((data) => {
            console.log("Data is" , data)
            res.status(200).json({
                message:"Category created",
                data:data
            })
        })
        .catch((err) => {
            console.log("Error while creating category " , JSON.stringify(err) )
            res.status(401).json({
                message:"Error while creating category",
                error:err
            })
        })
    },

    getAllCategories:(req,res) => {
       categorySchema.find((err,data) => {
           if(err){
               res.status(400).json({
                   message:"Error while retreiving data",
                   error:err
               })
           }
           else{
               res.status(200).json({
                   message:"All data",
                   data:data
               })
           }
       })
    }
}

module.exports = controller