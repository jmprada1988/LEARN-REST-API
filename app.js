const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();

const URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0-kl2sv.mongodb.net/${process.env.DEFAULT_DB}`

console.log(URI)

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
});

app.use(bodyParser.json());

app.use((error, req, res, next) => {
  console.log(error);
});

mongoose.connect(
  URI
).then(result => {
  console.log('Connection Stablished with CLuster');
  app.listen(process.env.PORT || 4000);
})