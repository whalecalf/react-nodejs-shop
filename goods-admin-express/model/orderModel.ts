import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    status: {
        type: String,
        require: true
    },
    num: {
        type: Number,
        default: 1
    },
    createdAt: {
        type: Number,
        default: Date.now
    },
    confirmedAt: {
        type: Number,
    },
    ems: {
        type: String
    },
    goods:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Goods',
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    seller:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    comment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }
})

export default orderSchema