const mongoose = require('mongoose')

const db_connection = mongoose.connect('mongodb+srv://codingHunt:codingHunt@cluster0.haqjh.mongodb.net/codingHunt?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology: true
// },(err,db) => {
//     console.log("Some" , db.collection)
})
.then(() => console.log("Connected to database"))
.catch((err) => console.log("Error while connecting to DB" , err))


// console.log(mongoose.connect)                                                               
// mongoose.connect.codingHunt.dropCollection('category',(err,res) => {
//     if(err){
//         console.log("Error while dropping" , err)
//     }
//     console.log("Dropped the collection" , res)
// })

module.exports =  db_connection;

