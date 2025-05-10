import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    nickName:{
        type:String,
    },
    password:{
        type:String
    },
    status:{
        type:String
    },
    sex:{
        type:String
    },
    role:{
        type:String
    },
    phone:{
        type:String
    },
    avatar:{
        type:String
    }
});

export default userSchema