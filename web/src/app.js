const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const router = require('./routers');
require('dotenv').config();

const app = express();

app.use(
  session({
    secret: 'secrettttttttrttttttttttttt',
    resave: false,
    saveUninitialized: true,
  })
);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', router);

module.exports = app;
