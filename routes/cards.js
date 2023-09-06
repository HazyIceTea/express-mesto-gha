const {getCards, postCard, deleteCard, likeCard, dislikeCard} = require("../controllers/cards");
const router = require('express').Router();

router.post('/', postCard);
router.get('/', getCards);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;

