import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import surveyRoute from './router/survey.js'
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');

// Port
const port = process.env.PORT || 5000;

// Home route
app.get('/', (req, res) => {
  req.setTimeout(20000);
  res.status(201).json('Home get request');
});


app.use('/api/survey', surveyRoute);

// Database connection and server start
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server connected to http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  });
