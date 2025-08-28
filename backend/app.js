const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const connectMongoDb = require("./init/mongodb");
const userRoutes = require('./routes/userRoutes');
const pollRoutes = require('./routes/pollRoutes');
const questionRoutes = require('./routes/questionRoutes');
const answerRoutes = require('./routes/answerRoutes');
const errorHandler = require('./middlewares/errorHandler');

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

//Routes
app.use('/api/users', userRoutes);
app.use('/api/polls', pollRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/answers', answerRoutes);

app.use(errorHandler);

module.exports = app;