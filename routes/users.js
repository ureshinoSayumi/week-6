var express = require('express');
var router = express.Router();
const errorHandle = require('../service/errorHandle')
const sucessHandle = require('../service/sucessHandle')
const userController = require('../controllers/user')
const { isAuth,generateSendJWT } = require('../service/auth');

/* GET users listing. */
router.get('/users', userController.getAllUser);
router.post('/user', userController.createUser);
router.post('/sing_up', userController.sing_up);
router.post('/sing_in', userController.sing_in);
router.get('/users/profile',isAuth, userController.profile)
router.post('/users/updatePassword',isAuth, userController.updatePassword)
router.patch('/users/updateProfile',isAuth, userController.updateProfile)

module.exports = router;
