"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cartsSchema = new mongoose_1.default.Schema({
    num: {
        type: Number,
        default: 1
    },
    goods: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Goods',
        require: true
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
});
exports.default = cartsSchema;
