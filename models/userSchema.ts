import mongoose from "mongoose"
const Schema= mongoose.Schema;

const UserSchema= new Schema({
    email:{
        type: String,
        required : true
    },
    password:{
        type: String,
        required : true
    },
},{timestamps:true});//passing a constructor here

//creating a mode based on tht  object
const User= mongoose.model('users',UserSchema);
//books is Collection
module.exports=User;

