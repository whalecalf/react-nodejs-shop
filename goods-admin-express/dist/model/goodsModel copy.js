"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const goodsSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: true
    },
    // to do
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Category',
        require: true
    },
    pics: {
        type: Array,
        require: true
    },
    createdAt: {
        type: Number,
        default: Date.now
    },
    stock: {
        type: Number,
        default: 0
    },
    description: {
        type: String
    }
});
exports.default = goodsSchema;
