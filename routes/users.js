const {getUsers, getSingleUser, updateUserInfo, updateAvatar, getUserInfo, login} = require('../controllers/users');
const {celebrate, Joi} = require("celebrate");
const router = require('express').Router();

router.get('/', getUsers);
router.get('/me', getUserInfo);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserInfo);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/),
  }),
}), updateAvatar);

router.get('/:userId', celebrate({
  body: Joi.object().keys({
    userId: Joi.string().length(24).hex()
  }),
}), getSingleUser);

// router.patch('/me', updateUserInfo);
// router.get('/:userId', getSingleUser);
// router.patch('/me/avatar', updateAvatar);


module.exports = router;
