const mongoose = require('mongoose');
const validator =  require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Заполните поле'],
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30'],
    // default: "Жак-Ив Кусто"
  },
  about: {
    type: String,
    required: [true, 'Заполните поле'],
    minlength: [2, 'Минимальная длина поля "about" - 2'],
    maxlength: [30, 'Максимальная длина поля "about" - 30'],
    // default: "Исследователь"
  },
  avatar: {
    type: String,
    required: [true, 'Заполните поле "avatar"'],
    // default: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png"
  },
  // email: {
  //   type: String,
  //   required: [true, 'Заполните поле Email'],
  //   unique: true
  // },
  // password: {
  //   type: String,
  //   required: [true, 'Заполните поле "пароль"']
  // }

});

module.exports = mongoose.model('user', userSchema);