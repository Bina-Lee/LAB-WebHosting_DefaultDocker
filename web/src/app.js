const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routers');
require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/', router);

module.exports = app;
