//db connection code

const mongoose = require("mongoose");

const connectDB = async () => {
    try{ 
        await mongoose.connect(process.env.mongodb_url);
        console.log("Mongo db connected");
    }catch(error){
        console.error("mongodb not connected",error);
        process.exit(1);
    }
    
};

module.exports = connectDB;