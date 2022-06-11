const mongoose = require("mongoose")

const clientSchema= new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    phone:{
        type:String,
    }
})
const Client= mongoose.model("Client", clientSchema)

const projectSchema= new mongoose.Schema({
    name:{
        type:String,
    },
    description:{
        type:String,
    },
    status:{
        type:String,
        enum:["Not started", "In Progress", "Done"]
    },
    clientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Client",
    }
})
const Project= mongoose.model("Client", projectSchema)


module.exports={Client, Project}