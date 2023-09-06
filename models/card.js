const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Заполните поле'],
    minlength: [2, 'Минимальная длина поля - 2'],
    maxlength: [30, 'Максимальная длина поля - 30'],
  },
  link: {
    type: String,
    required: [true, 'Заполните поле'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Заполните поле'],
    ref: 'user'
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
    ref: 'user'
  }],
  createdAt: {
    type: Date,
    default: Date.now(),
  }

});

module.exports = mongoose.model('card', cardSchema);