const User = require('../models/user');
const http2 = require("http2");

module.exports.createUser = (req, res) => {
  const {name, about, avatar} = req.body;

  User.create({name, about, avatar})
    .then(user => res.status(http2.constants.HTTP_STATUS_CREATED).send(user))
    .catch((err) => {
      err.name === 'ValidationError'
        ? res.status(http2.constants.HTTP_STATUS_BAD_REQUEST).send({message: err.message})
        : res.status(http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({message: 'На сервере произошла ошибка'})
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({data: users}))
    .catch(() => res.status(http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({message: 'На сервере произошла ошибка'}));
};

module.exports.getSingleUser = (req, res) => {
  User.findById(req.params.userId)
    .then(user => user
      ? res.send(user)
      : res.status(http2.constants.HTTP_STATUS_NOT_FOUND).send({message: 'Пользователь не найден'}))
    .catch(() => (res.status(http2.constants.HTTP_STATUS_BAD_REQUEST).send({message: 'Некорректный Id'})))
}

module.exports.updateUserInfo = (req, res) => {
  req.user._id
    ? User.findByIdAndUpdate(req.user._id, {name: req.body.name, about: req.body.about}, {
      runValidators: true,
      new: true
    })
      .then(user => user
        ? res.send(user)
        : res.status(http2.constants.HTTP_STATUS_NOT_FOUND).send({message: 'Пользователь не найден'}))
      .catch((err) => {
        err.name === 'ValidationError'
          ? res.status(http2.constants.HTTP_STATUS_BAD_REQUEST).send({message: err.message})
          : res.status(http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({message: 'На сервере произошла ошибка'})
      })
    : res.status(http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({message: 'На сервере произошла ошибка'})
}

module.exports.updateAvatar = (req, res) => {
  req.user._id
    ? User.findByIdAndUpdate(req.user._id, {avatar: req.body.avatar}, {
      runValidators: true,
      new: true
    })
      .then(user => user
        ? res.send(user)
        : res.status(http2.constants.HTTP_STATUS_NOT_FOUND).send({message: 'Пользователь не найден'}))
      .catch((err) => {
        err.name === 'ValidationError'
          ? res.status(http2.constants.HTTP_STATUS_BAD_REQUEST).send({message: err.message})
          : res.status(http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({message: 'На сервере произошла ошибка'})
      })
    : res.status(http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({message: 'На сервере произошла ошибка'})
}
