const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send({cards}))
    .catch(() => res.status(500).send({message: 'На сервере произошла ошибка'}));
}

module.exports.postCard = (req, res) => {
  const {name, link} = req.body;
  Card.create({name, link, owner: req.user._id})
    .then(card => res.status(201).send(card))
    .catch((err) => {
      err.name === 'ValidationError'
        ? res.status(400).send({message: err.message})
        : res.status(500).send({message: 'На сервере произошла ошибка'})
    });
}

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(card => card
      ? res.send({message: 'Карточка успешно удалена'})
      : res.status(404).send({message: 'Карточка не найдена'}))
    .catch(() => res.status(400).send({message: 'Некорректный Id'}));
}

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {$addToSet: {likes: req.user._id}},
    {new: true}
  )
    .then(card => card
      ? res.send({message: 'Лайк успешно поставлен'})
      : res.status(404).send({message: 'Карточка не найдена'}))
    .catch(() => res.status(400).send({message: 'Некорректный Id'}));

}

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {$pull: {likes: req.user._id}},
    {new: true}
  )
    .then(card => card
      ? res.send({message: 'Лайк успешно удалён'})
      : res.status(404).send({message: 'Карточка не найдена'}))
    .catch(() => res.status(400).send({message: 'Некорректный Id'}));
}
