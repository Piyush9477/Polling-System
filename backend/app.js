const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const connectMongoDb = require("./init/mongodb");

//init app
const app = express();

//Database connection
connectMongoDb();

//Middlewares
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, 
}));


module.exports = app;