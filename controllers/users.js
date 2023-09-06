const User = require('../models/user');

module.exports.createUser = (req, res) => {
  const {name, about, avatar} = req.body;

  User.create({name, about, avatar})
    .then(user => res.status(201).send(user))
    .catch((err) => {
      err.name === 'ValidationError'
        ? res.status(400).send({message: err.message})
        : res.status(500).send({message: 'На сервере произошла ошибка'})
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({data: users}))
    .catch(() => res.status(500).send({message: 'На сервере произошла ошибка'}));
};

module.exports.getSingleUser = (req, res) => {
  User.findById(req.params.userId)
    .then(user => user
      ? res.send(user)
      : res.status(404).send({message: 'Пользователь не найден'}))
    .catch(() => (res.status(400).send({message: 'Некорректный Id'})))
}

module.exports.updateUserInfo = (req, res) => {
  req.user._id
    ? User.findByIdAndUpdate(req.user._id, {name: req.body.name, about: req.body.about}, {
      runValidators: true,
      new: true
    })
      .then(user => res.status(200).send(user))
      .catch((err) => {
        err.name === 'ValidationError'
          ? res.status(400).send({message: err.message})
          : res.status(404).send({message: 'Пользователь не найден'})
      })
    : res.status(500).send({message: 'На сервере произошла ошибка'})
}

module.exports.updateAvatar = (req, res) => {
  req.user._id
    ? User.findByIdAndUpdate(req.user._id, {avatar: req.body.avatar}, {
      runValidators: true,
      new: true
    })
      .then(user => res.status(200).send(user))
      .catch((err) => {
        err.name === 'ValidationError'
          ? res.status(400).send({message: err.message})
          : res.status(404).send({message: 'Пользователь не найден'})
      })
    : res.status(500).send({message: 'На сервере произошла ошибка'})
}

// .catch((err) => {err.name ==='ValidationError'
//   ? res.status(400).send({message: err.message})
//   : res.status(500).send({ message: 'На сервере произошла ошибка' })
// });
