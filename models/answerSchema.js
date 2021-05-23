"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var AnswerSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    category: {
        type: Array,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    votes: {
        type: Number,
        required: true
    },
    user: {
        type: String,
        required: true
    },
}, { timestamps: true }); //passing a constructor here
//creating a mode based on tht  object
var Answer = mongoose_1.default.model('answers', AnswerSchema);
//books is Collection
module.exports = Answer;
