import mongoose from "mongoose"
const Schema= mongoose.Schema;

const QuestionSchema= new Schema({
    text:{
        type: String,
        required : true
    },
    category:{
        type: Array,
        required : true
    },
    // answers:{
    //     type:Array,
    //     required : true
    // },
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
const Question= mongoose.model('questions',QuestionSchema);
//books is Collection
module.exports=Question;

