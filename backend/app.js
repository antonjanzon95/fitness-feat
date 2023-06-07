const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const challengeRouter = require('./routes/challenge');

const app = express();

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

mongoose
  .connect(process.env.DB_URI, options)
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.error('Could not connect to DB', err));

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/challenge', challengeRouter);

module.exports = app;
