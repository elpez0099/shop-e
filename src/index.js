import express  from "express";
import {loadEnvVars} from "./lib/loadEnvVars.js"
import settings from './config/settings.json' with { type: "json" };
import errorMiddleware from './middleware/error.js';
const {envFile} = settings;

const app = express();
const port = 5000;

app.use(errorMiddleware);

app.get("/test", (req, res) => {
    res.json("Hello there!");
});

loadEnvVars(envFile);

app.listen(port, ()=>{
    console.log(`Running server on http://localhost:${port}`);
});

