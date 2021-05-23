import mongoose from "mongoose"
const Schema= mongoose.Schema;

const AnswerSchema= new Schema({
    text:{
        type: String,
        required : true
    },
    category:{
        type: Array,
        required : true
    },
    question:{
        type:String,
        required : true
    },
    votes:{
        type: Number, 
        required : true
    },
    user:{
        type: String, 
        required : true
    },
},{timestamps:true});//passing a constructor here

//creating a mode based on tht  object
const Answer = mongoose.model('answers',AnswerSchema);
//books is Collection
module.exports=Answer;

