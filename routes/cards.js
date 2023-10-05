const {getCards, postCard, deleteCard, likeCard, dislikeCard} = require("../controllers/cards");
const {celebrate, Joi} = require("celebrate");
const router = require('express').Router();

router.get('/', getCards);

router.delete('/:cardId', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().length(24).hex()
  }),
}), deleteCard);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/),
  }),
}), postCard);

router.put('/:cardId/likes', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().length(24).hex()
  }),
}), likeCard);

router.delete('/:cardId/likes', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().length(24).hex()
  }),
}), dislikeCard);

// router.post('/', postCard);
// router.delete('/:cardId', deleteCard);
// router.put('/:cardId/likes', likeCard);
// router.delete('/:cardId/likes', dislikeCard);

module.exports = router;

