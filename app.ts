import express from "express";
import * as dotenv from "dotenv";
//import config from "config";
dotenv.config({ path: __dirname + '/.env' });
import cors from "cors";
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes/routes')
const dbURI = process.env.MONGO_URI;
const port = process.env.PORT;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((result: any) => {
        console.log('Connected Successfully to DataBase');
        app.listen(port, () => {
            console.log(`Server Started at port ${port}`);
        });
    })
    .catch((err: any) => console.log(err));


app.use(cors());
//ROUTEFROM WILL BE http://localhost:8000/api
app.use("/api", routes);
app.use(express.json());

