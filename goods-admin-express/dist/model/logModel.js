"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logsSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: true
    },
    // to do
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    time: {
        type: Number,
        default: Date.now
    },
    type: {
        type: String,
    },
    description: {
        type: String
    },
    address: {
        type: String
    }
});
exports.default = logsSchema;
