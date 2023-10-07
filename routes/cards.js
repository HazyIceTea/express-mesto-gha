const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  getCards, postCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const urlRegex = require('../utils/constants');

router.get('/', getCards);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), deleteCard);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(urlRegex),
  }),
}), postCard);

router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), likeCard);

router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), dislikeCard);

// router.post('/', postCard);
// router.delete('/:cardId', deleteCard);
// router.put('/:cardId/likes', likeCard);
// router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
