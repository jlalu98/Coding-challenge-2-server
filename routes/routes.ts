import express from "express";
//const Book = require('../book');
//const User = require('../user');
import { getAllQuestions, postQuestion, userRegister, loginUser, createAnswer, getQuestionById, findByCategory, findByText, getAnswers } from "../controllers/controller"

//IMPORT SCHEMAS HERE

let router = express.Router();
router.use(express.json());

//ALL ROUTES ARE HERE

router.route("/questions")
    .get(getAllQuestions)
    .post(postQuestion)
router.route("/questions/:id")
    .get(getQuestionById)
router.route("/questions/:category/category")
    .get(findByCategory)
router.route("/questions/:text/text")
    .get(findByText)
router.route("/answers/:id")
    .get(getAnswers)
router.route("/answers/:questionId/:userId")
    .post(createAnswer)
router.route("/user")
    .post(userRegister)

router.route("/login")
    .post(loginUser)

module.exports = router;