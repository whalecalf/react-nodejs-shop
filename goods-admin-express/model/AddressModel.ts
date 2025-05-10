import mongoose from "mongoose";

const addressSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    area:{
        type:Array,
        require:true
    },
    detail:{
        type:String,
        require:true
    },
    isDefault:{
        type:Boolean
    },
    user:{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'User'
    }

})

export default addressSchema