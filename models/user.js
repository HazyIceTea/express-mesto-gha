const mongoose = require('mongoose');
const validator =  require('validator');
const bcrypt = require("bcryptjs");
const ErrorUnauthorized = require("../errors/ErrorUnauthorized");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30'],
    default: "Жак-Ив Кусто"
  },
  about: {
    type: String,
    minlength: [2, 'Минимальная длина поля "about" - 2'],
    maxlength: [30, 'Максимальная длина поля "about" - 30'],
    default: "Исследователь"
  },
  avatar: {
    type: String,
    default: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png"
  },
  email: {
    type: String,
    required: [true, 'Заполните поле Email'],
    unique: true,
    validate: {
      validator(email){
        //validator.isEmail(email)
       return /^\S+@\S+\.\S+$/.test(email)}, //библиотека validator напрочь откзывается работать
      message: 'Некорректный формат Email'
    }

  },
  password: {
    type: String,
    required: [true, 'Заполните поле password'],
    select: false
  }

});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new ErrorUnauthorized('Неправильные почта или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new ErrorUnauthorized('Неправильные почта или пароль');
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);