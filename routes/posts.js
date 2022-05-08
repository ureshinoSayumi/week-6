var express = require('express');
var router = express.Router();
const errorHandle = require('../message/errorHandle')
const sucessHandle = require('../message/sucessHandle')
const Post = require('../models/post')
const postController = require('../controllers/post')

/* GET users listing. */
router.get('/', postController.getAllPost);
router.post('/', postController.createPost);

module.exports = router;
