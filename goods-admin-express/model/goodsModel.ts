import mongoose from "mongoose";

const goodsSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    // to do
    category:{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Category',
        require:true
    },
    pics:{
        type:Array,
        require:true
    },
   
    createdAt:{
        type:Number,
        default:Date.now
    },
    stock:{
        type:Number,
        default:0
    },
    description:{
        type:String
    },
    price:{
        type:Number,
        default:0
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
})

export default goodsSchema