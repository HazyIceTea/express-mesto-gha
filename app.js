const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("express");


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
app.use('*', (req, res) => res.status(404).send({message: 'Страница не найдена'}));


app.listen(PORT);
