const {getUsers, getSingleUser, updateUserInfo, updateAvatar, getUserInfo} = require('../controllers/users');
const router = require('express').Router();

router.get('/', getUsers);
router.patch('/me', updateUserInfo);
router.get('/me', getUserInfo)
router.get('/:userId', getSingleUser);
router.patch('/me/avatar', updateAvatar);


module.exports = router;
