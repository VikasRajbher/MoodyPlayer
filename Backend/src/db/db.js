const mongoose = require('mongoose');

function connectDB(){

    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("Connected to MongoDB");
    })
    .catch((err)=>{
        console.error("Error in connecting to MongoDB");
    })

}

module.exports = connectDB;