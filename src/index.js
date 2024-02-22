import express  from "express";
import AppSettings from "./config/AppSettings.js";
const {shope_port, shope_frontend_url} = AppSettings();

const app = express();

app.get("/test", (req, res) => {
    res.json("Hello there!");
});

app.listen(shope_port, ()=>{
    console.log(`Running server on ${shope_frontend_url}`);
});

