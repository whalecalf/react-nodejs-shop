import mongoose from "mongoose";

const logsSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    // to do
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
   
    time:{
        type:Number,
        default:Date.now
    },
    type:{
        type:String,
    },
    description:{
        type:String
    },
    address:{
        type:String
    }
})

export default logsSchema