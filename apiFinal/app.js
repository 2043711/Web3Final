require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors'); 

var indexRouter = require('./routes/index');
var villeRouter = require('./routes/ville');
var usersRouter = require('./routes/users');
var statsRouter = require('./routes/stats');

var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/ville', villeRouter);
app.use('/users', usersRouter);
app.use('/stats', statsRouter);

module.exports = app;
