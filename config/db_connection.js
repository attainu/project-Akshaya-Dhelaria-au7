const mongoose = require('mongoose')

const db_connection = mongoose.connect('mongodb+srv://codingHunt:codingHunt@cluster0.haqjh.mongodb.net/codingHunt?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to database"))
.catch((err) => console.log("Error while connecting to DB" , err))

module.exports =  db_connection;