const http2 = require('http2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ErrorBadRequest = require('../errors/ErrorBadRequest');
const ErrorNotFound = require('../errors/ErrorNotFound');
const ErrorConflict = require('../errors/ErrorConflict');

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      })
        .then((user) => res.status(http2.constants.HTTP_STATUS_CREATED).send({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
        }))
        .catch((err) => {
          if (err.code === 11000) {
            next(new ErrorConflict('Пользователь с таким Email уже существует'));
          } else if (err.name === 'ValidationError') {
            next(new ErrorBadRequest(err));
          } else next(err);
        });
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => next(err));
};

module.exports.getSingleUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => (user
      ? res.send(user)
      : next(new ErrorNotFound('Пользователь не найден'))))
    .catch((err) => (err.name === 'CastError'
      ? next(new ErrorBadRequest('Некорректный Id'))
      : next(err)));
};

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

module.exports.updateUserInfo = (req, res, next) => {
  req.user._id
    ? User.findByIdAndUpdate(req.user._id, { name: req.body.name, about: req.body.about }, {
      runValidators: true,
      new: true,
    })
      .then((user) => (user
        ? res.send(user)
        : next(new ErrorNotFound('Пользователь не найден'))))
      .catch((err) => {
        err.name === 'ValidationError'
          ? next(new ErrorBadRequest(err))
          : next(err);
      })
    : next();
};

module.exports.updateAvatar = (req, res, next) => {
  req.user._id
    ? User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar }, {
      runValidators: true,
      new: true,
    })
      .then((user) => (user
        ? res.send(user)
        : next(new ErrorNotFound('Пользователь не найден'))))
      .catch((err) => {
        err.name === 'ValidationError'
          ? next(new ErrorBadRequest(err))
          : next(err);
      })
    : next();
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });

      res.send({ token });
    })
    .catch((err) => next(err));
};
