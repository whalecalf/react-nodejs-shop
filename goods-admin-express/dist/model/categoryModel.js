"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const categorySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: true
    },
    level: {
        type: Number,
        require: true
    },
    parent: {
        type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Category'
    },
    createdAt: {
        type: Number,
        default: Date.now
    },
    icon: {
        type: String
    }
});
exports.default = categorySchema;
