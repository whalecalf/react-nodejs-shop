import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    status:{
        type:String
    },
    capital:{
        type:Number
    },
    createdAt:{
        type:Number
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'User',
        require:true
    }
});

export default storeSchema