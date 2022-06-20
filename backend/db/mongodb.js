const mongoose = require("mongoose")

const connectDB= async ()=>{
    try{
    const conn=await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB connected:${conn.connection.host}`);
    }catch(e){
        console.log("Mongodb failed connection: error -> ", e);
    }
}

module.exports= connectDB