const titleSchema = require('../model/title_schema')

const titleController = {
    createTitle: async (req,res) => {
        let eachTitle = new titleSchema({
            ...req.body,
            posted_by:req.app.get("data1").user_id,
            category_id:req.params.category_id
        })
        await eachTitle.save()
        .then((data) => {
            console.log("Data in title is" , data)
            res.status(200).json({
                message:"Title created",
                data:data
            })
        })
        .catch((err) => {
            console.log("Error while creating title " , JSON.stringify(err) )
            res.status(401).json({
                message:"Error while creating title",
                error:err
            })
        })
    },

    getTitlesOnTheBasisOfCategory: (req,res) => {
        titleSchema.where({category_id:req.params.category_id}).find((err,result) => {
            if(err){
                console.log("Error in get link" , JSON.stringify(err))
                res.status(500).json({
                    message:"Error while getting title of particular category ",
                    error:err.message
                })
            }else{
                if(result.length == 0){
                    res.status(404).json({
                        message:"No links found"
                    })
                }else{
                    console.log("Result in link" , result)
                    res.status(200).json({
                        message:"List of Links",
                        data:result
                    })
                }
            }
        })
    }
}

module.exports = titleController