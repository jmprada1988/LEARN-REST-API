const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const authenticationRoutes = require('./routes/auth');

const app = express();

const URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0-kl2sv.mongodb.net/${process.env.DEFAULT_DB}`

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use(bodyParser.json());

app.use('/auth', authenticationRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
    message,
    data,
  });
});

mongoose.connect(
  URI
).then(result => {
  const $PORT = process.env.ENVIRONMENT === 'dev' ? 4000 : 8000
  console.log('Connection Stablished with mongo cluster \nListening at port: '+ $PORT +'...');
  app.listen($PORT);
})