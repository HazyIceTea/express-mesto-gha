const Card = require('../models/card');
const http2 = require("http2");

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send({cards}))
    .catch(() => res.status(http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({message: 'На сервере произошла ошибка'}));
}

module.exports.postCard = (req, res) => {
  const {name, link} = req.body;
  Card.create({name, link, owner: req.user._id})
    .then(card => res.status(http2.constants.HTTP_STATUS_CREATED).send(card))
    .catch((err) => {
      err.name === 'ValidationError'
        ? res.status(http2.constants.HTTP_STATUS_BAD_REQUEST).send({message: err.message})
        : res.status(http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({message: 'На сервере произошла ошибка'})
    });
}

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(card => card
      ? res.send({message: 'Карточка успешно удалена'})
      : res.status(http2.constants.HTTP_STATUS_NOT_FOUND).send({message: 'Карточка не найдена'}))
    .catch((err) =>
      err.name === 'CastError'
        ? res.status(http2.constants.HTTP_STATUS_BAD_REQUEST).send({message: 'Некорректный Id'})
        : res.status(http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({message: 'На сервере произошла ошибка'})
    ) ;
}

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {$addToSet: {likes: req.user._id}},
    {new: true}
  )
    .then(card => card
      ? res.send({message: 'Лайк успешно поставлен'})
      : res.status(http2.constants.HTTP_STATUS_NOT_FOUND).send({message: 'Карточка не найдена'}))
    .catch((err) =>
      err.name === 'CastError'
        ? res.status(http2.constants.HTTP_STATUS_BAD_REQUEST).send({message: 'Некорректный Id'})
        : res.status(http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({message: 'На сервере произошла ошибка'})
    ) ;

}

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {$pull: {likes: req.user._id}},
    {new: true}
  )
    .then(card => card
      ? res.send({message: 'Лайк успешно удалён'})
      : res.status(http2.constants.HTTP_STATUS_NOT_FOUND).send({message: 'Карточка не найдена'}))
    .catch((err) =>
      err.name === 'CastError'
        ? res.status(http2.constants.HTTP_STATUS_BAD_REQUEST).send({message: 'Некорректный Id'})
        : res.status(http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({message: 'На сервере произошла ошибка'})
    ) ;
}
