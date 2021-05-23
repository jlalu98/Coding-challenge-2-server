"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv = __importStar(require("dotenv"));
//import config from "config";
dotenv.config({ path: __dirname + '/.env' });
var cors_1 = __importDefault(require("cors"));
var app = express_1.default();
var mongoose = require('mongoose');
var routes = require('./routes/routes');
var dbURI = process.env.MONGO_URI;
var port = process.env.PORT;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(function (result) {
    console.log('Connected Successfully to DataBase');
    app.listen(port, function () {
        console.log("Server Started at port " + port);
    });
})
    .catch(function (err) { return console.log(err); });
app.use(cors_1.default());
//ROUTEFROM WILL BE http://localhost:8000/api
app.use("/api", routes);
app.use(express_1.default.json());
