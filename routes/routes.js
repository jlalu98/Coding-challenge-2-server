"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
//const Book = require('../book');
//const User = require('../user');
var controller_1 = require("../controllers/controller");
//IMPORT SCHEMAS HERE
var router = express_1.default.Router();
router.use(express_1.default.json());
//ALL ROUTES ARE HERE
router.route("/questions")
    .get(controller_1.getAllQuestions)
    .post(controller_1.postQuestion);
router.route("/questions/:id")
    .get(controller_1.getQuestionById);
router.route("/questions/:category/category")
    .get(controller_1.findByCategory);
router.route("/questions/:text/text")
    .get(controller_1.findByText);
router.route("/answers/:id")
    .get(controller_1.getAnswers);
router.route("/answers/:questionId/:userId")
    .post(controller_1.createAnswer);
router.route("/user")
    .post(controller_1.userRegister);
router.route("/login")
    .post(controller_1.loginUser);
module.exports = router;
