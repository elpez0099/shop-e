import mongoose from "mongoose";
import AppSettings from "../config/AppSettings.js";
const {shope_mongodb_uri} = AppSettings();

export const dbConnection = async () => {
  if(!shope_mongodb_uri){
    throw new Error("Invalid database connection params!");
  }
    
  const connectionOptions = {
    socketTimeoutMS: 5000,
    serverSelectionTimeoutMS: 5000,
    authSource: "admin",
  };
  try{
    await mongoose.connect(shope_mongodb_uri, connectionOptions);
    console.log("Connection to database was successful!");

  }catch(err){
    console.log(`Could not connect to database ${err}`);
    process.exit(1);
  }
  
  
};
