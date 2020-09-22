const categorySchema = require('../model/category')

const controller = {
    createCategory: async (req,res) => {
        let eachCategory = new categorySchema({
            ...req.body
        })
        await eachCategory.save()
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

    getAllCategories: async (req,res) => {
        try {
            await categorySchema.find((err,data) => {
                if(err){
                    res.status(400).json({
                        message:"Error while retreiving data",
                        error:err
                    })
                }
                else{
                    if(data.length == 0){
                        res.status(403).json({
                            message:"No category found."
                        })
                    }
                    else{
                        res.status(200).json({
                            message:"All data",
                            data:data
                        })
                    }
                }
            })
        } catch (error) {
            console.log("Error while getting all category " , JSON.stringify(err) )
            res.status(500).json({
                message:"Error while retreiving data",
                error:error
            })
        }
    },

    updateCategory : (req,res) => {
       categorySchema.findByIdAndUpdate({
            _id:req.params._id,
            ...req.body
            // Category: req.body.Category,
            // Link:req.body.Link
        })
        .then((data) => {
            if(!data){
                res.status(403).json({
                    message:"No Category Available.Please add category"
                })
            }
            else{
                console.log("Update" , data.Category,data.Link)
                res.status(200).json({
                    message:"Updated",
                    data:data
                })
            }
        })
        .catch((err) => {
            console.log("Error while updating category " , JSON.stringify(err) )
            res.status(401).json({
                message:"Error while updating category",
                error:err
            })
        })
    },

    deleteCategory:(req,res) => {
        categorySchema.findByIdAndDelete({
            _id:req.params._id
        })
        .then((data) => {
            if(!data){
                res.status(403).status({
                    message:"No category exists."
                })
            }
            else{
                res.status(200).json({
                    message:"Deleted the category"
                })
            }
        })
        .catch((err) => {
            console.log("Error while deleting category " , JSON.stringify(err) )
            res.status(401).json({
                message:"Error while deleting category",
                error:err
            })
        })
    }
}

module.exports = controller