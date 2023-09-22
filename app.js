const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("express");
const http2 = require('http2');
const ErrorNotFound = require("./errors/ErrorNotFound");


const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: '64d10fc14259194230ba84d5'
  };

  next();
});

app.use('/cards', require('./routes/cards'));
app.use('/users', require('./routes/users'));
app.use('*', (req, res, next) => next(new ErrorNotFound('Страница не найдена')));

app.use((err, req, res, next) => {
  const { statusCode = http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR
        ? 'На сервере произошла ошибка'
        : message
    });
});


app.listen(PORT);
