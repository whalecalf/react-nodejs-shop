import mongoose from "mongoose";

const collectSchema = new mongoose.Schema({
    goods:{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Goods',
        require:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'User',
        require:true
    }
});

export default collectSchema