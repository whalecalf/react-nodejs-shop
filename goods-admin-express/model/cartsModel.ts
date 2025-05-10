import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    num:{
        type:Number,
        default:1
    },
    goods:{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Goods',
        require:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'User',
        require:true
    },
});

export default cartsSchema