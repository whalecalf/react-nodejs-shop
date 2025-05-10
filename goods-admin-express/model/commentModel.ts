import mongoose from "mongoose";

const commentSchema=new mongoose.Schema({
    // to do
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    createdAt:{
        type:Number,
        default:Date.now
    },
    description:{
        type:String
    },
    star:{
        type:Number
    },
    response:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    },
    pics:{
        type:Array
    },
    goods:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Goods"
    },
})

export default commentSchema