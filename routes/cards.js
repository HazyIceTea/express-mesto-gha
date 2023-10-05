const {getCards, postCard, deleteCard, likeCard, dislikeCard} = require("../controllers/cards");
const {celebrate, Joi} = require("celebrate");
const {getSingleUser, updateAvatar} = require("../controllers/users");
const router = require('express').Router();

router.get('/', getCards);

router.delete('/:cardId', celebrate({
  body: Joi.object().keys({
    userId: Joi.string().length(24).hex().required()
  }),
}), deleteCard);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().pattern(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/),
  }),
}), postCard);

router.put('/:cardId/likes', celebrate({
  body: Joi.object().keys({
    userId: Joi.string().length(24).hex().required()
  }),
}), likeCard);

router.delete('/:cardId/likes', celebrate({
  body: Joi.object().keys({
    userId: Joi.string().length(24).hex().required()
  }),
}), dislikeCard);

// router.post('/', postCard);
// router.delete('/:cardId', deleteCard);
// router.put('/:cardId/likes', likeCard);
// router.delete('/:cardId/likes', dislikeCard);

module.exports = router;

