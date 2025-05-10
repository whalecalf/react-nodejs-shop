"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
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
    goods: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Goods',
    },
    buyer: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
    },
    seller: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
    },
    comment: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Comment"
    }
});
exports.default = orderSchema;
