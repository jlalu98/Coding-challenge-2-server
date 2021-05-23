"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByText = exports.findByCategory = exports.getQuestionById = exports.getAnswers = exports.createAnswer = exports.loginUser = exports.userRegister = exports.postQuestion = exports.getAllQuestions = void 0;
// IMPORT MODEL HERE FROM MODELS FOLDER
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var Question = require("../models/schema");
var User = require("../models/userSchema");
var Answer = require("../models/answerSchema");
var getAllQuestions = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var questions, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Question.find()];
            case 1:
                questions = _a.sent();
                if (questions)
                    res.status(200).send(questions);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(400).send("ERROR", err_1.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllQuestions = getAllQuestions;
var postQuestion = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var question, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, new Question(req.body)];
            case 1:
                question = _a.sent();
                question.save();
                res.status(200).send(question);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(400).send("Failed");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.postQuestion = postQuestion;
var userRegister = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email_1, password_1;
    return __generator(this, function (_b) {
        try {
            _a = req.body, email_1 = _a.email, password_1 = _a.password;
            //simple validation 404 is bad request
            if (!email_1 || !password_1)
                res.status(400).send("Please enter all fields");
            //checking for existing user
            User.findOne({ email: email_1 })
                .then(function (user) {
                if (user) {
                    res.status(400).send("User already exists");
                }
                var newUser = new User({
                    email: email_1,
                    password: password_1
                });
                newUser.save()
                    .then(function (user) {
                    res.status(200).send(newUser);
                });
            });
        }
        catch (err) {
            res.status(400).send("Bad request");
        }
        return [2 /*return*/];
    });
}); };
exports.userRegister = userRegister;
var loginUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password;
    return __generator(this, function (_b) {
        _a = req.body, email = _a.email, password = _a.password;
        if (!email || !password)
            return [2 /*return*/, res.status(400).json("Please enter all fields")];
        User.findOne({ email: email })
            .then(function (user) {
            if (!user) {
                return res.status(400).json("User does not exist!");
            }
            if (password == user.password) {
                jsonwebtoken_1.default.sign({ id: user.id }, 'jwtSecret', { expiresIn: "120s" }, function (err, token) {
                    if (err)
                        throw err;
                    res.send({ token: token, id: user.id });
                });
            }
        });
        return [2 /*return*/];
    });
}); };
exports.loginUser = loginUser;
var createAnswer = function (req, res) {
    var answer = new Answer({
        text: req.body.text,
        category: req.body.category,
        question: req.params.questionId,
        votes: 0,
        user: req.params.userId
    });
    answer.save()
        .then(function (answer) { return res.send(answer); });
};
exports.createAnswer = createAnswer;
var getAnswers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, answers, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, Answer.find({ question: id })];
            case 1:
                answers = _a.sent();
                res.status(200).send(answers);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.status(400).send("NO ANSWERS");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAnswers = getAnswers;
var getQuestionById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, question, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, Question.findOne({ _id: id })];
            case 1:
                question = _a.sent();
                res.status(200).send(question);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                res.status(400).send("Question Not Found");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getQuestionById = getQuestionById;
var findByCategory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var category, questions, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                category = new RegExp(req.params.category, "i");
                return [4 /*yield*/, Question.find({ category: category })];
            case 1:
                questions = _a.sent();
                res.status(200).send(questions);
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                res.status(400).send("NOT FOUND");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.findByCategory = findByCategory;
var findByText = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var text, questions, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                text = new RegExp(req.params.text, "i");
                return [4 /*yield*/, Question.find({ text: text })];
            case 1:
                questions = _a.sent();
                res.status(200).send(questions);
                return [3 /*break*/, 3];
            case 2:
                err_6 = _a.sent();
                res.status(400).send("NOT FOUND");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.findByText = findByText;
//60a79c79cb442720507dd23a-->user
//60a79d5fcb442720507dd23c-->question id
