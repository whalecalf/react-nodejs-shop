"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const commentSchema = new mongoose_1.default.Schema({
    // to do
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    createdAt: {
        type: Number,
        default: Date.now
    },
    description: {
        type: String
    },
    star: {
        type: Number
    },
    response: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Comment"
    },
    pics: {
        type: Array
    },
    goods: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Goods"
    },
});
exports.default = commentSchema;
