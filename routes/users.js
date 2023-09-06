const {createUser, getUsers, getSingleUser, updateUserInfo, updateAvatar} = require('../controllers/users');
const router = require('express').Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:userId', getSingleUser);
router.patch('/me', updateUserInfo);
router.patch('/me/avatar', updateAvatar);


module.exports = router;
