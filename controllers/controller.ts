// IMPORT MODEL HERE FROM MODELS FOLDER
import jwt from "jsonwebtoken"
const Question = require("../models/schema");
const User = require("../models/userSchema");
const Answer = require("../models/answerSchema")
export const getAllQuestions = async (req: any, res: any) => {
    try {
        let questions = await Question.find();
        if (questions)
            res.status(200).send(questions);
    } catch (err: any) {
        res.status(400).send("ERROR", err.message)
    }
}
export const postQuestion = async (req: any, res: any) => {
    try {
        //let userId=req.params.id;//add id in routes too
        let question = await new Question(req.body);
        question.save();
        res.status(200).send(question);
    } catch (err: any) {
        res.status(400).send("Failed");
    }
}
export const userRegister = async (req: any, res: any) => {
    try {
        const { email, password } = req.body;

        //simple validation 404 is bad request
        if (!email || !password)
            res.status(400).send("Please enter all fields");
        //checking for existing user
        User.findOne({ email: email })
            .then((user: any) => {
                if (user) {
                    res.status(400).send("User already exists")
                }
                const newUser = new User({
                    email: email,
                    password: password
                });
                newUser.save()
                    .then((user: any) => {
                        res.status(200).send(newUser)
                    })

            })
    } catch (err: any) {
        res.status(400).send("Bad request");
    }
}

export const loginUser = async (req: any, res: any) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json("Please enter all fields");
    User.findOne({ email: email })
        .then((user: any) => {
            if (!user) {
                return res.status(400).json("User does not exist!")
            }
            if (password == user.password) {
                jwt.sign(
                    { id: user.id },
                    'jwtSecret',
                    { expiresIn: "120s" },
                    (err, token) => {
                        if (err) throw err;
                        res.send({token,id:user.id})
                    }
                )
            }
        })
}
export const createAnswer = (req: any, res: any) => {
    let answer = new Answer({
        text: req.body.text,
        category:req.body.category,
        question: req.params.questionId,
        votes: 0,
        user: req.params.userId
    })
    answer.save()
        .then((answer: any) => res.send(answer))

}
export const getAnswers= async(req:any,res:any)=>{
    try{
        let id=req.params.id;
        let answers=await Answer.find({question:id});
        res.status(200).send(answers);
    }catch(err:any){
        res.status(400).send("NO ANSWERS")
    }
}
export const getQuestionById = async (req: any, res: any) => {
    try {
        let id = req.params.id;
        let question = await Question.findOne({ _id: id });
        res.status(200).send(question);
    } catch (err: any) {
        res.status(400).send("Question Not Found");
    }
}
export const findByCategory = async (req: any, res: any) => {
    try {
        let category = new RegExp(req.params.category, "i");
        let questions = await Question.find({ category: category });
        res.status(200).send(questions);
    }catch(err:any){
        res.status(400).send("NOT FOUND")
    }
}
export const findByText=async(req:any,res:any)=>{
    try{
        let text=new RegExp(req.params.text,"i");
        let questions=await Question.find({text});
        res.status(200).send(questions)
    }catch(err:any){
        res.status(400).send("NOT FOUND")
    }
}

//60a79c79cb442720507dd23a-->user
//60a79d5fcb442720507dd23c-->question id

