const User = require('../models/user');
const http2 = require("http2");
const ErrorBadRequest = require("../errors/ErrorBadRequest");
const ErrorNotFound = require("../errors/ErrorNotFound");

module.exports.createUser = (req, res, next) => {
  const {name, about, avatar, email, password} = req.body;

  // if(!email || !password) {
  //   return res.status(http2.constants.HTTP_STATUS_BAD_REQUEST).send({message: 'Email и пароль не могут быть пустыми'})
  // }

  User.create({name, about, avatar, email, password})
    .then(user => res.status(http2.constants.HTTP_STATUS_CREATED).send(user))
    .catch((err) => {
      err.name === 'ValidationError'
        ? next(new ErrorBadRequest(err))
        : next(err)
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then(users => res.send({data: users}))
    .catch((err) => next(err));
};

module.exports.getSingleUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => user
      ? res.send(user)
      : next(new ErrorNotFound('Пользователь не найден')))
    .catch((err) =>
      err.name === 'CastError'
        ? next(new ErrorBadRequest('Некорректный Id'))
        : next(err)
    ) ;
}

module.exports.updateUserInfo = (req, res, next) => {
  req.user._id
    ? User.findByIdAndUpdate(req.user._id, {name: req.body.name, about: req.body.about}, {
      runValidators: true,
      new: true
    })
      .then(user => user
        ? res.send(user)
        : next(new ErrorNotFound('Пользователь не найден')))
      .catch((err) => {
        err.name === 'ValidationError'
          ? next(new ErrorBadRequest(err))
          : next(err)
      })
    : res.status(http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({message: 'На сервере произошла ошибка'})
}

module.exports.updateAvatar = (req, res, next) => {
  req.user._id
    ? User.findByIdAndUpdate(req.user._id, {avatar: req.body.avatar}, {
      runValidators: true,
      new: true
    })
      .then(user => user
        ? res.send(user)
        : next(new ErrorNotFound('Пользователь не найден')))
      .catch((err) => {
        err.name === 'ValidationError'
          ? next(new ErrorBadRequest(err))
          : next(err)
      })
    : res.status(http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({message: 'На сервере произошла ошибка'})
}
