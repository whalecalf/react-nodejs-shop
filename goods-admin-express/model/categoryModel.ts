import mongoose from "mongoose";

const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    level:{
        type:Number,
        require:true
    },
    parent:{
        type: mongoose.Schema.Types.ObjectId, ref:'Category'
    },
    createdAt:{
        type:Number,
        default:Date.now
    },
    icon:{
        type:String
    }
})

export default categorySchema

