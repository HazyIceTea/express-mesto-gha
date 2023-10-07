const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  getUsers, getSingleUser, updateUserInfo, updateAvatar, getUserInfo,
} = require('../controllers/users');
const urlRegex = require("../utils/constants");

router.get('/', getUsers);
router.get('/me', getUserInfo);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateUserInfo);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(urlRegex),
  }),
}), updateAvatar);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getSingleUser);

// router.patch('/me', updateUserInfo);
// router.get('/:userId', getSingleUser);
// router.patch('/me/avatar', updateAvatar);

module.exports = router;
