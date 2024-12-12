const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routers');
require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false })); // x-www-form-urlencoded
app.use(bodyParser.json()); // JSON 데이터 파싱

app.use('/', router);

module.exports = app;
