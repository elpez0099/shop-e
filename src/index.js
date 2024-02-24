import express  from "express";
import AppSettings from "./config/AppSettings.js";
import { dbConnection } from "./lib/dbConnection.js";
import AppRouter from './router/appRouter.js';

const {shope_port, shope_frontend_url} = AppSettings();

const app = express();
app.use('/api/v1/', AppRouter)


await dbConnection();


app.listen(shope_port, ()=>{
    console.log(`Running server on ${shope_frontend_url}`);
});

