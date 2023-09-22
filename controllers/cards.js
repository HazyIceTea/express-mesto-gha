const Card = require('../models/card');
const http2 = require("http2");
const ErrorBadRequest = require("../errors/ErrorBadRequest");
const ErrorNotFound = require("../errors/ErrorNotFound");

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then(cards => res.send({cards}))
    .catch((err) => next(err));
}

module.exports.postCard = (req, res, next) => {
  const {name, link} = req.body;
  Card.create({name, link, owner: req.user._id})
    .then(card => res.status(http2.constants.HTTP_STATUS_CREATED).send(card))
    .catch((err) => {
      err.name === 'ValidationError'
        ? next(new ErrorBadRequest(err))
        : next(err)
    });
}

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(card => card
      ? res.send({message: 'Карточка успешно удалена'})
      : next(new ErrorNotFound('Карточка не найдена')))
    .catch((err) =>
      err.name === 'CastError'
        ? next(new ErrorBadRequest('Некорректный Id'))
        : next(err)
    ) ;
}

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {$addToSet: {likes: req.user._id}},
    {new: true}
  )
    .then(card => card
      ? res.send({message: 'Лайк успешно поставлен'})
      : next(new ErrorNotFound('Карточка не найдена')))
    .catch((err) =>
      err.name === 'CastError'
        ? next(new ErrorBadRequest('Некорректный Id'))
        : next(err)
    ) ;

}

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {$pull: {likes: req.user._id}},
    {new: true}
  )
    .then(card => card
      ? res.send({message: 'Лайк успешно удалён'})
      : next(new ErrorNotFound('Карточка не найдена')))
    .catch((err) =>
      err.name === 'CastError'
        ? next(new ErrorBadRequest('Некорректный Id'))
        : next(err)
    ) ;
}
